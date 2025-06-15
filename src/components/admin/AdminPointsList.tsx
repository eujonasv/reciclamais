
import React from 'react';
import { motion } from 'framer-motion';
import { CollectionPoint } from '@/types/collection-point';
import AdminCollectionPointCard from './AdminCollectionPointCard';

interface AdminPointsListProps {
  points: CollectionPoint[];
  onEdit: (point: CollectionPoint) => void;
  onDelete: (id: string) => void;
  isReordering: boolean;
  handleMovePoint: (id: string, direction: 'up' | 'down') => void;
  handleMoveToPosition: (id: string, position: number) => void;
}

const AdminPointsList: React.FC<AdminPointsListProps> = ({
  points,
  onEdit,
  onDelete,
  isReordering,
  handleMovePoint,
  handleMoveToPosition,
}) => {
  return (
    <div className="flex flex-wrap -mx-2">
      {points.map((point, index) => (
        <div
          key={point.id}
          className="w-full sm:w-1/2 lg:w-1/3 px-2 mb-4"
        >
          <motion.div
            layout="position"
            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
          >
            <AdminCollectionPointCard
              point={point}
              onEdit={onEdit}
              onDelete={onDelete}
              isReordering={isReordering}
              handleMovePoint={handleMovePoint}
              handleMoveToPosition={handleMoveToPosition}
              index={index}
              totalPoints={points.length}
            />
          </motion.div>
        </div>
      ))}
    </div>
  );
};

export default AdminPointsList;
