
import React from "react";
import SearchAndFilters from "./SearchAndFilters";
import CompactCollectionPointCard from "./CompactCollectionPointCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CollectionPoint } from "@/types/collection-point";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface FloatingSidebarProps {
  isOpen: boolean;
  onClose: () => void;
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
  isOpen,
  onClose,
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
  <div
    className={`
      absolute top-0 left-0 h-full
      flex flex-col z-30
      bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg
      transition-transform duration-300 ease-in-out
      w-[360px] sm:w-[400px] max-w-[90vw] border-r border-black/10 dark:border-white/10 shadow-2xl
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
    `}
    role="dialog"
    aria-hidden={!isOpen}
  >
    <div className="p-3 sm:p-4 border-b border-black/10 dark:border-white/10 flex items-center justify-between sticky top-0 bg-inherit z-10">
      <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-100">Pontos de Coleta</h2>
      <Button variant="ghost" size="icon" onClick={onClose} aria-label="Fechar lista de pontos" className="touch-manipulation">
        <X className="h-5 w-5 sm:h-6 sm:w-6" />
      </Button>
    </div>

    <div className="p-3 sm:p-4 border-b border-black/10 dark:border-white/10">
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
      <ScrollArea className="h-full w-full">
        <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
          {filteredPoints.length === 0 ? (
            <div className="text-center text-gray-500 py-8 sm:py-12 px-4">
              <p className="font-semibold text-sm sm:text-base">Nenhum ponto encontrado.</p>
              <p className="text-xs sm:text-sm mt-1">Tente alterar os filtros ou o termo de busca.</p>
            </div>
          ) : filteredPoints.map((point) => (
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
