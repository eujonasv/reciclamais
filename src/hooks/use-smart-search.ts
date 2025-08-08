
import { useMemo, useCallback } from "react";
import Fuse from "fuse.js";
import type { CollectionPoint } from "@/types/collection-point";
import { expandQueryToSynonyms, hasMaterialIntersection, normalizeText } from "@/lib/search-utils";
import { RECYCLABLE_MATERIALS } from "@/constants/materials";

interface UseSmartSearchParams {
  points: CollectionPoint[];
  searchTerm: string;
  activeFilter: string[];
}

export const useSmartSearch = ({ points, searchTerm, activeFilter }: UseSmartSearchParams) => {
  // Construímos documentos amigáveis para busca, preservando o ponto original
  const docs = useMemo(() =>
    points.map((p) => ({
      name: p.name,
      address: p.address,
      materialsText: p.materials.join(", "),
      point: p,
    })),
  [points]);

  const fuse = useMemo(() => {
    return new Fuse(docs, {
      includeScore: true,
      threshold: 0.38, // fuzzy mais inteligente
      ignoreLocation: true,
      minMatchCharLength: 2,
      keys: [
        { name: "name", weight: 0.55 },
        { name: "address", weight: 0.3 },
        { name: "materialsText", weight: 0.15 },
      ],
    });
  }, [docs]);

  const expandedMaterials = useMemo(() => expandQueryToSynonyms(searchTerm), [searchTerm]);

  const filteredPoints = useMemo(() => {
    // Primeiro aplicamos filtro por materiais explicitamente selecionados
    let baseList = points.filter((p) => hasMaterialIntersection(p.materials, activeFilter));

    // Sem termo de busca -> apenas retorna filtrados por material
    if (!searchTerm.trim()) {
      return baseList;
    }

    // Se houver termo, fazemos busca fuzzy, expandindo por sinônimos de materiais
    const query = [searchTerm, ...expandedMaterials].join(" ").trim();
    const results = fuse.search(query);

    // Ordenamos pelos scores do Fuse (menor score = melhor). Já vem ordenado.
    const ranked = results
      .map((r) => r.item.point)
      // Em caso de filtros ativos, garantimos que permaneçam aplicados
      .filter((p) => baseList.some((bp) => bp.id === p.id));

    // Caso a busca não encontre nada, caímos no fallback dos filtrados por material
    return ranked.length ? ranked : baseList;
  }, [points, activeFilter, searchTerm, expandedMaterials, fuse]);

  // Sugestões em tempo real: materiais + nomes/endereços
  const getSuggestions = useCallback((q: string) => {
    const term = normalizeText(q.trim());
    if (term.length < 2) return [];

    const materialMatches = (RECYCLABLE_MATERIALS as readonly string[])
      .filter((m) => normalizeText(m).includes(term));

    const textMatches = fuse
      .search(q, { limit: 6 })
      .flatMap((r) => [r.item.name, r.item.address])
      .filter(Boolean) as string[];

    const combined = Array.from(new Set([...materialMatches, ...textMatches]));
    return combined.slice(0, 8);
  }, [fuse]);

  return { filteredPoints, getSuggestions };
};
