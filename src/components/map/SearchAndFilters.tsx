
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { RECYCLABLE_MATERIALS } from "@/constants/materials";
import { useLanguage } from "@/contexts/LanguageContext";

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
  const { translations } = useLanguage();

  const getTranslatedMaterial = (material: string) => {
    const materialKey = `materials.${material.toLowerCase()}`;
    return translations[materialKey] || material;
  };

  return (
    <div className={`mb-2 ${compact ? '' : 'max-w-3xl mx-auto mb-8'}`}>
      <div className={"flex items-center gap-2 mb-3"}>
        <div className="relative w-full">
          {showSearchIcon && (
            <Search
              className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
          )}
          <Input
            type="text"
            placeholder={translations['search.placeholder'] || "Buscar pontos..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-9 ${compact ? "h-9 text-sm" : ""}`}
          />
        </div>
        {!compact && (
          <Button
            onClick={clearFilters}
            variant="outline"
            className="border-recicla-primary text-recicla-primary hover:bg-recicla-primary/10 dark:border-recicla-secondary dark:text-recicla-secondary dark:hover:bg-recicla-secondary/10"
          >
            {translations['search.clear-filters'] || "Limpar Filtros"}
          </Button>
        )}
      </div>
      <div className="flex flex-wrap gap-2 mb-1 justify-center">
        {RECYCLABLE_MATERIALS.map((mat) => (
          <label
            key={mat}
            className={`flex items-center gap-1 px-2 py-0.5 rounded-full cursor-pointer border text-xs
              ${
                activeFilter.includes(mat)
                  ? "bg-recicla-primary text-white border-recicla-primary"
                  : "bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-700 dark:text-gray-300"
              }
            `}
          >
            <input
              type="checkbox"
              checked={activeFilter.includes(mat)}
              onChange={() => toggleFilter(mat)}
              className="sr-only"
            />
            <span>{getTranslatedMaterial(mat)}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default SearchAndFilters;
