
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import { materialColors } from '@/types/collection-point';
import type { CollectionPoint } from '@/types/collection-point';
import { formatOpeningHours } from '@/utils/opening-hours';
import GoogleMapsLogo from '/lovable-uploads/googlemapslogo.png';
import WazeLogo from '/lovable-uploads/wazelogo.png';

interface CollectionPointCardProps {
  point: CollectionPoint;
  isSelected?: boolean;
  onClick?: () => void;
}

const CollectionPointCard = ({
  point,
  isSelected = false,
  onClick
}: CollectionPointCardProps) => {
  return (
    <div 
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border ${
        isSelected 
          ? 'border-recicla-primary dark:border-recicla-secondary border-2' 
          : 'border-gray-200 dark:border-gray-700'
      } mb-4 cursor-pointer transition-all hover:shadow-lg`}
      onClick={onClick}
    >
      <div className="mb-2">
        <h3 className="text-lg font-bold text-recicla-primary dark:text-recicla-secondary">
          {point.name}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">{formatOpeningHours(point.openingHours)}</p>
      </div>

      <div className="space-y-2 text-sm">
        <p className="flex items-start">
          <span className="font-semibold mr-2">Endereço:</span>
          <span className="text-gray-600 dark:text-gray-300">{point.address}</span>
        </p>
        
        <p className="flex items-center">
          <span className="font-semibold mr-2">Telefone:</span>
          <span className="text-gray-600 dark:text-gray-300">{point.phone}</span>
        </p>

        {point.website && <p className="flex items-center">
            <span className="font-semibold mr-2">Website:</span>
            <a 
              href={point.website.startsWith('http') ? point.website : `https://${point.website}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-500 hover:text-blue-700 flex items-center truncate"
              onClick={(e) => e.stopPropagation()} // Prevent triggering card click when clicking website link
            >
              Website <ExternalLink size={12} className="ml-1 flex-shrink-0" />
            </a>
          </p>}
      </div>

      <div className="mt-3">
        <p className="font-semibold mb-1">Materiais Aceitos:</p>
        <div className="flex flex-wrap gap-1">
          {point.materials.map(material => <Badge key={material} variant="outline" className={materialColors[material]}>
              {material}
            </Badge>)}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        <a 
          href={`https://www.google.com/maps/search/?api=1&query=${point.latitude},${point.longitude}`} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-flex items-center text-xs bg-zinc-50 text-gray-800 rounded-full hover:bg-zinc-300 transition-colors mx-0 py-[5px] px-[2px]"
          onClick={(e) => e.stopPropagation()} // Prevent triggering card click when clicking on map links
        >
          <img src={GoogleMapsLogo} alt="Google Maps" className="w-8 h-6" />
        </a>
        <a 
          href={`https://waze.com/ul?ll=${point.latitude},${point.longitude}&navigate=yes`} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-flex items-center text-xs bg-zinc-50 text-gray-800 rounded-full hover:bg-zinc-300 transition-colors mx-0 py-[5px] px-[6px]"
          onClick={(e) => e.stopPropagation()} // Prevent triggering card click when clicking on map links
        >
          <img src={WazeLogo} alt="Waze" className="w-6 h-6" />
        </a>
      </div>
    </div>
  );
};

export default CollectionPointCard;
