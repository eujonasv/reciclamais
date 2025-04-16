
import React, { useState } from 'react';
import { MapPin, Phone, Info, Link as LinkIcon, MapIcon } from 'lucide-react';
import RecycleLogo from './RecycleLogo';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

// Sample data for collection points
const collectionPoints = [
  {
    id: 1,
    name: "EcoPonto Centro",
    description: "Centro de coleta de materiais recicláveis e eletrônicos.",
    latitude: -23.5505,
    longitude: -46.6333,
    address: "Av. Paulista, 1000, São Paulo - SP",
    phone: "(11) 3333-4444",
    materials: ["Papel", "Plástico", "Metal", "Vidro", "Eletrônicos"]
  },
  {
    id: 2,
    name: "Recicla Já",
    description: "Coleta de papel, plástico e metal.",
    latitude: -23.5705,
    longitude: -46.6500,
    address: "Rua Augusta, 500, São Paulo - SP",
    phone: "(11) 3333-5555",
    materials: ["Papel", "Plástico", "Metal"]
  },
  {
    id: 3,
    name: "Verde Cooperativa",
    description: "Cooperativa de catadores com coleta de todos os tipos de materiais.",
    latitude: -23.5605,
    longitude: -46.6100,
    address: "Rua Vergueiro, 2000, São Paulo - SP",
    phone: "(11) 3333-6666",
    materials: ["Papel", "Plástico", "Metal", "Vidro", "Orgânicos"]
  },
  {
    id: 4,
    name: "Eco Recicláveis",
    description: "Centro especializado em resíduos eletrônicos e baterias.",
    latitude: -23.5805,
    longitude: -46.6200,
    address: "Av. Brigadeiro Faria Lima, 1500, São Paulo - SP",
    phone: "(11) 3333-7777",
    materials: ["Eletrônicos", "Baterias", "Lâmpadas"]
  },
  {
    id: 5,
    name: "ReciclaMais Zona Norte",
    description: "Centro de coleta completo para moradores da Zona Norte.",
    latitude: -23.5305,
    longitude: -46.6400,
    address: "Av. Eng. Caetano Álvares, 2500, São Paulo - SP",
    phone: "(11) 3333-8888",
    materials: ["Papel", "Plástico", "Metal", "Vidro", "Óleo"]
  }
];

// Material type colors for badges
const materialColors: Record<string, string> = {
  "Papel": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  "Plástico": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  "Metal": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  "Vidro": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  "Eletrônicos": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  "Orgânicos": "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300",
  "Baterias": "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
  "Lâmpadas": "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300",
  "Óleo": "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
};

interface CollectionPoint {
  id: number;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  address: string;
  phone: string;
  website: string;
  materials: string[];
}

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
          
          {/* Search and filters */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-grow">
                <Input 
                  type="text"
                  placeholder="Buscar por nome, endereço..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <Button 
                onClick={clearFilters} 
                variant="outline"
                className="border-recicla-primary text-recicla-primary hover:bg-recicla-primary/10 dark:border-recicla-secondary dark:text-recicla-secondary dark:hover:bg-recicla-secondary/10"
              >
                Limpar Filtros
              </Button>
            </div>
            
            {/* Material filters */}
            <div className="flex flex-wrap gap-2 justify-center">
              {allMaterials.map((material) => (
                <Badge 
                  key={material}
                  className={`cursor-pointer text-sm px-3 py-1 ${
                    activeFilter.includes(material) 
                      ? 'bg-recicla-primary text-white dark:bg-recicla-secondary' 
                      : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                  }`}
                  onClick={() => toggleFilter(material)}
                >
                  {material}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* List of collection points with cards instead of map */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPoints.map((point) => (
            <div 
              key={point.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100 dark:border-gray-700"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <MapPin className="h-6 w-6 text-recicla-primary dark:text-recicla-secondary mr-2" />
                    <h3 className="text-lg font-bold">{point.name}</h3>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setSelectedPoint(selectedPoint?.id === point.id ? null : point)}
                    className="text-gray-500 hover:text-recicla-primary dark:hover:text-recicla-secondary"
                  >
                    <Info size={18} />
                  </Button>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                  {point.description}
                </p>
                
                <div className="flex items-start mb-3">
                  <MapPin size={16} className="mr-2 text-gray-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {point.address}
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-1 mt-3">
                  {point.materials.slice(0, 3).map((material) => (
                    <span 
                      key={material} 
                      className={`inline-block text-xs px-2 py-0.5 rounded-full ${materialColors[material]}`}
                    >
                      {material}
                    </span>
                  ))}
                  {point.materials.length > 3 && (
                    <span className="inline-block text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                      +{point.materials.length - 3}
                    </span>
                  )}
                </div>
                
                {selectedPoint?.id === point.id && (
                  <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex items-center mb-2">
                      <Phone size={16} className="mr-2 text-gray-500" />
                      <p className="text-sm">{point.phone}</p>
                    </div>
                    
                    {point.website && (
                      <div className="flex items-center mb-2">
                        <LinkIcon size={16} className="mr-2 text-gray-500" />
                        <a 
                          href={point.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          Website
                        </a>
                      </div>
                    )}
                    
                    <div>
                      <p className="text-sm font-medium mb-1">Todos materiais aceitos:</p>
                      <div className="flex flex-wrap gap-1">
                        {point.materials.map((material) => (
                          <span 
                            key={material} 
                            className={`inline-block text-xs px-2 py-0.5 rounded-full ${materialColors[material]}`}
                          >
                            {material}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty state when no results */}
        {filteredPoints.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12">
            <MapIcon size={48} className="text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Nenhum ponto encontrado</h3>
            <p className="text-gray-600 dark:text-gray-400 text-center max-w-md">
              Não encontramos pontos de coleta com os filtros selecionados. Tente outros critérios de busca.
            </p>
          </div>
        )}

        {/* Display number of visible points */}
        <div className="text-center mt-8 text-sm text-gray-600 dark:text-gray-400">
          Exibindo {filteredPoints.length} de {collectionPoints.length} pontos de coleta
        </div>
      </div>
    </section>
  );
};

export default MapSection;
