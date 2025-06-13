
import React from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { materialColors } from '@/types/collection-point';
import type { CollectionPoint } from '@/types/collection-point';

interface FloatingSidebarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  activeFilter: string[];
  allMaterials: string[];
  toggleFilter: (material: string) => void;
  clearFilters: () => void;
  filteredPoints: CollectionPoint[];
  selectedPoint: CollectionPoint | null;
  onPointSelect: (point: CollectionPoint) => void;
  onClose?: () => void;
}

const FloatingSidebar = ({
  searchTerm,
  setSearchTerm,
  activeFilter,
  allMaterials,
  toggleFilter,
  clearFilters,
  filteredPoints,
  selectedPoint,
  onPointSelect,
  onClose
}: FloatingSidebarProps) => {
  return (
    <div className="fixed top-20 right-4 w-80 h-[calc(100vh-6rem)] bg-white/95 backdrop-blur-sm shadow-lg rounded-lg border border-gray-200 z-40 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Pontos de Coleta</h3>
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X size={16} />
            </Button>
          )}
        </div>
        
        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <Input
            type="text"
            placeholder="Buscar pontos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filters */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Materiais</span>
            <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs">
              Limpar
            </Button>
          </div>
          
          <div className="space-y-2">
            {allMaterials.map((material) => (
              <div key={material} className="flex items-center space-x-2">
                <Checkbox
                  id={material}
                  checked={activeFilter.includes(material)}
                  onCheckedChange={() => toggleFilter(material)}
                />
                <label
                  htmlFor={material}
                  className="text-sm text-gray-700 cursor-pointer flex-1"
                >
                  {material}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Points List */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-3">
          {filteredPoints.map((point) => (
            <div
              key={point.id}
              onClick={() => onPointSelect(point)}
              className={`p-3 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                selectedPoint?.id === point.id
                  ? 'border-recicla-primary bg-recicla-primary/5'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <h4 className="font-semibold text-gray-900 text-sm mb-1">
                {point.name}
              </h4>
              <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                {point.address}
              </p>
              <div className="flex flex-wrap gap-1">
                {point.materials.slice(0, 3).map((material) => (
                  <Badge
                    key={material}
                    variant="outline"
                    className={`text-xs ${materialColors[material] || ''}`}
                  >
                    {material}
                  </Badge>
                ))}
                {point.materials.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{point.materials.length - 3}
                  </Badge>
                )}
              </div>
            </div>
          ))}
          
          {filteredPoints.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500 text-sm">
                Nenhum ponto encontrado
              </p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default FloatingSidebar;
