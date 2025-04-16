import React, { useState, useEffect } from 'react';
import { MapPin, Plus, Trash2, Edit2 } from 'lucide-react';
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
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { CollectionPoint, materialColors } from '@/types/collection-point';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
  description: z.string().optional(),
  address: z.string().min(5, "O endereço deve ter pelo menos 5 caracteres"),
  latitude: z.number().or(z.string().transform(val => parseFloat(val))),
  longitude: z.number().or(z.string().transform(val => parseFloat(val))),
  phone: z.string().optional(),
  website: z.string().optional(),
  materials: z.array(z.string()).default([])
});

const AdminMap = () => {
  const [points, setPoints] = useState<CollectionPoint[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingPoint, setEditingPoint] = useState<CollectionPoint | null>(null);
  const [open, setOpen] = useState(false);
  const [availableMaterials, setAvailableMaterials] = useState<string[]>(
    Object.keys(materialColors)
  );
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
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

  const loadPoints = async () => {
    try {
      const { data, error } = await supabase
        .from('collection_points')
        .select('*');

      if (error) throw error;

      // Transform materials from comma-separated string to array
      const formattedData = data.map(point => ({
        ...point,
        materials: point.materials ? point.materials.split(',') : []
      }));

      setPoints(formattedData as CollectionPoint[]);
    } catch (error) {
      console.error("Error loading collection points:", error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os pontos de coleta.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    loadPoints();
  }, []);

  useEffect(() => {
    if (editingPoint) {
      form.reset({
        name: editingPoint.name,
        description: editingPoint.description || "",
        address: editingPoint.address || "",
        latitude: editingPoint.latitude || 0,
        longitude: editingPoint.longitude || 0,
        phone: editingPoint.phone || "",
        website: editingPoint.website || "",
        materials: editingPoint.materials || []
      });
      setSelectedMaterials(editingPoint.materials || []);
    } else {
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
      setSelectedMaterials([]);
    }
  }, [editingPoint, form]);

  const toggleMaterial = (material: string) => {
    if (selectedMaterials.includes(material)) {
      setSelectedMaterials(selectedMaterials.filter(m => m !== material));
    } else {
      setSelectedMaterials([...selectedMaterials, material]);
    }
  };

  const handleAddPoint = async (values: z.infer<typeof formSchema>) => {
    try {
      // Fix: Create a single object with the correct structure for Supabase insert
      const point = {
        name: values.name, // Ensure name is required and provided
        description: values.description || "",
        address: values.address || "",
        latitude: values.latitude || 0,
        longitude: values.longitude || 0,
        phone: values.phone || "",
        // Remove the website field since it doesn't exist in the database schema
        materials: selectedMaterials.join(',')
      };

      const { data, error } = await supabase
        .from('collection_points')
        .insert([point]) // Make sure we're passing an array with a single object
        .select();

      if (error) throw error;

      // Convert materials back to array for state
      const newPoint = {
        ...data[0],
        materials: selectedMaterials
      } as CollectionPoint;

      setPoints([...points, newPoint]);
      
      toast({
        title: "Ponto adicionado",
        description: "O ponto de coleta foi adicionado com sucesso.",
      });
      
      setOpen(false);
    } catch (error) {
      console.error("Error adding point:", error);
      toast({
        title: "Erro",
        description: "Não foi possível adicionar o ponto de coleta.",
        variant: "destructive",
      });
    }
  };

  const handleEditPoint = async (values: z.infer<typeof formSchema>) => {
    if (!editingPoint) return;

    try {
      // Fix: Create a single object with the correct structure for Supabase update
      const updatedPoint = {
        name: values.name, // Ensure name is required
        description: values.description || "",
        address: values.address || "",
        latitude: values.latitude || 0,
        longitude: values.longitude || 0,
        phone: values.phone || "",
        // Remove website field
        materials: selectedMaterials.join(',')
      };

      const { error } = await supabase
        .from('collection_points')
        .update(updatedPoint)
        .eq('id', editingPoint.id);

      if (error) throw error;

      // Update local state with updated point
      setPoints(points.map(p => {
        if (p.id === editingPoint.id) {
          return {
            ...p,
            ...values,
            materials: selectedMaterials
          };
        }
        return p;
      }));

      toast({
        title: "Ponto atualizado",
        description: "O ponto de coleta foi atualizado com sucesso.",
      });

      setEditingPoint(null);
      setIsEditing(false);
      setOpen(false);
    } catch (error) {
      console.error("Error updating point:", error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o ponto de coleta.",
        variant: "destructive",
      });
    }
  };

  const handleDeletePoint = async (id: string) => {
    try {
      const { error } = await supabase
        .from('collection_points')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setPoints(points.filter(p => p.id !== id));
      toast({
        title: "Ponto removido",
        description: "O ponto de coleta foi removido com sucesso.",
      });
    } catch (error) {
      console.error("Error removing point:", error);
      toast({
        title: "Erro",
        description: "Não foi possível remover o ponto de coleta.",
        variant: "destructive",
      });
    }
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    values.materials = selectedMaterials;
    
    if (isEditing && editingPoint) {
      handleEditPoint(values);
    } else {
      handleAddPoint(values);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Gerenciar Pontos de Coleta</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setIsEditing(false);
              setEditingPoint(null);
              setSelectedMaterials([]);
              form.reset();
            }}>
              <Plus className="mr-2 h-4 w-4" />
              Adicionar Ponto
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{isEditing ? "Editar Ponto de Coleta" : "Adicionar Novo Ponto de Coleta"}</DialogTitle>
              <DialogDescription>
                {isEditing 
                  ? "Modifique as informações do ponto de coleta abaixo."
                  : "Preencha os detalhes do novo ponto de coleta abaixo."}
              </DialogDescription>
            </DialogHeader>
            
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
                
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Endereço</FormLabel>
                      <FormControl>
                        <Input placeholder="Endereço completo" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="latitude"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Latitude</FormLabel>
                        <FormControl>
                          <Input type="number" step="any" placeholder="Latitude" {...field} />
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
                          <Input type="number" step="any" placeholder="Longitude" {...field} />
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
                        <Input placeholder="Telefone para contato" {...field} />
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
                      <FormLabel>Website</FormLabel>
                      <FormControl>
                        <Input placeholder="Website (opcional)" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div>
                  <FormLabel>Materiais Aceitos</FormLabel>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {availableMaterials.map(material => (
                      <Badge 
                        key={material}
                        className={`cursor-pointer ${selectedMaterials.includes(material) ? materialColors[material] : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}`}
                        onClick={() => toggleMaterial(material)}
                      >
                        {material}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-end gap-2 pt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setOpen(false);
                      setEditingPoint(null);
                    }}
                    type="button"
                  >
                    Cancelar
                  </Button>
                  <Button type="submit">
                    {isEditing ? "Atualizar" : "Adicionar"}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {points.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 border border-dashed rounded-lg">
            <MapPin size={48} className="text-gray-400 mb-4" />
            <h3 className="text-lg font-medium mb-1">Nenhum ponto cadastrado</h3>
            <p className="text-gray-500 text-center mb-4">
              Adicione pontos de coleta para gerenciá-los.
            </p>
            <Button 
              onClick={() => {
                setIsEditing(false);
                setEditingPoint(null);
                setOpen(true);
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Adicionar Ponto
            </Button>
          </div>
        ) : (
          points.map((point) => (
            <div key={point.id} className="border p-4 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{point.name}</h3>
                  <p className="text-gray-600">{point.description}</p>
                  <p className="text-sm text-gray-500">{point.address}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {point.materials.map(material => (
                      <Badge key={`${point.id}-${material}`} className={materialColors[material] || "bg-gray-100"}>
                        {material}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => {
                      setIsEditing(true);
                      setEditingPoint(point);
                      setOpen(true);
                    }}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button variant="destructive" size="icon" onClick={() => handleDeletePoint(point.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminMap;
