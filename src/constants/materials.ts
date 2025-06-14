
export const RECYCLABLE_MATERIALS = [
  "Papel",
  "Plástico", 
  "Metal",
  "Vidro",
  "Eletrônicos",
] as const;

export type RecyclableMaterial = typeof RECYCLABLE_MATERIALS[number];
