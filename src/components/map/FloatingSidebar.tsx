
import React from "react";
import SearchAndFilters from "./SearchAndFilters";
import CompactCollectionPointCard from "./CompactCollectionPointCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CollectionPoint } from "@/types/collection-point";
import { Button } from "@/components/ui/button";
import { X, MapPin, Filter } from "lucide-react";

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
      bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl
      transition-all duration-500 ease-out
      w-[380px] sm:w-[420px] max-w-[90vw] 
      border-r border-gray-200/50 dark:border-gray-700/50 
      shadow-2xl
      ${isOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}
    `}
    role="dialog"
    aria-hidden={!isOpen}
  >
    {/* Header melhorado */}
    <div className="p-4 sm:p-6 border-b border-gray-200/50 dark:border-gray-700/50 flex items-center justify-between sticky top-0 bg-inherit z-10">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-recicla-primary/10 dark:bg-recicla-secondary/10 rounded-full">
          <MapPin className="h-5 w-5 text-recicla-primary dark:text-recicla-secondary" />
        </div>
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
            Pontos de Coleta
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {filteredPoints.length} ponto{filteredPoints.length !== 1 ? 's' : ''} encontrado{filteredPoints.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={onClose} 
        aria-label="Fechar lista de pontos" 
        className="touch-manipulation hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all duration-200 hover:scale-105"
      >
        <X className="h-5 w-5 sm:h-6 sm:w-6" />
      </Button>
    </div>

    {/* Área de filtros melhorada */}
    <div className="p-4 sm:p-6 border-b border-gray-200/50 dark:border-gray-700/50 bg-gray-50/50 dark:bg-gray-800/50">
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
      
      {/* Indicador de filtros ativos */}
      {activeFilter.length > 0 && (
        <div className="mt-3 flex items-center gap-2 text-xs animate-fade-in">
          <Filter className="h-3 w-3 text-recicla-primary dark:text-recicla-secondary" />
          <span className="text-gray-600 dark:text-gray-400 font-medium">
            {activeFilter.length} filtro{activeFilter.length !== 1 ? 's' : ''} ativo{activeFilter.length !== 1 ? 's' : ''}
          </span>
        </div>
      )}
    </div>

    {/* Lista de pontos */}
    <div className="flex-1 min-h-0">
      <ScrollArea className="h-full w-full">
        <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
          {filteredPoints.length === 0 ? (
            <div className="text-center text-gray-500 py-12 sm:py-16 px-4">
              <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-full w-fit mx-auto mb-4">
                <MapPin className="h-8 w-8 text-gray-400" />
              </div>
              <p className="font-semibold text-base sm:text-lg mb-2">Nenhum ponto encontrado</p>
              <p className="text-sm sm:text-base text-gray-400 dark:text-gray-500">
                Tente alterar os filtros ou o termo de busca para encontrar pontos de coleta.
              </p>
            </div>
          ) : (
            filteredPoints.map((point) => (
              <CompactCollectionPointCard
                key={point.id}
                point={point}
                isSelected={selectedPoint?.id === point.id}
                onClick={() => onPointSelect(point)}
              />
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  </div>
);

export default FloatingSidebar;
