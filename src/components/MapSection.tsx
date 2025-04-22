import React, { useState, useEffect } from 'react';
import { MapIcon } from 'lucide-react';
import RecycleLogo from './RecycleLogo';
import SearchAndFilters from './map/SearchAndFilters';
import CollectionPointCard from './map/CollectionPointCard';
import CollectionPointsMap from "./map/CollectionPointsMap";
import { CollectionPoint } from '@/types/collection-point';
import { supabase } from '@/integrations/supabase/client';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';
import { useToast } from '@/components/ui/use-toast';

const POINTS_PER_PAGE = 3;

const MapSection = () => {
  const [collectionPoints, setCollectionPoints] = useState<CollectionPoint[]>([]);
  const [selectedPoint, setSelectedPoint] = useState<CollectionPoint | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchPoints = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase.from("collection_points").select("*");
        if (error) {
          console.error("Error fetching collection points:", error);
          toast({
            title: "Erro ao carregar pontos de coleta",
            description: error.message,
            variant: "destructive",
          });
          return;
        }

        const transformedData: CollectionPoint[] = data.map((point) => ({
          ...point,
          materials: point.materials?.split(',').map((m: string) => m.trim()) || [],
          id: point.id.toString()
        }));

        setCollectionPoints(transformedData);
      } catch (error) {
        console.error("Exception fetching collection points:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPoints();

    const channel = supabase
      .channel('public:collection_points')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'collection_points' 
      }, () => {
        fetchPoints();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [toast]);

  const filteredPoints = collectionPoints.filter(point => {
    const matchesSearch = point.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      point.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      point.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = activeFilter.length === 0 || 
      point.materials.some(material => activeFilter.includes(material));
    
    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.ceil(filteredPoints.length / POINTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POINTS_PER_PAGE;
  const paginatedPoints = filteredPoints.slice(startIndex, startIndex + POINTS_PER_PAGE);

  const allMaterials = Array.from(
    new Set(collectionPoints.flatMap(point => point.materials))
  ).sort();

  const toggleFilter = (material: string) => {
    if (activeFilter.includes(material)) {
      setActiveFilter(activeFilter.filter(m => m !== material));
    } else {
      setActiveFilter([...activeFilter, material]);
    }
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setActiveFilter([]);
    setSearchTerm("");
    setCurrentPage(1);
  };

  const handleToggleSelect = (point: CollectionPoint) => {
    setSelectedPoint(selectedPoint?.id === point.id ? null : point);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({
      top: document.getElementById('mapa')?.offsetTop,
      behavior: 'smooth'
    });
  };

  const getPageNumbers = () => {
    let pages: (number | 'ellipsis')[] = [];
    
    if (totalPages <= 5) {
      pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      pages.push(1);
      
      if (currentPage > 3) {
        pages.push('ellipsis');
      }
      
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(currentPage + 1, totalPages - 1);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (currentPage < totalPages - 2) {
        pages.push('ellipsis');
      }
      
      pages.push(totalPages);
    }
    
    return pages;
  };

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
                <div
                  key={point.id}
                  onClick={() => handleToggleSelect(point)}
                  className={
                    "cursor-pointer transition duration-150" +
                    (selectedPoint?.id === point.id ? " ring-2 ring-recicla-primary" : "")
                  }
                >
                  <CollectionPointCard
                    point={point}
                  />
                </div>
              ))}
            </div>

            <CollectionPointsMap
              points={paginatedPoints}
              selectedPoint={selectedPoint}
              onSelectPoint={handleToggleSelect}
            />

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
                            onClick={() => handlePageChange(page)}
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
