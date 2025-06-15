
import React from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { motion } from 'framer-motion';
import { CollectionPoint } from '@/types/collection-point';
import AdminCollectionPointCard from './AdminCollectionPointCard';

interface AdminPointsListProps {
  points: CollectionPoint[];
  onEdit: (point: CollectionPoint) => void;
  onDelete: (id: string) => void;
  onDragEnd: (result: DropResult) => void;
  isReordering: boolean;
  handleMovePoint: (id: string, direction: 'up' | 'down') => void;
}

const AdminPointsList: React.FC<AdminPointsListProps> = ({
  points,
  onEdit,
  onDelete,
  onDragEnd,
  isReordering,
  handleMovePoint,
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
              <Draggable key={point.id} draggableId={point.id} index={index} isDragDisabled={!isReordering}>
                {(providedDraggable, snapshot) => (
                  <motion.div
                    ref={providedDraggable.innerRef}
                    {...providedDraggable.draggableProps}
                    layout="position"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  >
                    <AdminCollectionPointCard
                      point={point}
                      onEdit={onEdit}
                      onDelete={onDelete}
                      dragHandleProps={providedDraggable.dragHandleProps}
                      isDragging={snapshot.isDragging}
                      isReordering={isReordering}
                      handleMovePoint={handleMovePoint}
                      index={index}
                      totalPoints={points.length}
                    />
                  </motion.div>
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
