
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
    isReordering,
    toggleReordering,
    handleMovePoint,
    handleMoveToPosition,
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
        isReordering={isReordering}
        toggleReordering={toggleReordering}
      />
      
      {points.length === 0 ? (
        <AdminMapEmptyState onAddPoint={handleAddPoint} />
      ) : (
        <AdminPointsList
          points={points}
          onEdit={handleEditPoint}
          onDelete={handleDeletePoint}
          isReordering={isReordering}
          handleMovePoint={handleMovePoint}
          handleMoveToPosition={handleMoveToPosition}
        />
      )}
    </div>
  );
};

export default AdminMap;
