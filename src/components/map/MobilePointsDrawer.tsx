
import React from "react";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import SearchAndFilters from "./SearchAndFilters";
import CompactCollectionPointCard from "./CompactCollectionPointCard";
import { CollectionPoint } from "@/types/collection-point";
import { Button } from "@/components/ui/button";
import { MapPin, Filter } from "lucide-react";

interface MobilePointsDrawerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
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

const MobilePointsDrawer: React.FC<MobilePointsDrawerProps> = ({
  isOpen,
  onOpenChange,
  searchTerm,
  setSearchTerm,
  activeFilter,
  allMaterials,
  toggleFilter,
  clearFilters,
  filteredPoints,
  selectedPoint,
  onPointSelect,
}) => {
  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent className="h-[90vh] flex flex-col bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-t border-gray-200/50 dark:border-gray-700/50 shadow-2xl">
        <DrawerHeader className="text-left flex-shrink-0 pb-4 sm:pb-6 border-b border-gray-200/50 dark:border-gray-700/50">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-recicla-primary/10 dark:bg-recicla-secondary/10 rounded-full">
              <MapPin className="h-5 w-5 text-recicla-primary dark:text-recicla-secondary" />
            </div>
            <DrawerTitle className="text-lg sm:text-xl font-bold">Pontos de Coleta</DrawerTitle>
          </div>
          <DrawerDescription className="text-sm sm:text-base">
            {filteredPoints.length > 0
              ? `Encontramos ${filteredPoints.length} ponto${filteredPoints.length > 1 ? 's' : ''} de coleta.`
              : 'Nenhum ponto encontrado com os filtros atuais.'
            }
          </DrawerDescription>
        </DrawerHeader>
        
        {/* Área de filtros */}
        <div className="px-4 sm:px-6 flex-shrink-0 pb-4 bg-gray-50/50 dark:bg-gray-800/50 border-b border-gray-200/50 dark:border-gray-700/50">
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
            <div className="p-4 sm:p-6 space-y-3 sm:space-y-4 pb-8">
              {filteredPoints.length === 0 ? (
                <div className="text-center text-gray-500 py-12 sm:py-16 px-4">
                  <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-full w-fit mx-auto mb-4">
                    <MapPin className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="font-semibold text-base sm:text-lg mb-2">Nenhum ponto encontrado</p>
                  <p className="text-sm sm:text-base text-gray-400 dark:text-gray-500 max-w-sm mx-auto">
                    Tente alterar os filtros ou o termo de busca para encontrar pontos de coleta próximos.
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

        <DrawerFooter className="pt-4 flex-shrink-0 border-t border-gray-200/50 dark:border-gray-700/50 bg-gray-50/30 dark:bg-gray-800/30">
          <DrawerClose asChild>
            <Button 
              variant="outline" 
              className="touch-manipulation h-11 sm:h-12 font-medium border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
            >
              Fechar e Ver Mapa
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default MobilePointsDrawer;
