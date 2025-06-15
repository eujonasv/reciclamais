
import React from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { CollectionPoint } from '@/types/collection-point';
import AdminCollectionPointCard from './AdminCollectionPointCard';

interface AdminPointsListProps {
  points: CollectionPoint[];
  onEdit: (point: CollectionPoint) => void;
  onDelete: (id: string) => void;
  onDragEnd: (result: DropResult) => void;
  isReordering: boolean;
}

const AdminPointsList: React.FC<AdminPointsListProps> = ({
  points,
  onEdit,
  onDelete,
  onDragEnd,
  isReordering,
}) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="collection-points-list">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {points.map((point, index) => (
              <Draggable 
                key={point.id} 
                draggableId={point.id} 
                index={index}
                isDragDisabled={!isReordering}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                  >
                    <AdminCollectionPointCard
                      point={point}
                      onEdit={onEdit}
                      onDelete={onDelete}
                      dragHandleProps={provided.dragHandleProps}
                      isDragging={snapshot.isDragging}
                      isReordering={isReordering}
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
  );
};

export default AdminPointsList;
