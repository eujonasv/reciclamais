import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, XCircle } from "lucide-react";
import { RECYCLABLE_MATERIALS } from "@/constants/materials";

export interface SearchAndFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  activeFilter: string[];
  allMaterials: string[];
  toggleFilter: (mat: string) => void;
  clearFilters: () => void;
  showSearchIcon?: boolean;
  compact?: boolean;
}

const SearchAndFilters = ({
  searchTerm,
  setSearchTerm,
  activeFilter,
  allMaterials,
  toggleFilter,
  clearFilters,
  showSearchIcon,
  compact,
}: SearchAndFiltersProps) => {
  return (
    <div className={`mb-2 ${compact ? '' : 'max-w-3xl mx-auto mb-8'}`}>
      <div className={"flex items-center gap-2 mb-4"}>
        <div className="relative w-full">
          {showSearchIcon && (
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10"
              size={18}
            />
          )}
          <Input
            type="text"
            placeholder={placeholder || "Buscar por nome, endereço..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full bg-white/50 dark:bg-gray-800/50 transition-all focus:bg-white dark:focus:bg-gray-800 ${showSearchIcon ? 'pl-10' : 'pl-4'} ${compact ? "h-10 text-sm" : ""}`}
            aria-label="Campo de busca"
          />
        </div>
        {!compact && (
          <Button
            onClick={clearFilters}
            variant="outline"
            className="border-recicla-primary text-recicla-primary hover:bg-recicla-primary/10 dark:border-recicla-secondary dark:text-recicla-secondary dark:hover:bg-recicla-secondary/10"
          >
            Limpar Filtros
          </Button>
        )}
      </div>
      <div className="flex flex-wrap gap-2 justify-center items-center">
        {RECYCLABLE_MATERIALS.map((mat) => (
          <button
            key={mat}
            onClick={() => toggleFilter(mat)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full cursor-pointer border text-xs font-bold transition-all duration-200
              ${
                activeFilter.includes(mat)
                  ? "bg-recicla-primary text-white border-recicla-primary/50 shadow-md"
                  : "bg-gray-100/80 text-gray-700 border-gray-200/50 dark:bg-gray-700/80 dark:text-gray-300 dark:border-gray-600/50 hover:bg-gray-200 dark:hover:bg-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
              }
            `}
          >
            <span>{mat}</span>
          </button>
        ))}
         {activeFilter.length > 0 && compact && (
          <Button
            variant="ghost"
            size="sm"
            className="text-xs h-auto py-1 px-2.5 text-recicla-primary dark:text-recicla-secondary hover:bg-recicla-primary/10 dark:hover:bg-recicla-secondary/10 rounded-full"
            onClick={clearFilters}
          >
            <XCircle className="w-4 h-4 mr-1"/>
            Limpar
          </Button>
        )}
      </div>
    </div>
  );
};

export default SearchAndFilters;
