
import React, { useState, useEffect, useRef } from "react";
import MainLayout from "@/layouts/MainLayout";
import EnhancedCollectionMap from "@/components/map/EnhancedCollectionMap";
import SearchAndFilters from "@/components/map/SearchAndFilters";
import CompactCollectionPointCard from "@/components/map/CompactCollectionPointCard";
import { CollectionPoint } from "@/types/collection-point";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Target, MapPin } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const MapPage = () => {
  const [collectionPoints, setCollectionPoints] = useState<CollectionPoint[]>([]);
  const [selectedPoint, setSelectedPoint] = useState<CollectionPoint | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const { toast } = useToast();
  const mapRef = useRef<any>(null);

  useEffect(() => {
    const fetchPoints = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase.from("collection_points").select("*");
        if (error) {
          console.error("Error fetching collection points:", error);
          toast({
            title: "Erro ao carregar pontos de coleta",
            description: error.message,
            variant: "destructive",
          });
          return;
        }

        const transformedData: CollectionPoint[] = data.map((point) => ({
          ...point,
          materials: point.materials?.split(',').map((m: string) => m.trim()) || [],
          id: point.id.toString()
        }));

        setCollectionPoints(transformedData);
      } catch (error) {
        console.error("Exception fetching collection points:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPoints();

    const channel = supabase
      .channel('public:collection_points')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'collection_points' 
      }, () => {
        fetchPoints();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [toast]);

  const filteredPoints = collectionPoints.filter(point => {
    const matchesSearch = point.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      point.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      point.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = activeFilter.length === 0 || 
      point.materials.some(material => activeFilter.includes(material));
    
    return matchesSearch && matchesFilter;
  });

  const allMaterials = Array.from(
    new Set(collectionPoints.flatMap(point => point.materials))
  ).sort();

  const toggleFilter = (material: string) => {
    if (activeFilter.includes(material)) {
      setActiveFilter(activeFilter.filter(m => m !== material));
    } else {
      setActiveFilter([...activeFilter, material]);
    }
  };

  const clearFilters = () => {
    setActiveFilter([]);
    setSearchTerm("");
  };

  const handlePointSelect = (point: CollectionPoint) => {
    setSelectedPoint(point);
    
    // Focus map on selected point
    if (mapRef.current && mapRef.current.leafletElement) {
      mapRef.current.leafletElement.setView([point.latitude, point.longitude], 16, {
        animate: true,
        duration: 1
      });
    }
  };

  const handleMyLocation = () => {
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
        setUserLocation([latitude, longitude]);
        setIsLocating(false);
        
        // Find closest collection point
        if (filteredPoints.length > 0) {
          const closest = findClosestPoint([latitude, longitude], filteredPoints);
          setSelectedPoint(closest);
          
          // Center map on closest point
          if (mapRef.current && mapRef.current.leafletElement) {
            mapRef.current.leafletElement.setView([closest.latitude, closest.longitude], 15, {
              animate: true,
              duration: 1.5
            });
          }
          
          toast({
            title: "Localização encontrada!",
            description: `Ponto mais próximo: ${closest.name}`,
          });
        }
      },
      (error) => {
        console.error("Erro ao obter localização:", error);
        setIsLocating(false);
        toast({
          title: "Erro de localização",
          description: "Não foi possível obter sua localização",
          variant: "destructive",
        });
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const findClosestPoint = (userLocation: [number, number], points: CollectionPoint[]): CollectionPoint => {
    let closest = points[0];
    let minDistance = calculateDistance(userLocation, [points[0].latitude, points[0].longitude]);

    for (let i = 1; i < points.length; i++) {
      const distance = calculateDistance(userLocation, [points[i].latitude, points[i].longitude]);
      if (distance < minDistance) {
        minDistance = distance;
        closest = points[i];
      }
    }

    return closest;
  };

  const calculateDistance = (point1: [number, number], point2: [number, number]): number => {
    const R = 6371e3; // Earth radius in meters
    const φ1 = (point1[0] * Math.PI) / 180;
    const φ2 = (point2[0] * Math.PI) / 180;
    const Δφ = ((point2[0] - point1[0]) * Math.PI) / 180;
    const Δλ = ((point2[1] - point1[1]) * Math.PI) / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  };

  return (
    <MainLayout>
      <div className="relative w-full h-screen">
        {/* Fullscreen Map */}
        <div className="absolute inset-0 top-16">
          <div className="w-full h-full">
            {isLoading ? (
              <div className="flex items-center justify-center h-full bg-gray-100 dark:bg-gray-800">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-recicla-primary mx-auto mb-4"></div>
                  <p className="text-gray-600 dark:text-gray-400">Carregando mapa...</p>
                </div>
              </div>
            ) : (
              <div className="w-full h-full">
                <EnhancedCollectionMap
                  collectionPoints={filteredPoints}
                  selectedPoint={selectedPoint}
                  onMarkerClick={handlePointSelect}
                  ref={mapRef}
                />
              </div>
            )}
          </div>
        </div>

        {/* Floating Sidebar - Aumentada para w-96 */}
        <div className="absolute top-20 right-4 w-96 max-h-[calc(100vh-6rem)] bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 z-[1000] overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <SearchAndFilters
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              activeFilter={activeFilter}
              allMaterials={allMaterials}
              toggleFilter={toggleFilter}
              clearFilters={clearFilters}
            />
          </div>
          
          <ScrollArea className="flex-1 max-h-[calc(100vh-16rem)]">
            <div className="p-4 space-y-2">
              {filteredPoints.length === 0 ? (
                <div className="text-center py-8">
                  <MapPin size={48} className="text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">
                    Nenhum ponto encontrado
                  </p>
                </div>
              ) : (
                filteredPoints.map((point) => (
                  <CompactCollectionPointCard
                    key={point.id}
                    point={point}
                    isSelected={selectedPoint?.id === point.id}
                    onClick={() => handlePointSelect(point)}
                  />
                ))
              )}
            </div>
          </ScrollArea>
        </div>

        {/* My Location Button */}
        <div className="absolute bottom-6 left-6 z-[1000]">
          <Button
            onClick={handleMyLocation}
            disabled={isLocating}
            className="bg-white/95 hover:bg-white text-recicla-primary shadow-lg dark:bg-gray-800/95 dark:hover:bg-gray-800 dark:text-recicla-secondary border border-gray-200 dark:border-gray-700 backdrop-blur-md"
            size="lg"
          >
            {isLocating ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-recicla-primary mr-2"></div>
                Localizando...
              </>
            ) : (
              <>
                <Target size={20} className="mr-2" />
                Minha Localização
              </>
            )}
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default MapPage;
