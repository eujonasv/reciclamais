
import React, { useState, useEffect } from 'react';
import { MapPin, Plus, Trash2, Edit2, Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { CollectionPoint, materialColors } from '@/types/collection-point';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const formSchema = z.object({
  name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
  description: z.string().min(5, "A descrição deve ter pelo menos 5 caracteres"),
  address: z.string().min(5, "O endereço deve ter pelo menos 5 caracteres"),
  latitude: z.coerce.number(),
  longitude: z.coerce.number(),
  phone: z.string().min(8, "O número de telefone deve ter pelo menos 8 caracteres"),
  website: z.string().optional(),
  materials: z.array(z.string()).default([])
});

interface AdminMapProps {
  isMobile?: boolean;
}

const AdminMap: React.FC<AdminMapProps> = ({ isMobile = false }) => {
  const [points, setPoints] = useState<CollectionPoint[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingPoint, setEditingPoint] = useState<CollectionPoint | null>(null);
  const [open, setOpen] = useState(false);
  const [searchAddress, setSearchAddress] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showAddressSearch, setShowAddressSearch] = useState(false);
  
  const [availableMaterials, setAvailableMaterials] = useState<string[]>(
    Object.keys(materialColors)
  );
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      address: "",
      latitude: 0,
      longitude: 0,
      phone: "",
      website: "",
      materials: []
    },
  });

  // Load collection points from Supabase
  const loadPoints = async () => {
    const { data, error } = await supabase.from("collection_points").select("*");
    if (error) {
      toast({
        title: "Erro ao carregar pontos de coleta",
        description: error.message,
        variant: "destructive",
      });
      console.error("Error loading collection points:", error);
    } else {
      setPoints(
        data.map((point) => ({
          ...point,
          materials: point.materials?.split(',').map((m: string) => m.trim()) || []
        }))
      );
    }
  };

  useEffect(() => {
    loadPoints();
  }, []);

  // Delete a collection point
  const handleDeletePoint = async (id: string) => {
    const { error } = await supabase.from("collection_points").delete().eq("id", id);
    if (error) {
      toast({
        title: "Erro ao deletar ponto de coleta",
        description: error.message,
        variant: "destructive",
      });
      console.error("Error deleting collection point:", error);
    } else {
      setPoints(points.filter((point) => point.id !== id));
      toast({ title: "Ponto de coleta deletado com sucesso" });
    }
  };

  // Edit a collection point
  const handleEditPoint = (point: CollectionPoint) => {
    setEditingPoint(point);
    setIsEditing(true);
    form.reset({
      name: point.name,
      description: point.description,
      address: point.address,
      latitude: point.latitude,
      longitude: point.longitude,
      phone: point.phone,
      website: point.website || "",
      materials: point.materials || []
    });
    setOpen(true);
  };

  // Add a new collection point
  const handleAddPoint = () => {
    setIsEditing(false);
    setEditingPoint(null);
    form.reset({
      name: "",
      description: "",
      address: "",
      latitude: 0,
      longitude: 0,
      phone: "",
      website: "",
      materials: []
    });
    setOpen(true);
  };

  // Search for address using geocoding
  const searchForAddress = async () => {
    if (!searchAddress.trim()) return;
    
    setIsSearching(true);
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchAddress)}`);
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Error searching for address:", error);
      toast({
        title: "Erro ao buscar endereço",
        description: "Não foi possível buscar o endereço. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };

  // Select address from search results
  const selectAddress = (result: any) => {
    const { display_name, lat, lon } = result;
    form.setValue("address", display_name);
    form.setValue("latitude", parseFloat(lat));
    form.setValue("longitude", parseFloat(lon));
    setShowAddressSearch(false);
    setSearchAddress("");
    setSearchResults([]);
  };

  // Handle form submission
  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Prepare the complete payload with all required fields
      const payload = {
        name: values.name,
        description: values.description,
        address: values.address,
        latitude: values.latitude,
        longitude: values.longitude,
        phone: values.phone,
        materials: values.materials.join(','),
        website: values.website || null,
      };

      let result;

      if (isEditing && editingPoint) {
        result = await supabase
          .from("collection_points")
          .update(payload)
          .eq("id", editingPoint.id);
      } else {
        result = await supabase.from("collection_points").insert(payload);
      }

      const { error } = result;

      if (error) {
        toast({
          title: "Erro ao salvar ponto de coleta",
          description: error.message,
          variant: "destructive",
        });
        console.error("Error saving collection point:", error);
      } else {
        setOpen(false);
        setEditingPoint(null);
        setIsEditing(false);
        loadPoints();
        toast({ 
          title: isEditing 
            ? "Ponto de coleta atualizado com sucesso" 
            : "Ponto de coleta adicionado com sucesso" 
        });
      }
    } catch (error: any) {
      toast({
        title: "Erro ao processar dados",
        description: error.message,
        variant: "destructive",
      });
      console.error("Error processing form data:", error);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gerenciar Pontos de Coleta</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAddPoint} className={isMobile ? "px-2 py-1 h-auto" : ""}>
              <Plus size={isMobile ? 14 : 16} className={isMobile ? "mr-1" : "mr-2"} />
              {isMobile ? "Add Ponto" : "Adicionar Ponto de Coleta"}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {isEditing ? "Editar Ponto de Coleta" : "Adicionar Ponto de Coleta"}
              </DialogTitle>
              <DialogDescription>
                {isEditing
                  ? "Atualize as informações do ponto de coleta"
                  : "Preencha os dados para adicionar um novo ponto de coleta"}
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome do ponto de coleta" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descrição</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Descrição do ponto de coleta" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Sheet open={showAddressSearch} onOpenChange={setShowAddressSearch}>
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Endereço</FormLabel>
                        <div className="flex space-x-2">
                          <FormControl>
                            <Input placeholder="Endereço completo" {...field} />
                          </FormControl>
                          <SheetTrigger asChild>
                            <Button variant="outline" type="button" onClick={() => setShowAddressSearch(true)}>
                              <Search className="h-4 w-4" />
                            </Button>
                          </SheetTrigger>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <SheetContent side="right" className="w-full sm:max-w-lg">
                    <SheetHeader>
                      <SheetTitle>Buscar Endereço</SheetTitle>
                      <SheetDescription>
                        Digite um endereço para obter automaticamente suas coordenadas
                      </SheetDescription>
                    </SheetHeader>
                    <div className="py-6 space-y-4">
                      <div className="flex space-x-2">
                        <Input 
                          placeholder="Digite um endereço ou local..." 
                          value={searchAddress} 
                          onChange={(e) => setSearchAddress(e.target.value)} 
                        />
                        <Button onClick={searchForAddress} disabled={isSearching}>
                          {isSearching ? "Buscando..." : "Buscar"}
                        </Button>
                      </div>
                      
                      <div className="max-h-96 overflow-y-auto space-y-2">
                        {searchResults.map((result, index) => (
                          <div 
                            key={index}
                            className="p-3 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                            onClick={() => selectAddress(result)}
                          >
                            <p className="text-sm">{result.display_name}</p>
                            <div className="flex space-x-2 mt-1">
                              <Badge variant="outline" className="text-xs">
                                Lat: {parseFloat(result.lat).toFixed(6)}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                Lon: {parseFloat(result.lon).toFixed(6)}
                              </Badge>
                            </div>
                          </div>
                        ))}
                        
                        {searchResults.length === 0 && !isSearching && searchAddress && (
                          <p className="text-center text-gray-500 py-4">
                            Nenhum resultado encontrado. Tente um endereço diferente.
                          </p>
                        )}
                        
                        {isSearching && (
                          <div className="text-center py-4">
                            <p>Buscando endereços...</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="latitude"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Latitude</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            step="0.000001" 
                            placeholder="Latitude" 
                            {...field} 
                            onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="longitude"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Longitude</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            step="0.000001" 
                            placeholder="Longitude" 
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefone</FormLabel>
                      <FormControl>
                        <Input placeholder="Número de telefone" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website (opcional)</FormLabel>
                      <FormControl>
                        <Input placeholder="URL do website" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="space-y-2">
                  <FormLabel>Materiais Aceitos</FormLabel>
                  <div className="grid grid-cols-2 gap-2">
                    {availableMaterials.map((material) => (
                      <FormField
                        key={material}
                        control={form.control}
                        name="materials"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={material}
                              className="flex flex-row items-start space-x-2 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(material)}
                                  onCheckedChange={(checked) => {
                                    const updatedValue = checked
                                      ? [...field.value, material]
                                      : field.value?.filter((value) => value !== material);
                                    field.onChange(updatedValue);
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">{material}</FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-end gap-2 pt-4">
                  <DialogClose asChild>
                    <Button type="button" variant="outline">Cancelar</Button>
                  </DialogClose>
                  <Button type="submit">
                    {isEditing ? "Atualizar" : "Adicionar"}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {points.length === 0 ? (
          <div className="col-span-full py-8 text-center">
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Nenhum ponto de coleta cadastrado
            </p>
            <Button onClick={handleAddPoint}>
              <Plus size={16} className="mr-2" />
              Adicionar Ponto de Coleta
            </Button>
          </div>
        ) : (
          points.map((point) => (
            <div 
              key={point.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-recicla-primary dark:text-recicla-secondary mr-2" />
                  <h3 className="font-semibold">{point.name}</h3>
                </div>
                <div className="flex space-x-1">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleEditPoint(point)}
                  >
                    <Edit2 size={16} />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handleDeletePoint(point.id)}
                  >
                    <Trash2 size={16} className="text-red-500" />
                  </Button>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                {point.description}
              </p>
              
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                {point.address}
              </div>
              
              <div className="flex flex-wrap gap-1 mt-2 mb-3">
                {point.materials.map((material) => (
                  <Badge 
                    key={material} 
                    className={materialColors[material]}
                    variant="outline"
                  >
                    {material}
                  </Badge>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 mt-2">
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${point.latitude},${point.longitude}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full hover:bg-blue-200 transition-colors"
                >
                  Google Maps
                </a>
                <a 
                  href={`https://waze.com/ul?ll=${point.latitude},${point.longitude}&navigate=yes`}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-xs bg-teal-100 text-teal-800 px-2 py-1 rounded-full hover:bg-teal-200 transition-colors"
                >
                  Waze
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminMap;
