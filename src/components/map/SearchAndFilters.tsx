
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface SearchAndFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  activeFilter: string[];
  allMaterials: string[];
  toggleFilter: (material: string) => void;
  clearFilters: () => void;
}

const SearchAndFilters = ({
  searchTerm,
  setSearchTerm,
  activeFilter,
  allMaterials,
  toggleFilter,
  clearFilters
}: SearchAndFiltersProps) => {
  return (
    <div className="space-y-4">
      <div className="relative">
        <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input 
          type="text"
          placeholder="Buscar pontos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 w-full"
        />
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Filtrar por materiais</h3>
          <Button 
            onClick={clearFilters} 
            variant="ghost"
            size="sm"
            className="text-xs h-auto p-1 text-recicla-primary dark:text-recicla-secondary hover:bg-recicla-primary/10 dark:hover:bg-recicla-secondary/10"
          >
            Limpar
          </Button>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          {allMaterials.map((material) => (
            <Badge 
              key={material}
              className={`cursor-pointer text-xs px-2 py-1 justify-center transition-colors ${
                activeFilter.includes(material) 
                  ? 'bg-recicla-primary text-white dark:bg-recicla-secondary dark:text-gray-900' 
                  : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
              onClick={() => toggleFilter(material)}
            >
              {material}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilters;
