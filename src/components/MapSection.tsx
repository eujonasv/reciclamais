
import React from 'react';
import { MapIcon, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import RecycleLogo from './RecycleLogo';
import SearchAndFilters from './map/SearchAndFilters';
import CollectionPointCard from './map/CollectionPointCard';
import MapboxCollectionMap from './map/MapboxCollectionMap';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';
import { ArrowDown, ArrowUp, Locate } from 'lucide-react';
import { useMapSection } from '@/hooks/useMapSection';

const MapSection = () => {
  const {
    mapRef,
    isLoading,
    filteredPoints,
    paginatedPoints,
    allMaterials,
    selectedPoint,
    handlePointSelect,
    searchTerm,
    setSearchTerm,
    activeFilter,
    toggleFilter,
    clearFilters,
    showMapMobile,
    setShowMapMobile,
    isLocating,
    getUserLocation,
    totalPages,
    currentPage,
    handlePageChange,
    getPageNumbers,
  } = useMapSection();

  return (
    <section id="mapa" className="section-padding bg-white dark:bg-gray-900">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <RecycleLogo size="md" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
            Mapa de <span className="text-recicla-primary dark:text-recicla-secondary">Pontos de Coleta</span>
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-700 dark:text-gray-300 mb-8">
            Encontre os pontos de coleta mais próximos de você. Filtre por tipo de material e descubra o local ideal para seu descarte.
          </p>
          
          <SearchAndFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            activeFilter={activeFilter}
            allMaterials={allMaterials}
            toggleFilter={toggleFilter}
            clearFilters={clearFilters}
          />

          <div className="mt-6">
            <Link to="/mapa">
              <Button 
                variant="outline" 
                className="border-recicla-primary text-recicla-primary hover:bg-recicla-primary hover:text-white dark:border-recicla-secondary dark:text-recicla-secondary dark:hover:bg-recicla-secondary dark:hover:text-gray-900 transition-all duration-300"
              >
                <ExternalLink size={18} className="mr-2" />
                Ver Mapa Completo
              </Button>
            </Link>
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-recicla-primary mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Carregando pontos de coleta...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedPoints.map((point) => (
                <CollectionPointCard
                  key={point.id}
                  point={point}
                  isSelected={selectedPoint?.id === point.id}
                  onClick={() => handlePointSelect(point)}
                />
              ))}
            </div>

            {filteredPoints.length > 0 && (
              <>
                <button
                  type="button"
                  onClick={() => setShowMapMobile(s => !s)}
                  className={`block md:hidden mt-6 mx-auto rounded-full px-6 py-2 font-semibold text-recicla-primary dark:text-recicla-secondary bg-white/80 dark:bg-gray-800/80 shadow transition-all duration-300 hover:bg-recicla-primary/10 focus:outline-none flex items-center gap-2 border border-recicla-primary/30 dark:border-recicla-secondary/30 backdrop-blur-sm`}
                  aria-expanded={showMapMobile}
                  aria-controls="mobile-collection-map"
                >
                  {showMapMobile ? (
                    <>
                      <ArrowUp className="transition-transform duration-200" />
                      Esconder Mapa
                    </>
                  ) : (
                    <>
                      <ArrowDown className="transition-transform duration-200" />
                      Ver Mapa
                    </>
                  )}
                </button>

                <div
                  id="mobile-collection-map"
                  className={`relative overflow-hidden rounded-xl shadow-lg mt-3 mb-2 transition-all duration-300 ease-in-out glass-morphism border border-gray-200 dark:border-gray-700 backdrop-blur
                    ${showMapMobile ? "h-[22rem] opacity-100 scale-100 pointer-events-auto visible" : "h-0 opacity-0 scale-95 pointer-events-none invisible"}
                    md:h-96 md:opacity-100 md:scale-100 md:pointer-events-auto md:visible md:mt-8 md:block
                  `}
                >
                  <MapboxCollectionMap
                    collectionPoints={filteredPoints}
                    selectedPoint={selectedPoint}
                    onMarkerClick={handlePointSelect}
                    ref={mapRef}
                    compactPopup
                  />
                  
                  <div className="absolute bottom-4 left-4 z-[1000]">
                    <Button
                      onClick={getUserLocation}
                      disabled={isLocating}
                      className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                      size="sm"
                    >
                      <Locate className="h-4 w-4 mr-2" />
                      {isLocating ? "Localizando..." : "Minha Localização"}
                    </Button>
                  </div>
                </div>
              </>
            )}

            {filteredPoints.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12">
                <MapIcon size={48} className="text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Nenhum ponto encontrado</h3>
                <p className="text-gray-600 dark:text-gray-400 text-center max-w-md">
                  Não encontramos pontos de coleta com os filtros selecionados. Tente outros critérios de busca.
                </p>
              </div>
            )}

            {filteredPoints.length > 0 && totalPages > 1 && (
              <div className="mt-8">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                        className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                      />
                    </PaginationItem>
                    
                    {getPageNumbers().map((page, index) => (
                      <PaginationItem key={index}>
                        {page === 'ellipsis' ? (
                          <span className="flex h-9 w-9 items-center justify-center">...</span>
                        ) : (
                          <PaginationLink 
                            isActive={page === currentPage}
                            onClick={() => handlePageChange(page as number)}
                            className="cursor-pointer"
                          >
                            {page}
                          </PaginationLink>
                        )}
                      </PaginationItem>
                    ))}
                    
                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                        className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}

            <div className="text-center mt-8 text-sm text-gray-600 dark:text-gray-400">
              Exibindo {paginatedPoints.length} de {filteredPoints.length} pontos de coleta
              {totalPages > 1 && ` • Página ${currentPage} de ${totalPages}`}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default MapSection;
