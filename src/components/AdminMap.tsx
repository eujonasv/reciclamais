
import React, { useState } from 'react';
import { MapPin, Plus, Trash2, Edit2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface CollectionPoint {
  id: number;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  address: string;
  phone: string;
  website: string;
  materials: string[];
}

const AdminMap = () => {
  const [points, setPoints] = useState<CollectionPoint[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingPoint, setEditingPoint] = useState<CollectionPoint | null>(null);
  const { toast } = useToast();

  const handleAddPoint = async (point: Omit<CollectionPoint, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('collection_points')
        .insert([point])
        .select()
        .single();

      if (error) throw error;

      setPoints([...points, data]);
      toast({
        title: "Ponto adicionado",
        description: "O ponto de coleta foi adicionado com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível adicionar o ponto de coleta.",
        variant: "destructive",
      });
    }
  };

  const handleEditPoint = async (point: CollectionPoint) => {
    try {
      const { error } = await supabase
        .from('collection_points')
        .update(point)
        .eq('id', point.id);

      if (error) throw error;

      setPoints(points.map(p => p.id === point.id ? point : p));
      toast({
        title: "Ponto atualizado",
        description: "O ponto de coleta foi atualizado com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o ponto de coleta.",
        variant: "destructive",
      });
    }
  };

  const handleDeletePoint = async (id: number) => {
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
      toast({
        title: "Erro",
        description: "Não foi possível remover o ponto de coleta.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Gerenciar Pontos de Coleta</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Adicionar Ponto
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Novo Ponto de Coleta</DialogTitle>
            </DialogHeader>
            {/* Form implementation will go here */}
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {points.map((point) => (
          <div key={point.id} className="border p-4 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">{point.name}</h3>
                <p className="text-gray-600">{point.description}</p>
                <p className="text-sm text-gray-500">{point.address}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" onClick={() => setEditingPoint(point)}>
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button variant="destructive" size="icon" onClick={() => handleDeletePoint(point.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminMap;
