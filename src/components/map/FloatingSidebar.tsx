
import React from "react";
import SearchAndFilters from "./SearchAndFilters";
import CompactCollectionPointCard from "./CompactCollectionPointCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CollectionPoint } from "@/types/collection-point";

interface FloatingSidebarProps {
  searchTerm: string;
  setSearchTerm: (v: string) => void;
  activeFilter: string[];
  allMaterials: string[];
  toggleFilter: (mat: string) => void;
  clearFilters: () => void;
  filteredPoints: CollectionPoint[];
  selectedPoint: CollectionPoint | null;
  onPointSelect: (point: CollectionPoint) => void;
}

const FloatingSidebar: React.FC<FloatingSidebarProps> = ({
  searchTerm,
  setSearchTerm,
  activeFilter,
  allMaterials,
  toggleFilter,
  clearFilters,
  filteredPoints,
  selectedPoint,
  onPointSelect,
}) => (
  <div className="w-[420px] h-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-l border-gray-200 dark:border-gray-700 flex flex-col">
    {/* Header fixo com busca e filtros */}
    <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-gray-900/95">
      <SearchAndFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        activeFilter={activeFilter}
        allMaterials={allMaterials}
        toggleFilter={toggleFilter}
        clearFilters={clearFilters}
        showSearchIcon
        compact
      />
    </div>
    
    {/* Lista de pontos com scroll */}
    <div className="flex-1 min-h-0">
      <ScrollArea className="h-full w-full">
        <div className="p-4 space-y-3">
          {filteredPoints.length === 0 && (
            <div className="text-center text-gray-500 py-12">
              <p>Nenhum ponto encontrado.</p>
            </div>
          )}
          {filteredPoints.map((point) => (
            <CompactCollectionPointCard
              key={point.id}
              point={point}
              isSelected={selectedPoint?.id === point.id}
              onClick={() => onPointSelect(point)}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  </div>
);

export default FloatingSidebar;
