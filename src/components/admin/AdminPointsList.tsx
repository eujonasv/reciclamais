
import React from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { CollectionPoint } from '@/types/collection-point';
import AdminCollectionPointCard from './AdminCollectionPointCard';

interface AdminPointsListProps {
  points: CollectionPoint[];
  onEdit: (point: CollectionPoint) => void;
  onDelete: (id: string) => void;
  onDragEnd: (result: DropResult) => void;
}

const AdminPointsList: React.FC<AdminPointsListProps> = ({
  points,
  onEdit,
  onDelete,
  onDragEnd,
}) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="collection-points-list">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 transition-colors duration-200 ${
              snapshot.isDraggingOver ? 'bg-blue-50 dark:bg-blue-900/10' : ''
            }`}
          >
            {points.map((point, index) => (
              <Draggable key={point.id} draggableId={point.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className={`transition-all duration-200 ${
                      snapshot.isDragging 
                        ? 'rotate-2 scale-105 shadow-2xl z-50' 
                        : 'hover:shadow-lg'
                    }`}
                  >
                    <AdminCollectionPointCard
                      point={point}
                      onEdit={onEdit}
                      onDelete={onDelete}
                      dragHandleProps={provided.dragHandleProps}
                      isDragging={snapshot.isDragging}
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
