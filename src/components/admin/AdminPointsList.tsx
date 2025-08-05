
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { CollectionPoint } from '@/types/collection-point';
import AdminCollectionPointCard from './AdminCollectionPointCard';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

interface AdminPointsListProps {
  points: CollectionPoint[];
  onEdit: (point: CollectionPoint) => void;
  onDelete: (id: string) => void;
  isReordering: boolean;
  handleMovePoint: (id: string, direction: 'up' | 'down') => void;
  handleMoveToPosition: (id: string, position: number) => void;
}

const POINTS_PER_PAGE = 6;

const AdminPointsList: React.FC<AdminPointsListProps> = ({
  points,
  onEdit,
  onDelete,
  isReordering,
  handleMovePoint,
  handleMoveToPosition,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const { paginatedPoints, totalPages, startIndex } = useMemo(() => {
    const startIndex = (currentPage - 1) * POINTS_PER_PAGE;
    const endIndex = startIndex + POINTS_PER_PAGE;
    const paginatedPoints = points.slice(startIndex, endIndex);
    const totalPages = Math.ceil(points.length / POINTS_PER_PAGE);
    
    return { paginatedPoints, totalPages, startIndex };
  }, [points, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap -mx-2">
        {paginatedPoints.map((point, index) => (
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
                index={startIndex + index}
                totalPoints={points.length}
              />
            </motion.div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={handlePrevious}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    onClick={() => handlePageChange(page)}
                    isActive={currentPage === page}
                    className="cursor-pointer"
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={handleNext}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default AdminPointsList;
