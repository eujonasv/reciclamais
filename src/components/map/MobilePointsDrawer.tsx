
import React from "react";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import SearchAndFilters from "./SearchAndFilters";
import CompactCollectionPointCard from "./CompactCollectionPointCard";
import { CollectionPoint } from "@/types/collection-point";
import { Button } from "@/components/ui/button";

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
      <DrawerContent className="h-[85vh] sm:h-[90vh] flex flex-col bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-t border-black/10 dark:border-white/10">
        <DrawerHeader className="text-left flex-shrink-0 pb-2 sm:pb-4">
          <DrawerTitle className="text-lg sm:text-xl">Pontos de Coleta</DrawerTitle>
          <DrawerDescription className="text-sm sm:text-base">
            {filteredPoints.length > 0
              ? `Encontramos ${filteredPoints.length} ponto${filteredPoints.length > 1 ? 's' : ''}.`
              : 'Nenhum ponto encontrado.'
            }
          </DrawerDescription>
        </DrawerHeader>
        
        <div className="px-4 flex-shrink-0 pb-2">
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
            <div className="p-4 space-y-2 sm:space-y-3 pb-6">
              {filteredPoints.length === 0 ? (
                <div className="text-center text-gray-500 py-8 sm:py-12 px-4">
                  <p className="font-semibold text-sm sm:text-base">Nenhum ponto encontrado.</p>
                  <p className="text-xs sm:text-sm mt-1">Tente alterar os filtros ou o termo de busca.</p>
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

        <DrawerFooter className="pt-2 flex-shrink-0 border-t border-black/10 dark:border-white/10">
          <DrawerClose asChild>
            <Button variant="outline" className="touch-manipulation h-11 sm:h-10">Fechar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default MobilePointsDrawer;
