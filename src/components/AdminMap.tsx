
import React from 'react';
import { useCollectionPoints } from '@/hooks/use-collection-points';
import AdminMapHeader from './admin/AdminMapHeader';
import AdminMapEmptyState from './admin/AdminMapEmptyState';
import AdminPointsList from './admin/AdminPointsList';

interface AdminMapProps {
  isMobile?: boolean;
  collectionPointsData: ReturnType<typeof useCollectionPoints>;
}

const AdminMap: React.FC<AdminMapProps> = ({ isMobile = false, collectionPointsData }) => {
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
  } = collectionPointsData;

  return (
    <div className="bg-card text-card-foreground rounded-lg border shadow-sm h-full flex flex-col">
      <div className="p-4 md:p-6 flex-grow flex flex-col">
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
          <div className="flex-grow -mx-2">
            <AdminPointsList
              points={points}
              onEdit={handleEditPoint}
              onDelete={handleDeletePoint}
              isReordering={isReordering}
              handleMovePoint={handleMovePoint}
              handleMoveToPosition={handleMoveToPosition}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminMap;
