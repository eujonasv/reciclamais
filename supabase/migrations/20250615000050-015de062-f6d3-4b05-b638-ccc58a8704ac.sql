
-- Adiciona a coluna display_order para armazenar a ordem dos pontos de coleta
ALTER TABLE public.collection_points
ADD COLUMN display_order INTEGER;

-- Define a ordem inicial para os pontos existentes com base na data de criação
WITH ordered_points AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY created_at ASC) as rn
  FROM public.collection_points
)
UPDATE public.collection_points
SET display_order = ordered_points.rn
FROM ordered_points
WHERE public.collection_points.id = ordered_points.id;

-- Define display_order como 0 para quaisquer pontos que possam não tê-lo definido (como um fallback)
UPDATE public.collection_points
SET display_order = 0
WHERE display_order IS NULL;

-- Torna a coluna não nula
ALTER TABLE public.collection_points
ALTER COLUMN display_order SET NOT NULL;
