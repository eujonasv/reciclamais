
import { RECYCLABLE_MATERIALS } from "@/constants/materials";

// Remove acentos e normaliza para comparação
export const normalizeText = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}+/gu, "");

// Mapa simples de sinônimos -> material canônico
const MATERIAL_SYNONYMS: Record<string, string> = {
  vidro: "Vidro",
  garrafa: "Vidro",
  garrafas: "Vidro",

  plastico: "Plástico",
  plástico: "Plástico",
  pet: "Plástico",

  metal: "Metal",
  aluminio: "Metal",
  alumínio: "Metal",
  lata: "Metal",
  latas: "Metal",
  ferro: "Metal",

  papel: "Papel",
  papelao: "Papel",
  papelão: "Papel",
  cartao: "Papel",
  cartão: "Papel",

  eletronico: "Eletrônicos",
  eletrônico: "Eletrônicos",
  eletronicos: "Eletrônicos",
  eletrônicos: "Eletrônicos",
  "e-lixo": "Eletrônicos",

  bateria: "Baterias",
  baterias: "Baterias",
  pilha: "Baterias",
  pilhas: "Baterias",

  lampada: "Lâmpadas",
  lâmpada: "Lâmpadas",
  lampadas: "Lâmpadas",
  lâmpadas: "Lâmpadas",

  madeira: "Madeira",
};

// Expande a consulta para incluir sinônimos de materiais (retorna rótulos canônicos)
export const expandQueryToSynonyms = (query: string): string[] => {
  const tokens = normalizeText(query).split(/\s+/).filter(Boolean);
  const materials = new Set<string>();

  for (const t of tokens) {
    const mapped = MATERIAL_SYNONYMS[t];
    if (mapped && (RECYCLABLE_MATERIALS as readonly string[]).includes(mapped)) {
      materials.add(mapped);
    }
  }
  return Array.from(materials);
};

// Interseção simples entre materiais do ponto e filtros ativos
export const hasMaterialIntersection = (pointMaterials: string[], active: string[]) => {
  if (!active?.length) return true;
  return pointMaterials.some((m) => active.includes(m));
};
