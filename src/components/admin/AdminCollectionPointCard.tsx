
import React from 'react';
import { MapPin, Edit2, Trash2, GripVertical } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CollectionPoint, materialColors } from '@/types/collection-point';
import { cn } from "@/lib/utils";

interface AdminCollectionPointCardProps {
  point: CollectionPoint;
  onEdit: (point: CollectionPoint) => void;
  onDelete: (id: string) => void;
  dragHandleProps?: any;
  draggableProps?: any;
  isDragging?: boolean;
}

const AdminCollectionPointCard = React.forwardRef<HTMLDivElement, AdminCollectionPointCardProps>(({
  point,
  onEdit,
  onDelete,
  dragHandleProps,
  draggableProps,
  isDragging,
}, ref) => {
  return (
    <div
      ref={ref}
      {...draggableProps}
      className={cn(
        "bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border border-gray-200 dark:border-gray-700 flex items-start gap-2 w-full transition-shadow duration-200",
        isDragging && "shadow-2xl"
      )}
    >
      <div {...dragHandleProps} className="cursor-grab text-gray-500 hover:text-gray-700 pt-1">
        <GripVertical size={20} />
      </div>
      <div className="flex-grow">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center">
            <MapPin className="h-5 w-5 text-recicla-primary dark:text-recicla-secondary mr-2" />
            <h3 className="font-semibold">{point.name}</h3>
          </div>
          <div className="flex space-x-1">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => onEdit(point)}
            >
              <Edit2 size={16} />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => onDelete(point.id)}
            >
              <Trash2 size={16} className="text-red-500" />
            </Button>
          </div>
        </div>
        
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
          {point.description}
        </p>
        
        <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
          {point.address}
        </div>
        
        <div className="flex flex-wrap gap-1 mt-2 mb-3">
          {point.materials.map((material) => (
            <Badge 
              key={material} 
              className={materialColors[material]}
              variant="outline"
            >
              {material}
            </Badge>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mt-2">
          <a 
            href={`https://www.google.com/maps/search/?api=1&query=${point.latitude},${point.longitude}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full hover:bg-blue-200 transition-colors"
          >
            Google Maps
          </a>
          <a 
            href={`https://waze.com/ul?ll=${point.latitude},${point.longitude}&navigate=yes`}
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-xs bg-teal-100 text-teal-800 px-2 py-1 rounded-full hover:bg-teal-200 transition-colors"
          >
            Waze
          </a>
        </div>
      </div>
    </div>
  );
});

AdminCollectionPointCard.displayName = "AdminCollectionPointCard";

export default AdminCollectionPointCard;
