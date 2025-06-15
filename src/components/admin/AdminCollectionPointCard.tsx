import React from 'react';
import { MapPin, Edit2, Trash2, ArrowUp, ArrowDown, ChevronsUpDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CollectionPoint, materialColors } from '@/types/collection-point';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

interface AdminCollectionPointCardProps {
  point: CollectionPoint;
  onEdit: (point: CollectionPoint) => void;
  onDelete: (id: string) => void;
  isReordering?: boolean;
  handleMovePoint?: (id: string, direction: 'up' | 'down') => void;
  handleMoveToPosition?: (id: string, position: number) => void;
  index?: number;
  totalPoints?: number;
}

const AdminCollectionPointCardComponent: React.FC<AdminCollectionPointCardProps> = ({
  point,
  onEdit,
  onDelete,
  isReordering,
  handleMovePoint,
  handleMoveToPosition,
  index,
  totalPoints,
}) => {
  const currentPosition = (index ?? 0) + 1;

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl border-2 p-4 h-full flex flex-col transition-all duration-200 border-gray-200 dark:border-gray-700 ${isReordering ? 'border-blue-300 dark:border-blue-800' : ''}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center min-w-0 flex-grow">
          {isReordering ? (
            <div className="p-1 mr-3 flex-shrink-0 font-bold text-lg text-blue-600 dark:text-blue-400 w-8 text-center">
              {currentPosition}
            </div>
          ) : (
            <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-3 flex-shrink-0" />
          )}
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate text-sm leading-tight">{point.name}</h3>
        </div>
        <div className="flex items-center space-x-1 ml-2 flex-shrink-0">
          {isReordering && handleMovePoint && handleMoveToPosition && totalPoints ? (
            <>
               <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ChevronsUpDown size={14} className="text-gray-600 dark:text-gray-300" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="max-h-60 overflow-y-auto">
                  <DropdownMenuLabel>Mover para Posição</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {Array.from({ length: totalPoints }, (_, i) => i + 1).map((pos) => (
                    <DropdownMenuItem
                      key={pos}
                      disabled={pos === currentPosition}
                      onSelect={() => handleMoveToPosition(point.id, pos)}
                    >
                      Posição {pos}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleMovePoint(point.id, 'up')} disabled={index === 0}>
                <ArrowUp size={14} className="text-gray-600 dark:text-gray-300" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleMovePoint(point.id, 'down')} disabled={index === (totalPoints ?? 0) - 1}>
                <ArrowDown size={14} className="text-gray-600 dark:text-gray-300" />
              </Button>
            </>
          ) : (
            <>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => onEdit(point)}
                className="h-8 w-8 hover:bg-blue-50 dark:hover:bg-blue-900/20"
              >
                <Edit2 size={14} className="text-blue-600 dark:text-blue-400" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => onDelete(point.id)}
                className="h-8 w-8 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <Trash2 size={14} className="text-red-500 dark:text-red-400" />
              </Button>
            </>
          )}
        </div>
      </div>
      
      <div className="flex-grow space-y-3">
        <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
          {point.description}
        </p>
        
        <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
          📍 {point.address}
        </div>
        
        <div className="flex flex-wrap gap-1.5">
          {point.materials.slice(0, 3).map((material) => (
            <Badge 
              key={material} 
              className={`${materialColors[material]} text-xs px-2 py-1 font-medium`}
              variant="outline"
            >
              {material}
            </Badge>
          ))}
          {point.materials.length > 3 && (
            <Badge 
              className="text-xs px-2 py-1 bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
              variant="outline"
            >
              +{point.materials.length - 3}
            </Badge>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
        <a 
          href={`https://www.google.com/maps/search/?api=1&query=${point.latitude},${point.longitude}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-3 py-1.5 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 font-medium"
        >
          📍 Maps
        </a>
        <a 
          href={`https://waze.com/ul?ll=${point.latitude},${point.longitude}&navigate=yes`}
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-xs bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200 px-3 py-1.5 rounded-full hover:bg-teal-200 dark:hover:bg-teal-800 font-medium"
        >
          🚗 Waze
        </a>
      </div>
    </div>
  );
};

export const AdminCollectionPointCard = React.memo(AdminCollectionPointCardComponent);
export default AdminCollectionPointCard;
