

export const RECYCLABLE_MATERIALS = [
  "Papel",
  "Plástico", 
  "Metal",
  "Vidro",
  "Eletrônicos",
  "Baterias",
  "Lâmpadas",
  "Madeira",
  "Óleo de Cozinha",
  "Pneus",
  "Medicamentos",
  "Tecidos",
] as const;

export type RecyclableMaterial = typeof RECYCLABLE_MATERIALS[number];

