
import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import CompactCollectionPointCard from "./CompactCollectionPointCard";
import type { CollectionPoint } from "@/types/collection-point";

interface Props {
  search: string;
  setSearch: (s: string) => void;
  allMaterials: string[];
  activeFilters: string[];
  setActiveFilters: (mat: string[]) => void;
  points: CollectionPoint[];
  onPointClick: (pt: CollectionPoint) => void;
  selectedPointId?: string;
}

const FloatingSidebar: React.FC<Props> = ({
  search,
  setSearch,
  allMaterials,
  activeFilters,
  setActiveFilters,
  points,
  onPointClick,
  selectedPointId,
}) => {
  const toggleMaterial = (mat: string) => {
    setActiveFilters(
      activeFilters.includes(mat)
        ? activeFilters.filter((m) => m !== mat)
        : [...activeFilters, mat]
    );
  };

  return (
    <aside
      className="fixed right-6 top-[90px] h-[calc(100vh-110px)] w-[380px] max-w-full z-40 bg-white/90 dark:bg-gray-900/90
      rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col backdrop-blur-lg"
    >
      {/* Campo de busca */}
      <div className="flex items-center px-5 pt-5 pb-3 gap-2">
        <Search className="text-recicla-primary dark:text-recicla-secondary" size={20} />
        <Input
          placeholder="Buscar pontos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-white dark:bg-gray-900 border mx-2"
        />
      </div>
      {/* Filtros */}
      <div className="flex flex-wrap gap-2 px-5 pb-3">
        {allMaterials.map((mat) => (
          <label key={mat} className="flex items-center gap-2 text-sm cursor-pointer">
            <Checkbox
              checked={activeFilters.includes(mat)}
              onCheckedChange={() => toggleMaterial(mat)}
              id={`filter-${mat}`}
            />
            {mat}
          </label>
        ))}
      </div>
      {/* Lista de pontos rolável */}
      <div className="flex-1 overflow-y-auto px-2 pb-4">
        {points.length === 0 ? (
          <div className="text-center text-gray-500 mt-6">Nenhum ponto encontrado.</div>
        ) : (
          <div className="flex flex-col gap-2">
            {points.map((pt) => (
              <CompactCollectionPointCard
                key={pt.id}
                point={pt}
                selected={pt.id === selectedPointId}
                onClick={() => onPointClick(pt)}
              />
            ))}
          </div>
        )}
      </div>
    </aside>
  );
};

export default FloatingSidebar;
