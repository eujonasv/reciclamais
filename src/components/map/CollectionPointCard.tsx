
import React from 'react';
import { MapPin, Phone, Info, Link as LinkIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { CollectionPoint, materialColors } from '@/types/collection-point';

interface CollectionPointCardProps {
  point: CollectionPoint;
  selectedPoint: CollectionPoint | null;
  onToggleSelect: (point: CollectionPoint) => void;
}

const CollectionPointCard = ({ 
  point, 
  selectedPoint, 
  onToggleSelect 
}: CollectionPointCardProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100 dark:border-gray-700">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            <MapPin className="h-6 w-6 text-recicla-primary dark:text-recicla-secondary mr-2" />
            <h3 className="text-lg font-bold">{point.name}</h3>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onToggleSelect(point)}
            className="text-gray-500 hover:text-recicla-primary dark:hover:text-recicla-secondary"
          >
            <Info size={18} />
          </Button>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
          {point.description}
        </p>
        
        <div className="flex items-start mb-3">
          <MapPin size={16} className="mr-2 text-gray-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {point.address}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-1 mt-3">
          {point.materials.slice(0, 3).map((material) => (
            <span 
              key={material} 
              className={`inline-block text-xs px-2 py-0.5 rounded-full ${materialColors[material]}`}
            >
              {material}
            </span>
          ))}
          {point.materials.length > 3 && (
            <span className="inline-block text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
              +{point.materials.length - 3}
            </span>
          )}
        </div>
        
        {selectedPoint?.id === point.id && (
          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center mb-2">
              <Phone size={16} className="mr-2 text-gray-500" />
              <p className="text-sm">{point.phone}</p>
            </div>
            
            {point.website && (
              <div className="flex items-center mb-2">
                <LinkIcon size={16} className="mr-2 text-gray-500" />
                <a 
                  href={point.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Website
                </a>
              </div>
            )}
            
            <div>
              <p className="text-sm font-medium mb-1">Todos materiais aceitos:</p>
              <div className="flex flex-wrap gap-1">
                {point.materials.map((material) => (
                  <span 
                    key={material} 
                    className={`inline-block text-xs px-2 py-0.5 rounded-full ${materialColors[material]}`}
                  >
                    {material}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollectionPointCard;
