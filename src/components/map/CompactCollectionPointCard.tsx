
import React from "react";
import { CollectionPoint, materialColors } from "@/types/collection-point";

interface CompactCollectionPointCardProps {
  point: CollectionPoint;
  isSelected: boolean;
  onClick: () => void;
}

const getGoogleMapsUrl = (address: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

const getWazeUrl = (address: string) =>
  `https://waze.com/ul?q=${encodeURIComponent(address)}`;

const CompactCollectionPointCard: React.FC<CompactCollectionPointCardProps> = ({
  point,
  isSelected,
  onClick,
}) => (
  <div
    className={`p-3 rounded-lg mb-3 transition-all cursor-pointer border bg-white/85 dark:bg-gray-900/80 ${
      isSelected
        ? "border-recicla-primary shadow-lg dark:border-recicla-secondary"
        : "border-gray-200 hover:shadow dark:border-gray-700"
    }`}
    onClick={onClick}
    tabIndex={0}
    aria-selected={isSelected}
  >
    <div className="flex items-center justify-between mb-1">
      <span className="text-sm font-semibold text-recicla-primary dark:text-recicla-secondary">{point.name}</span>
      <div className="flex gap-2">
        <a
          href={getGoogleMapsUrl(point.address)}
          target="_blank"
          rel="noopener noreferrer"
          title="Abrir no Google Maps"
        >
          <img src="/lovable-uploads/googlemapslogo.png" alt="Google Maps" className="h-5 w-5" />
        </a>
        <a
          href={getWazeUrl(point.address)}
          target="_blank"
          rel="noopener noreferrer"
          title="Abrir no Waze"
        >
          <img src="/lovable-uploads/wazelogo.png" alt="Waze" className="h-5 w-5" />
        </a>
      </div>
    </div>
    <div className="text-xs text-gray-600 dark:text-gray-300">{point.address}</div>
    <div className="flex flex-wrap gap-1 mt-1">
      {point.materials.map((mat) => (
        <span
          key={mat}
          className={`px-2 py-0.5 rounded text-xs font-medium ${materialColors[mat] ?? "bg-gray-200 text-gray-800"}`}
        >
          {mat}
        </span>
      ))}
    </div>
    {point.phone && (
      <div className="mt-1 text-xs text-gray-500">
        Tel: <a href={`tel:${point.phone}`} className="hover:underline">{point.phone}</a>
      </div>
    )}
  </div>
);

export default CompactCollectionPointCard;
