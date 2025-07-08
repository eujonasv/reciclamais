import { useEffect, useCallback } from 'react';
import { useToast } from "@/hooks/use-toast";
import { collectionPointsService } from '@/services/collection-points-service';
import { useCollectionPointsState } from './use-collection-points-state';
import { CollectionPoint } from '@/types/collection-point';

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
  const loadPoints = useCallback(async () => {
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
  }, [setPoints, toast]);

  useEffect(() => {
    loadPoints();
  }, [loadPoints]);

  // Delete a collection point
  const handleDeletePoint = useCallback(async (id: string) => {
    try {
      await collectionPointsService.deletePoint(id);
      setPoints(points => points.filter((point) => point.id !== id));
      toast({ title: "Ponto de coleta deletado com sucesso" });
    } catch (error) {
      toast({
        title: "Erro ao deletar ponto de coleta",
        description: error instanceof Error ? error.message : "Erro desconhecido",
        variant: "destructive",
      });
      console.error("Error deleting collection point:", error);
    }
  }, [setPoints, toast]);

  // Handle form submission
  const handleSubmit = async (values: any) => {
    try {
      const payload = {
        name: values.name,
        description: JSON.stringify(values.openingHours),
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

  const toggleReordering = useCallback(() => {
    setIsReordering(prev => !prev);
  }, [setIsReordering]);

  const updateOrderInBackend = useCallback(async (newPoints: CollectionPoint[]) => {
    const updates = newPoints.map((p, idx) => ({
      id: p.id,
      name: p.name,
      description: JSON.stringify(p.openingHours),
      address: p.address,
      latitude: p.latitude,
      longitude: p.longitude,
      phone: p.phone,
      website: p.website,
      materials: Array.isArray(p.materials) ? p.materials.join(',') : p.materials,
      display_order: idx + 1,
    }));

    try {
      await collectionPointsService.updateAllPointsOrder(updates);
      toast({ title: "Ordem dos cards atualizada!" });
    } catch (error) {
      console.error('Error updating order:', error);
      toast({
        title: "Erro ao atualizar ordem",
        description: error instanceof Error ? error.message : "Erro desconhecido",
        variant: "destructive",
      });
      loadPoints(); // Revert on failure
    }
  }, [toast, loadPoints]);

  const handleMovePoint = useCallback((id: string, direction: 'up' | 'down') => {
    const currentIndex = points.findIndex(p => p.id === id);
    if (currentIndex === -1) return;

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0 || newIndex >= points.length) return;

    const newPoints = Array.from(points);
    const [movedItem] = newPoints.splice(currentIndex, 1);
    newPoints.splice(newIndex, 0, movedItem);

    setPoints(newPoints);
    updateOrderInBackend(newPoints);
  }, [points, setPoints, updateOrderInBackend]);

  const handleMoveToPosition = useCallback((id: string, newPosition: number) => {
    const currentIndex = points.findIndex(p => p.id === id);
    const newIndex = newPosition - 1;

    if (currentIndex === -1 || newIndex < 0 || newIndex >= points.length || currentIndex === newIndex) {
      return;
    }

    const newPoints = Array.from(points);
    const [movedItem] = newPoints.splice(currentIndex, 1);
    newPoints.splice(newIndex, 0, movedItem);

    setPoints(newPoints);
    updateOrderInBackend(newPoints);
  }, [points, setPoints, updateOrderInBackend]);

  return {
    points,
    isEditing,
    editingPoint,
    open,
    setOpen,
    availableMaterials,
    isReordering,
    handleDeletePoint,
    handleEditPoint,
    handleAddPoint,
    handleSubmit,
    toggleReordering,
    handleMovePoint,
    handleMoveToPosition,
  };
};
