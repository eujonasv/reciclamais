
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
      await collectionPointsService.swapPointsOrder(updates);
      toast({
        title: "Posições dos cards trocadas!",
      });
    } catch (error) {
      console.error('Error swapping positions:', error);
      toast({
        title: "Erro ao trocar posições",
        description: error instanceof Error ? error.message : "Erro desconhecido",
        variant: "destructive",
      });
      // Revert on error
      loadPoints();
    }
  };

  return { handleDragEnd };
};
