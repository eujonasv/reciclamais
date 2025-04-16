
export interface CollectionPoint {
  id: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  address: string;
  phone: string;
  materials: string[];
}

export const materialColors: Record<string, string> = {
  "Papel": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  "Plástico": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  "Metal": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  "Vidro": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  "Eletrônicos": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  "Baterias": "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
  "Lâmpadas": "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300",
  "Madeira": "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
};
