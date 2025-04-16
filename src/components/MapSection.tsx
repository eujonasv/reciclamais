
import React, { useState } from 'react';
import { MapIcon } from 'lucide-react';
import RecycleLogo from './RecycleLogo';
import SearchAndFilters from './map/SearchAndFilters';
import CollectionPointCard from './map/CollectionPointCard';
import { CollectionPoint } from '@/types/collection-point';
import { collectionPoints } from '@/data/collection-points';

const MapSection = () => {
  const [selectedPoint, setSelectedPoint] = useState<CollectionPoint | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState<string[]>([]);

  // Filter points by search term or material type
  const filteredPoints = collectionPoints.filter(point => {
    const matchesSearch = point.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      point.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      point.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = activeFilter.length === 0 || 
      point.materials.some(material => activeFilter.includes(material));
    
    return matchesSearch && matchesFilter;
  });

  // Get all unique materials for filter buttons
  const allMaterials = Array.from(
    new Set(collectionPoints.flatMap(point => point.materials))
  ).sort();

  // Toggle material filter
  const toggleFilter = (material: string) => {
    if (activeFilter.includes(material)) {
      setActiveFilter(activeFilter.filter(m => m !== material));
    } else {
      setActiveFilter([...activeFilter, material]);
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setActiveFilter([]);
    setSearchTerm("");
  };

  const handleToggleSelect = (point: CollectionPoint) => {
    setSelectedPoint(selectedPoint?.id === point.id ? null : point);
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPoints.map((point) => (
            <CollectionPointCard
              key={point.id}
              point={point}
              selectedPoint={selectedPoint}
              onToggleSelect={handleToggleSelect}
            />
          ))}
        </div>

        {filteredPoints.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12">
            <MapIcon size={48} className="text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Nenhum ponto encontrado</h3>
            <p className="text-gray-600 dark:text-gray-400 text-center max-w-md">
              Não encontramos pontos de coleta com os filtros selecionados. Tente outros critérios de busca.
            </p>
          </div>
        )}

        <div className="text-center mt-8 text-sm text-gray-600 dark:text-gray-400">
          Exibindo {filteredPoints.length} de {collectionPoints.length} pontos de coleta
        </div>
      </div>
    </section>
  );
};

export default MapSection;
