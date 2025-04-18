
import React from 'react';
import { MapPin, Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { DialogClose } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CollectionPoint } from '@/types/collection-point';

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

interface CollectionPointFormProps {
  isEditing: boolean;
  editingPoint: CollectionPoint | null;
  availableMaterials: string[];
  onSubmit: (values: z.infer<typeof formSchema>) => Promise<void>;
  onCancel: () => void;
}

export const CollectionPointForm: React.FC<CollectionPointFormProps> = ({
  isEditing,
  editingPoint,
  availableMaterials,
  onSubmit,
  onCancel,
}) => {
  const [showAddressSearch, setShowAddressSearch] = React.useState(false);
  const [searchAddress, setSearchAddress] = React.useState("");
  const [searchResults, setSearchResults] = React.useState<any[]>([]);
  const [isSearching, setIsSearching] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: editingPoint?.name || "",
      description: editingPoint?.description || "",
      address: editingPoint?.address || "",
      latitude: editingPoint?.latitude || 0,
      longitude: editingPoint?.longitude || 0,
      phone: editingPoint?.phone || "",
      website: editingPoint?.website || "",
      materials: editingPoint?.materials || []
    },
  });

  const searchForAddress = async () => {
    if (!searchAddress.trim()) return;
    
    setIsSearching(true);
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchAddress)}`);
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Error searching for address:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const selectAddress = (result: any) => {
    const { display_name, lat, lon } = result;
    form.setValue("address", display_name);
    form.setValue("latitude", parseFloat(lat));
    form.setValue("longitude", parseFloat(lon));
    setShowAddressSearch(false);
    setSearchAddress("");
    setSearchResults([]);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
            <Button type="button" variant="outline" onClick={onCancel}>Cancelar</Button>
          </DialogClose>
          <Button type="submit">
            {isEditing ? "Atualizar" : "Adicionar"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
