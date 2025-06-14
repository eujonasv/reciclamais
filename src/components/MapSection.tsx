import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Navigation, Expand, Shrink } from "lucide-react";
import SearchAndFilters from "./map/SearchAndFilters";
import EnhancedCollectionMap from "./map/EnhancedCollectionMap";
import { supabase } from "@/integrations/supabase/client";
import { CollectionPoint } from "@/types/collection-point";
import { useToast } from "@/components/ui/use-toast";
import { RECYCLABLE_MATERIALS } from "@/constants/materials";

const MapSection = () => {
  const mapRef = useRef<any>(null);
  const [collectionPoints, setCollectionPoints] = useState<CollectionPoint[]>([]);
  const [selectedPoint, setSelectedPoint] = useState<CollectionPoint | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLocating, setIsLocating] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const { toast } = useToast();

  React.useEffect(() => {
    const fetchPoints = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase.from("collection_points").select("*").limit(50);
        if (error) {
          console.error("Erro ao carregar pontos:", error);
          return;
        }
        const points: CollectionPoint[] = data.map((pt) => ({
          ...pt,
          id: pt.id.toString(),
          materials: pt.materials?.split(",").map((m: string) => m.trim()) || [],
        }));
        setCollectionPoints(points);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPoints();
  }, []);

  const allMaterials = Array.from(
    new Set(collectionPoints.flatMap((p) => p.materials))
  ).sort();

  const filteredPoints = collectionPoints.filter((point) => {
    const matchesSearch =
      point.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      point.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      point.description?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      activeFilter.length === 0 ||
      point.materials.some((mat) => activeFilter.includes(mat));

    return matchesSearch && matchesFilter;
  });

  const toggleFilter = (mat: string) => {
    setActiveFilter((list) =>
      list.includes(mat) ? list.filter((m) => m !== mat) : [...list, mat]
    );
  };

  const clearFilters = () => {
    setActiveFilter([]);
    setSearchTerm("");
  };

  const handlePointSelect = (point: CollectionPoint) => {
    setSelectedPoint(point);
    if (mapRef.current && typeof mapRef.current.setViewFromExternal === "function") {
      mapRef.current.setViewFromExternal([point.latitude, point.longitude]);
    }
  };

  const getUserLocation = () => {
    if (!navigator.geolocation) {
      toast({
        title: "Geolocalização não suportada",
        description: "Seu navegador não suporta geolocalização",
        variant: "destructive",
      });
      return;
    }
    
    setIsLocating(true);
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        if (mapRef.current && typeof mapRef.current.setUserLocation === "function") {
          mapRef.current.setUserLocation([latitude, longitude]);
        }
        setIsLocating(false);
        toast({
          title: "Localização encontrada",
          description: "Sua localização foi marcada no mapa",
        });
      },
      (error) => {
        console.error("Erro ao obter localização:", error);
        setIsLocating(false);
        toast({
          title: "Erro ao obter localização",
          description: `Não foi possível obter sua localização: ${error.message}`,
          variant: "destructive",
        });
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  return (
    <section id="mapa" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Pontos de <span className="text-recicla-primary dark:text-recicla-secondary">Coleta</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Encontre pontos de coleta próximos a você. Use os filtros para localizar pontos que aceitem materiais específicos.
          </p>
        </div>

        <SearchAndFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          activeFilter={activeFilter}
          allMaterials={allMaterials}
          toggleFilter={toggleFilter}
          clearFilters={clearFilters}
        />

        <div className="relative">
          <div 
            className={`bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden transition-all duration-300 ${
              isExpanded 
                ? "fixed inset-4 z-50" 
                : "h-[500px] md:h-[600px]"
            }`}
          >
            <div className="absolute top-4 left-4 z-10 flex gap-2">
              <Button
                onClick={getUserLocation}
                disabled={isLocating}
                className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                size="sm"
              >
                <Navigation className="h-4 w-4 mr-2" />
                {isLocating ? "Localizando..." : "Minha Localização"}
              </Button>
            </div>
            
            <div className="absolute top-4 right-4 z-10 md:hidden">
              <Button
                onClick={() => setIsExpanded(!isExpanded)}
                className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                size="sm"
              >
                {isExpanded ? (
                  <Shrink className="h-4 w-4" />
                ) : (
                  <Expand className="h-4 w-4" />
                )}
              </Button>
            </div>

            <div className="h-full w-full">
              <EnhancedCollectionMap
                collectionPoints={filteredPoints}
                selectedPoint={selectedPoint}
                onMarkerClick={handlePointSelect}
                ref={mapRef}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
