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

    // Se não mudou de posição, não faz nada.
    if (!destination || destination.index === source.index) {
      return;
    }

    // Move o card de fato para a nova posição
    const newPoints = Array.from(points);
    const [moved] = newPoints.splice(source.index, 1);
    newPoints.splice(destination.index, 0, moved);

    // Atualiza local pela ordem nova
    setPoints(newPoints);

    // Monta a lista de updates para display_order
    const updates = newPoints.map((p, idx) => ({
      id: p.id,
      name: p.name,
      description: p.description,
      address: p.address,
      latitude: p.latitude,
      longitude: p.longitude,
      phone: p.phone,
      website: p.website,
      materials: p.materials.join(','),
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
      // Reverte se falhar
      loadPoints();
    }
  };

  return { handleDragEnd };
};
