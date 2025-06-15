
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { CollectionPoint, materialColors } from '@/types/collection-point';
import AdminCollectionPointCard from './admin/AdminCollectionPointCard';
import { CollectionPointForm } from './admin/CollectionPointForm';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';

interface AdminMapProps {
  isMobile?: boolean;
}

const AdminMap: React.FC<AdminMapProps> = ({ isMobile = false }) => {
  const [points, setPoints] = useState<CollectionPoint[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingPoint, setEditingPoint] = useState<CollectionPoint | null>(null);
  const [open, setOpen] = useState(false);
  const [availableMaterials] = useState<string[]>(
    Object.keys(materialColors)
  );
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

  React.useEffect(() => {
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

  return (
    <div className="p-4 max-w-7xl mx-auto">
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
            <CollectionPointForm
              isEditing={isEditing}
              editingPoint={editingPoint}
              availableMaterials={availableMaterials}
              onSubmit={handleSubmit}
              onCancel={() => setOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>
      
      {points.length === 0 ? (
        <div className="col-span-full py-12 text-center">
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Nenhum ponto de coleta cadastrado
          </p>
          <Button onClick={handleAddPoint}>
            <Plus size={16} className="mr-2" />
            Adicionar Ponto de Coleta
          </Button>
        </div>
      ) : (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="collection-points-swap">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {points.map((point, index) => (
                  <Draggable key={point.id} draggableId={point.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        style={provided.draggableProps.style}
                      >
                        <AdminCollectionPointCard
                          point={point}
                          onEdit={handleEditPoint}
                          onDelete={handleDeletePoint}
                          dragHandleProps={provided.dragHandleProps}
                          isDragging={false}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </div>
  );
};

export default AdminMap;
