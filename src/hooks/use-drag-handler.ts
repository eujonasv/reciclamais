
import { DropResult } from '@hello-pangea/dnd';
import { CollectionPoint } from '@/types/collection-point';
import { collectionPointsService } from '@/services/collection-points-service';
import { useToast } from "@/hooks/use-toast";

export const useDragHandler = (
  points: CollectionPoint[], 
  setPoints: (points: CollectionPoint[]) => void,
  loadPoints: () => Promise<void>
) => {
  const { toast } = useToast();

  const handleDragEnd = async (result: DropResult) => {
    const { destination, source } = result;
    
    if (!destination || destination.index === source.index) {
      return;
    }

    // Create a new array with the item moved to the correct position
    const newPoints = Array.from(points);
    const [removed] = newPoints.splice(source.index, 1);
    newPoints.splice(destination.index, 0, removed);

    // Update local state immediately for smooth UX
    setPoints(newPoints);

    // Prepare updates for all affected items (all items need new display_order)
    const updates = newPoints.map((point, index) => ({
      id: point.id,
      name: point.name,
      description: point.description,
      address: point.address,
      latitude: point.latitude,
      longitude: point.longitude,
      phone: point.phone,
      website: point.website,
      materials: point.materials.join(','),
      display_order: index + 1,
    }));

    try {
      await collectionPointsService.updateAllPointsOrder(updates);
      toast({
        title: "Posição do card atualizada!",
      });
    } catch (error) {
      console.error('Error updating positions:', error);
      toast({
        title: "Erro ao atualizar posição",
        description: error instanceof Error ? error.message : "Erro desconhecido",
        variant: "destructive",
      });
      // Revert on error
      loadPoints();
    }
  };

  return { handleDragEnd };
};
