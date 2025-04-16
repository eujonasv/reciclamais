
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
  );
};

export default SearchAndFilters;
