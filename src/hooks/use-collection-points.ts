
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { CollectionPoint, materialColors } from '@/types/collection-point';
import { DropResult } from '@hello-pangea/dnd';

export const useCollectionPoints = () => {
  const [points, setPoints] = useState<CollectionPoint[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingPoint, setEditingPoint] = useState<CollectionPoint | null>(null);
  const [open, setOpen] = useState(false);
  const [availableMaterials] = useState<string[]>(Object.keys(materialColors));
  const { toast } = useToast();

  // Load collection points from Supabase
  const loadPoints = async () => {
    const { data, error } = await supabase.from("collection_points").select("*").order('display_order', { ascending: true });
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
        })) as CollectionPoint[]
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
    setOpen(true);
  };

  // Add a new collection point
  const handleAddPoint = () => {
    setIsEditing(false);
    setEditingPoint(null);
    setOpen(true);
  };

  // Handle form submission
  const handleSubmit = async (values: any) => {
    try {
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
        const newOrder = points.length > 0 ? Math.max(...points.map(p => p.display_order ?? 0)) + 1 : 1;
        result = await supabase.from("collection_points").insert({...payload, display_order: newOrder});
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

  const handleDragEnd = async (result: DropResult) => {
    const { destination, source } = result;
    
    if (!destination || destination.index === source.index) {
      return;
    }

    // Create a new array for the swap
    const newPoints = Array.from(points);
    
    // Get the items to swap
    const sourceItem = newPoints[source.index];
    const destinationItem = newPoints[destination.index];
    
    // Swap only these two items
    newPoints[source.index] = destinationItem;
    newPoints[destination.index] = sourceItem;

    // Update local state immediately for smooth UX
    setPoints(newPoints);

    // Prepare updates only for the two swapped items
    const updates = [
      {
        id: sourceItem.id,
        name: sourceItem.name,
        description: sourceItem.description,
        address: sourceItem.address,
        latitude: sourceItem.latitude,
        longitude: sourceItem.longitude,
        phone: sourceItem.phone,
        website: sourceItem.website,
        materials: sourceItem.materials.join(','),
        display_order: destination.index + 1,
      },
      {
        id: destinationItem.id,
        name: destinationItem.name,
        description: destinationItem.description,
        address: destinationItem.address,
        latitude: destinationItem.latitude,
        longitude: destinationItem.longitude,
        phone: destinationItem.phone,
        website: destinationItem.website,
        materials: destinationItem.materials.join(','),
        display_order: source.index + 1,
      }
    ];

    try {
      const { error } = await supabase.from('collection_points').upsert(updates);
      
      if (error) {
        toast({
          title: "Erro ao trocar posições",
          description: error.message,
          variant: "destructive",
        });
        // Revert on error
        loadPoints();
      } else {
        toast({
          title: "Posições dos cards trocadas!",
        });
      }
    } catch (error) {
      console.error('Error swapping positions:', error);
      // Revert on error
      loadPoints();
    }
  };

  return {
    points,
    isEditing,
    editingPoint,
    open,
    setOpen,
    availableMaterials,
    handleDeletePoint,
    handleEditPoint,
    handleAddPoint,
    handleSubmit,
    handleDragEnd,
  };
};
