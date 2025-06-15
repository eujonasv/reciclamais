
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
  isMobile: boolean;
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
  isMobile,
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
      flex flex-col
      bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm 
      transition-transform duration-300 ease-in-out
      ${
        isMobile
          ? `fixed top-16 inset-x-0 bottom-0 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} z-[1001]`
          : `relative w-[420px] border-l border-gray-200 dark:border-gray-700 h-full ${isOpen ? 'flex' : 'hidden'}`
      }
    `}
    role="dialog"
    aria-modal={isMobile && isOpen}
    aria-hidden={!isOpen}
  >
    {/* Header com título e botão de fechar (mobile) */}
    <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between sticky top-0 bg-white/95 dark:bg-gray-900/95 z-10">
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Pontos de Coleta</h2>
      {isMobile && (
        <Button variant="ghost" size="icon" onClick={onClose} aria-label="Fechar lista de pontos">
          <X className="h-6 w-6" />
        </Button>
      )}
    </div>

    {/* Header fixo com busca e filtros */}
    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
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
          {filteredPoints.length === 0 ? (
            <div className="text-center text-gray-500 py-12 px-4">
              <p className="font-semibold">Nenhum ponto encontrado.</p>
              <p className="text-sm mt-1">Tente alterar os filtros ou o termo de busca.</p>
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
