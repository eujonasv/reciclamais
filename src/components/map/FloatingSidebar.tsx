
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
  <aside className="fixed top-0 right-0 h-full max-h-screen w-full sm:w-[360px] md:w-[420px] lg:w-[480px] bg-white/90 dark:bg-gray-900/90 shadow-xl border-l border-gray-100 dark:border-gray-800 z-40 flex flex-col pt-20 px-3">
    <div>
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
    <div className="flex-1 min-h-0">
      <ScrollArea className="h-full w-full pr-2 mt-2">
        {filteredPoints.length === 0 && (
          <div className="text-center text-gray-500 my-12">Nenhum ponto encontrado.</div>
        )}
        {filteredPoints.map((point) => (
          <CompactCollectionPointCard
            key={point.id}
            point={point}
            isSelected={selectedPoint?.id === point.id}
            onClick={() => onPointSelect(point)}
          />
        ))}
      </ScrollArea>
    </div>
  </aside>
);

export default FloatingSidebar;
