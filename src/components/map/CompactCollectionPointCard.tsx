
import React from "react";
import { CollectionPoint, materialColors } from "@/types/collection-point";
import { Phone, MapPin, Clock } from "lucide-react";
import { formatOpeningHours } from '@/utils/opening-hours';

interface CompactCollectionPointCardProps {
  point: CollectionPoint;
  isSelected: boolean;
  onClick: () => void;
}

const getGoogleMapsUrl = (address: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
const getWazeUrl = (address: string) => `https://waze.com/ul?q=${encodeURIComponent(address)}`;

const CompactCollectionPointCard: React.FC<CompactCollectionPointCardProps> = ({
  point,
  isSelected,
  onClick
}) => (
  <div 
    className={`p-3 sm:p-4 rounded-xl mb-2 transition-all duration-300 cursor-pointer border-2 bg-white/60 dark:bg-gray-800/60 touch-manipulation
      ${isSelected ? "border-recicla-primary shadow-lg dark:border-recicla-secondary scale-105" : "border-transparent hover:border-recicla-primary/50 dark:hover:border-recicla-secondary/50 hover:shadow-md"}`} 
    onClick={onClick} 
    tabIndex={0} 
    aria-selected={isSelected}
  >
    <div className="flex items-start justify-between mb-2">
      <h3 className="font-bold text-gray-900 dark:text-white flex-1 pr-2 text-sm sm:text-base leading-tight">{point.name}</h3>
      <div className="flex gap-2 flex-shrink-0">
        <a 
          href={getGoogleMapsUrl(point.address)} 
          target="_blank" 
          rel="noopener noreferrer" 
          title="Abrir no Google Maps" 
          onClick={e => e.stopPropagation()} 
          className="transition-transform hover:scale-110 touch-manipulation"
        >
          <div className="bg-white rounded-full p-1 flex items-center justify-center shadow-sm min-w-[28px] min-h-[28px]">
            <img src="/lovable-uploads/googlemapslogo.png" alt="Google Maps" className="h-4 w-4 sm:h-5 sm:w-6" />
          </div>
        </a>
        <a 
          href={getWazeUrl(point.address)} 
          target="_blank" 
          rel="noopener noreferrer" 
          title="Abrir no Waze" 
          onClick={e => e.stopPropagation()} 
          className="transition-transform hover:scale-110 touch-manipulation"
        >
          <div className="bg-white rounded-full p-1 flex items-center justify-center shadow-sm min-w-[28px] min-h-[28px]">
            <img src="/lovable-uploads/wazelogo.png" alt="Waze" className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
        </a>
      </div>
    </div>
    
    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-3">
      <MapPin size={12} className="flex-shrink-0 sm:w-3.5 sm:h-3.5" />
      <span className="leading-tight">{point.address}</span>
    </div>

    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-3">
      <Clock size={12} className="flex-shrink-0 sm:w-3.5 sm:h-3.5" />
      <span className="leading-tight">{formatOpeningHours(point.openingHours)}</span>
    </div>

    <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-3">
      {point.materials.map(mat => (
        <span 
          key={mat} 
          className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-xs font-semibold ${materialColors[mat] ?? "bg-gray-200 text-gray-800"}`}
        >
          {mat}
        </span>
      ))}
    </div>
    
    {point.phone && (
      <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
        <Phone size={12} className="sm:w-3.5 sm:h-3.5" />
        <a 
          href={`tel:${point.phone}`} 
          onClick={e => e.stopPropagation()} 
          className="hover:underline touch-manipulation py-1"
        >
          {point.phone}
        </a>
      </div>
    )}
  </div>
);

export default CompactCollectionPointCard;
