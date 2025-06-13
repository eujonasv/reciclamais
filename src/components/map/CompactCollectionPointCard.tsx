
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { materialColors } from '@/types/collection-point';
import type { CollectionPoint } from '@/types/collection-point';
import GoogleMapsLogo from '/lovable-uploads/googlemapslogo.png';
import WazeLogo from '/lovable-uploads/wazelogo.png';

interface CompactCollectionPointCardProps {
  point: CollectionPoint;
  isSelected?: boolean;
  onClick?: () => void;
}

const CompactCollectionPointCard = ({
  point,
  isSelected = false,
  onClick
}: CompactCollectionPointCardProps) => {
  return (
    <div 
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm p-3 border ${
        isSelected 
          ? 'border-recicla-primary dark:border-recicla-secondary border-2' 
          : 'border-gray-200 dark:border-gray-700'
      } cursor-pointer transition-all hover:shadow-md hover:border-recicla-primary/50 dark:hover:border-recicla-secondary/50`}
      onClick={onClick}
    >
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-recicla-primary dark:text-recicla-secondary line-clamp-1">
          {point.name}
        </h3>
        
        <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
          {point.address}
        </p>

        <div className="flex flex-wrap gap-1">
          {point.materials.slice(0, 3).map(material => (
            <Badge 
              key={material} 
              variant="outline" 
              className={`text-xs px-1.5 py-0.5 ${materialColors[material]}`}
            >
              {material}
            </Badge>
          ))}
          {point.materials.length > 3 && (
            <Badge variant="outline" className="text-xs px-1.5 py-0.5 bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400">
              +{point.materials.length - 3}
            </Badge>
          )}
        </div>

        <div className="flex gap-1.5 pt-1">
          <a 
            href={`https://www.google.com/maps/search/?api=1&query=${point.latitude},${point.longitude}`} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center bg-zinc-50 dark:bg-gray-700 rounded-full hover:bg-zinc-200 dark:hover:bg-gray-600 transition-colors p-1"
            onClick={(e) => e.stopPropagation()}
            title="Abrir no Google Maps"
          >
            <img src={GoogleMapsLogo} alt="Google Maps" className="w-5 h-4" />
          </a>
          <a 
            href={`https://waze.com/ul?ll=${point.latitude},${point.longitude}&navigate=yes`} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center bg-zinc-50 dark:bg-gray-700 rounded-full hover:bg-zinc-200 dark:hover:bg-gray-600 transition-colors p-1"
            onClick={(e) => e.stopPropagation()}
            title="Abrir no Waze"
          >
            <img src={WazeLogo} alt="Waze" className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default CompactCollectionPointCard;
