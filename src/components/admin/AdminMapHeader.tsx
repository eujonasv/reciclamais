
import React from 'react';
import { Plus, MoveVertical, Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { CollectionPoint } from '@/types/collection-point';
import { MultiStepCollectionPointForm } from './collection-point-form/MultiStepCollectionPointForm';

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
  const dialogTitle = isEditing ? "Editar Ponto de Coleta" : "Adicionar Ponto de Coleta";
  const dialogDescription = isEditing
    ? "Atualize as informações do ponto de coleta."
    : "Preencha os dados para adicionar um novo ponto.";

  const formComponent = (
    <MultiStepCollectionPointForm
      isEditing={isEditing}
      editingPoint={editingPoint}
      availableMaterials={availableMaterials}
      onSubmit={onSubmit}
      onCancel={() => setOpen(false)}
      isMobile={isMobile}
    />
  );

  const ReorderButton = () => (
    <Button
      onClick={toggleReordering}
      variant={isReordering ? "default" : "outline"}
      size={isMobile ? "sm" : "default"}
      className={isReordering ? "bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800" : ""}
    >
      {isReordering ? (
        <>
          <Check size={16} className={isMobile ? "" : "mr-2"} />
          {isMobile ? "" : "Concluir"}
        </>
      ) : (
        <>
          <MoveVertical size={16} className={isMobile ? "" : "mr-2"} />
          {isMobile ? "" : "Reordenar"}
        </>
      )}
    </Button>
  );

  const AddPointTrigger = (
    <Button
      onClick={onAddPoint}
      disabled={isReordering}
      size={isMobile ? "sm" : "default"}
      className="transition-all duration-300 shadow-md hover:shadow-lg"
    >
      <Plus size={16} className="mr-2" />
      {isMobile ? "Adicionar" : "Adicionar Ponto"}
    </Button>
  );

  if (isMobile) {
    return (
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Gerenciar Pontos</h1>
        <div className="flex items-center gap-2">
          <ReorderButton />
          <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>{AddPointTrigger}</DrawerTrigger>
            <DrawerContent className="h-[90vh]">
              <DrawerHeader className="text-left">
                <DrawerTitle>{dialogTitle}</DrawerTitle>
                <DrawerDescription>{dialogDescription}</DrawerDescription>
              </DrawerHeader>
              <div className="px-4 pb-4 flex-grow overflow-y-auto">{formComponent}</div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">Gerenciar Pontos de Coleta</h1>
      <div className="flex items-center gap-4">
        <ReorderButton />
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>{AddPointTrigger}</DialogTrigger>
          <DialogContent className="max-w-2xl h-[90vh] flex flex-col p-0">
            <DialogHeader className="p-6 pb-0">
              <DialogTitle>{dialogTitle}</DialogTitle>
              <DialogDescription>{dialogDescription}</DialogDescription>
            </DialogHeader>
            <div className="flex-grow overflow-y-auto p-6">{formComponent}</div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AdminMapHeader;
