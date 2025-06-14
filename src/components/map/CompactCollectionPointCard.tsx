
import React from "react";
import type { CollectionPoint } from "@/types/collection-point";

const googleLogo = "/lovable-uploads/googlemapslogo.png";
const wazeLogo = "/lovable-uploads/wazelogo.png";

interface Props {
  point: CollectionPoint;
  selected?: boolean;
  onClick?: () => void;
}

const materialColors: Record<string, string> = {
  Papel: "bg-blue-100 text-blue-800",
  Plástico: "bg-yellow-100 text-yellow-900",
  Metal: "bg-gray-200 text-gray-800",
  Vidro: "bg-green-100 text-green-800",
  Eletrônicos: "bg-purple-100 text-purple-800",
};

const CompactCollectionPointCard: React.FC<Props> = ({ point, selected, onClick }) => {
  return (
    <div
      className={`rounded-lg px-3 py-2 mb-1 border hover:border-recicla-primary dark:hover:border-recicla-secondary shadow-sm bg-white dark:bg-gray-900 cursor-pointer transition flex flex-col gap-1 ${
        selected
          ? "border-recicla-primary bg-recicla-primary/10 dark:border-recicla-secondary dark:bg-recicla-secondary/10"
          : "border-gray-200 dark:border-gray-800"
      }`}
      onClick={onClick}
    >
      <div className="flex items-center gap-2">
        <span className="font-semibold text-recicla-primary dark:text-recicla-secondary flex-1">
          {point.name}
        </span>
      </div>
      <div className="text-xs text-gray-600 dark:text-gray-300">{point.address}</div>
      <div className="flex flex-wrap gap-1 mt-1">
        {point.materials.map((mat) => (
          <span
            key={mat}
            className={`rounded-full px-2 py-0.5 text-xs font-medium border ${materialColors[mat] || "bg-gray-100 text-gray-600"}`}
          >
            {mat}
          </span>
        ))}
      </div>
      <div className="flex gap-2 mt-1">
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            point.address
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          title="Abrir no Google Maps"
        >
          <img src={googleLogo} alt="Google Maps" className="h-6 w-6" />
        </a>
        <a
          href={`https://waze.com/ul?q=${encodeURIComponent(point.address)}`}
          target="_blank"
          rel="noopener noreferrer"
          title="Abrir no Waze"
        >
          <img src={wazeLogo} alt="Waze" className="h-6 w-6" />
        </a>
      </div>
    </div>
  );
};

export default CompactCollectionPointCard;
