
import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { CollectionPoint } from '@/types/collection-point';
import { CollectionPointForm } from './CollectionPointForm';

interface AdminMapHeaderProps {
  isMobile?: boolean;
  open: boolean;
  setOpen: (open: boolean) => void;
  isEditing: boolean;
  editingPoint: CollectionPoint | null;
  availableMaterials: string[];
  onSubmit: (values: any) => Promise<void>;
  onAddPoint: () => void;
  isReordering: boolean;
  toggleReordering: () => void;
}

const AdminMapHeader: React.FC<AdminMapHeaderProps> = ({
  isMobile = false,
  open,
  setOpen,
  isEditing,
  editingPoint,
  availableMaterials,
  onSubmit,
  onAddPoint,
  isReordering,
  toggleReordering,
}) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">Gerenciar Pontos de Coleta</h1>
      <div className="flex items-center gap-2">
        <Button onClick={toggleReordering} variant="outline">
          {isReordering ? "Concluir" : "Reordenar"}
        </Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={onAddPoint} disabled={isReordering} className={isMobile ? "px-2 py-1 h-auto" : ""}>
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
              onSubmit={onSubmit}
              onCancel={() => setOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AdminMapHeader;
