
import React from 'react';
import { useCollectionPoints } from '@/hooks/use-collection-points';
import AdminMapHeader from './admin/AdminMapHeader';
import AdminMapEmptyState from './admin/AdminMapEmptyState';
import AdminPointsList from './admin/AdminPointsList';

interface AdminMapProps {
  isMobile?: boolean;
}

const AdminMap: React.FC<AdminMapProps> = ({ isMobile = false }) => {
  const {
    points,
    isEditing,
    editingPoint,
    open,
    setOpen,
    availableMaterials,
    handleDeletePoint,
    handleEditPoint,
    handleAddPoint,
    handleSubmit,
    handleDragEnd,
  } = useCollectionPoints();

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <AdminMapHeader
        isMobile={isMobile}
        open={open}
        setOpen={setOpen}
        isEditing={isEditing}
        editingPoint={editingPoint}
        availableMaterials={availableMaterials}
        onSubmit={handleSubmit}
        onAddPoint={handleAddPoint}
      />
      
      {points.length === 0 ? (
        <AdminMapEmptyState onAddPoint={handleAddPoint} />
      ) : (
        <AdminPointsList
          points={points}
          onEdit={handleEditPoint}
          onDelete={handleDeletePoint}
          onDragEnd={handleDragEnd}
        />
      )}
    </div>
  );
};

export default AdminMap;
