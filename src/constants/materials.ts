
export const RECYCLABLE_MATERIALS = [
  "Baterias",
  "Eletrônicos", 
  "Lâmpadas",
  "Madeira",
  "Metal",
  "Papel",
  "Plástico",
  "Vidro",
] as const;

export type RecyclableMaterial = typeof RECYCLABLE_MATERIALS[number];
