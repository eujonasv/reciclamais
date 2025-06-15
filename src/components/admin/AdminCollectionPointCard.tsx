
import React from 'react';
import { MapPin, Edit2, Trash2, GripVertical } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CollectionPoint, materialColors } from '@/types/collection-point';

interface AdminCollectionPointCardProps {
  point: CollectionPoint;
  onEdit: (point: CollectionPoint) => void;
  onDelete: (id: string) => void;
  dragHandleProps?: any;
  isDragging?: boolean;
}

const AdminCollectionPointCard: React.FC<AdminCollectionPointCardProps> = ({
  point,
  onEdit,
  onDelete,
  dragHandleProps,
  isDragging,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 p-4 h-full flex flex-col cursor-default">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center min-w-0 flex-grow">
          <div 
            {...dragHandleProps} 
            className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 mr-3 flex-shrink-0 p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <GripVertical size={18} />
          </div>
          <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2 flex-shrink-0" />
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate text-sm leading-tight">{point.name}</h3>
        </div>
        <div className="flex space-x-1 ml-2 flex-shrink-0">
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

export default AdminCollectionPointCard;
