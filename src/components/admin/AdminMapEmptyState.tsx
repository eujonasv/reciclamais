
import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface AdminMapEmptyStateProps {
  onAddPoint: () => void;
}

const AdminMapEmptyState: React.FC<AdminMapEmptyStateProps> = ({ onAddPoint }) => {
  return (
    <div className="col-span-full py-12 text-center">
      <p className="text-gray-500 dark:text-gray-400 mb-4">
        Nenhum ponto de coleta cadastrado
      </p>
      <Button onClick={onAddPoint}>
        <Plus size={16} className="mr-2" />
        Adicionar Ponto de Coleta
      </Button>
    </div>
  );
};

export default AdminMapEmptyState;
