import { useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { collectionPointsService } from '@/services/collection-points-service';
import { useCollectionPointsState } from './use-collection-points-state';
import { useDragHandler } from './use-drag-handler';

export const useCollectionPoints = () => {
  const { toast } = useToast();
  const {
    points,
    setPoints,
    isEditing,
    editingPoint,
    open,
    setOpen,
    availableMaterials,
    handleEditPoint,
    handleAddPoint,
    resetForm,
    isReordering,
    setIsReordering,
  } = useCollectionPointsState();

  // Load collection points from Supabase
  const loadPoints = async () => {
    try {
      const data = await collectionPointsService.loadPoints();
      setPoints(data);
    } catch (error) {
      toast({
        title: "Erro ao carregar pontos de coleta",
        description: error instanceof Error ? error.message : "Erro desconhecido",
        variant: "destructive",
      });
      console.error("Error loading collection points:", error);
    }
  };

  useEffect(() => {
    loadPoints();
  }, []);

  // Delete a collection point
  const handleDeletePoint = async (id: string) => {
    try {
      await collectionPointsService.deletePoint(id);
      setPoints(points.filter((point) => point.id !== id));
      toast({ title: "Ponto de coleta deletado com sucesso" });
    } catch (error) {
      toast({
        title: "Erro ao deletar ponto de coleta",
        description: error instanceof Error ? error.message : "Erro desconhecido",
        variant: "destructive",
      });
      console.error("Error deleting collection point:", error);
    }
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

      if (isEditing && editingPoint) {
        await collectionPointsService.updatePoint(editingPoint.id, payload);
      } else {
        const newOrder = points.length > 0 ? Math.max(...points.map(p => p.display_order ?? 0)) + 1 : 1;
        await collectionPointsService.createPoint({...payload, display_order: newOrder});
      }

      resetForm();
      loadPoints();
      toast({ 
        title: isEditing 
          ? "Ponto de coleta atualizado com sucesso" 
          : "Ponto de coleta adicionado com sucesso" 
      });
    } catch (error) {
      toast({
        title: "Erro ao salvar ponto de coleta",
        description: error instanceof Error ? error.message : "Erro desconhecido",
        variant: "destructive",
      });
      console.error("Error saving collection point:", error);
    }
  };

  const handleToggleReorder = () => {
    setIsReordering(prev => !prev);
  };

  const { handleDragEnd } = useDragHandler(points, setPoints, loadPoints);

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
    isReordering,
    handleToggleReorder,
  };
};
