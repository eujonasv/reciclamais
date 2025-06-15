
import { useState } from 'react';
import { CollectionPoint, materialColors } from '@/types/collection-point';

export const useCollectionPointsState = () => {
  const [points, setPoints] = useState<CollectionPoint[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingPoint, setEditingPoint] = useState<CollectionPoint | null>(null);
  const [open, setOpen] = useState(false);
  const [availableMaterials] = useState<string[]>(Object.keys(materialColors));
  const [isReordering, setIsReordering] = useState(false);

  const handleEditPoint = (point: CollectionPoint) => {
    setEditingPoint(point);
    setIsEditing(true);
    setOpen(true);
  };

  const handleAddPoint = () => {
    setIsEditing(false);
    setEditingPoint(null);
    setOpen(true);
  };

  const resetForm = () => {
    setOpen(false);
    setEditingPoint(null);
    setIsEditing(false);
  };

  return {
    points,
    setPoints,
    isEditing,
    editingPoint,
    open,
    setOpen,
    availableMaterials,
    isReordering,
    setIsReordering,
    handleEditPoint,
    handleAddPoint,
    resetForm,
  };
};
