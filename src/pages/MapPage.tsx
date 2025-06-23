
import React, { useState, useRef, useEffect } from "react";
import MainLayout from "@/layouts/MainLayout";
import FloatingSidebar from "@/components/map/FloatingSidebar";
import MobilePointsDrawer from "@/components/map/MobilePointsDrawer";
import MapboxCollectionMap, { MapboxCollectionMapRef } from "@/components/map/MapboxCollectionMap";
import { supabase } from "@/integrations/supabase/client";
import { CollectionPoint } from "@/types/collection-point";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Locate, List, Filter, MapPin, Search } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import type { LatLngTuple } from "@/lib/map-utils";
import { findClosestPoint } from "@/lib/map-utils";

const POINTS_PER_FETCH = 100;

const MapPage = () => {
  const [collectionPoints, setCollectionPoints] = useState<CollectionPoint[]>([]);
  const [selectedPoint, setSelectedPoint] = useState<CollectionPoint | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLocating, setIsLocating] = useState(false);
  const { toast } = useToast();
  const mapRef = useRef<MapboxCollectionMapRef>(null);
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);

  useEffect(() => {
    setIsSidebarOpen(!isMobile);
  }, [isMobile]);

  useEffect(() => {
    const fetchPoints = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase.from("collection_points").select("*").limit(POINTS_PER_FETCH);
        if (error) {
          toast({
            title: "Erro ao carregar pontos",
            description: error.message,
            variant: "destructive",
          });
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
  }, [toast]);

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
    if (isMobile) {
      setIsSidebarOpen(false);
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
        const { latitude, longitude, accuracy } = position.coords;
        const userLatLng: LatLngTuple = [latitude, longitude];

        if (mapRef.current && typeof mapRef.current.setUserLocation === "function") {
          mapRef.current.setUserLocation(userLatLng, accuracy);
        }
        
        const closestPoint = findClosestPoint(userLatLng, collectionPoints);
        if (closestPoint) {
            handlePointSelect(closestPoint);
            toast({
                title: "Ponto mais próximo encontrado!",
                description: `Exibindo o ponto de coleta mais perto de você: ${closestPoint.name}.`,
            });
        } else {
            toast({
              title: "Localização encontrada",
              description: "Sua localização foi marcada no mapa",
            });
        }

        setIsLocating(false);
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
    <MainLayout>
      <div className="h-[calc(100vh-4rem)] w-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
        {/* Header com informações */}
        <div className="absolute top-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-recicla-primary/10 dark:bg-recicla-secondary/10 rounded-full">
                <MapPin className="h-5 w-5 text-recicla-primary dark:text-recicla-secondary" />
              </div>
              <div>
                <h1 className="font-bold text-lg text-gray-900 dark:text-white">Mapa de Coleta</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {filteredPoints.length} ponto{filteredPoints.length !== 1 ? 's' : ''} encontrado{filteredPoints.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
            
            {/* Quick stats */}
            <div className="hidden md:flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 dark:bg-blue-950/30 rounded-full">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-blue-700 dark:text-blue-300 font-medium">
                  {collectionPoints.length} Pontos Ativos
                </span>
              </div>
              {selectedPoint && (
                <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 dark:bg-green-950/30 rounded-full animate-fade-in">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-green-700 dark:text-green-300 font-medium">
                    Ponto Selecionado
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mapa principal */}
        <div className="pt-[70px] h-full relative">
          <MapboxCollectionMap
            collectionPoints={filteredPoints}
            selectedPoint={selectedPoint}
            onMarkerClick={handlePointSelect}
            ref={mapRef}
          />
          
          {/* Loading overlay */}
          {isLoading && (
            <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-40">
              <div className="flex flex-col items-center gap-4">
                <div className="relative">
                  <div className="w-12 h-12 border-4 border-recicla-primary/30 dark:border-recicla-secondary/30 rounded-full animate-spin"></div>
                  <div className="w-12 h-12 border-4 border-transparent border-t-recicla-primary dark:border-t-recicla-secondary rounded-full animate-spin absolute top-0"></div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 font-medium">Carregando pontos de coleta...</p>
              </div>
            </div>
          )}
          
          {/* Botões flutuantes */}
          <div className="absolute top-4 right-4 z-40 flex flex-col gap-3">
            {!isMobile && !isSidebarOpen && (
              <Button
                onClick={() => setIsSidebarOpen(true)}
                className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm text-gray-900 dark:text-white border border-gray-300/50 dark:border-gray-600/50 shadow-xl hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
                size="icon"
                aria-label="Ver lista de pontos"
              >
                <List className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </Button>
            )}

            <Button
              onClick={getUserLocation}
              disabled={isLocating}
              className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm text-gray-900 dark:text-white border border-gray-300/50 dark:border-gray-600/50 shadow-xl hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl group min-h-[48px] gap-2"
              size={isMobile ? "sm" : "default"}
              aria-label="Minha Localização"
            >
              <Locate className={`${isMobile ? "h-4 w-4" : "h-5 w-5"} ${isLocating ? "animate-spin" : "group-hover:scale-110"} transition-transform`} />
              {!isMobile && (
                <span className="font-medium">
                  {isLocating ? "Localizando..." : "Minha Localização"}
                </span>
              )}
            </Button>

            {isMobile && (
              <Button
                onClick={() => setIsSidebarOpen(true)}
                className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm text-gray-900 dark:text-white border border-gray-300/50 dark:border-gray-600/50 shadow-xl hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
                size="sm"
                aria-label="Ver lista de pontos"
              >
                <List className="h-4 w-4 group-hover:scale-110 transition-transform" />
              </Button>
            )}

            {/* Filtros rápidos */}
            {activeFilter.length > 0 && (
              <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border border-gray-300/50 dark:border-gray-600/50 rounded-xl p-2 shadow-xl animate-fade-in">
                <div className="flex items-center gap-2 text-xs">
                  <Filter className="h-3 w-3 text-recicla-primary dark:text-recicla-secondary" />
                  <span className="text-gray-600 dark:text-gray-300 font-medium">
                    {activeFilter.length} filtro{activeFilter.length !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Indicador de ponto selecionado */}
          {selectedPoint && (
            <div className="absolute bottom-4 left-4 right-4 md:left-4 md:right-auto md:max-w-md z-40">
              <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border border-gray-300/50 dark:border-gray-600/50 rounded-xl p-4 shadow-xl animate-fade-in">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full flex-shrink-0">
                    <MapPin className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 dark:text-white text-sm truncate">
                      {selectedPoint.name}
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                      {selectedPoint.address}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {selectedPoint.materials.slice(0, 3).map((material, index) => (
                        <span
                          key={index}
                          className="px-2 py-0.5 bg-recicla-primary/10 dark:bg-recicla-secondary/10 text-recicla-primary dark:text-recicla-secondary text-xs rounded-full font-medium"
                        >
                          {material}
                        </span>
                      ))}
                      {selectedPoint.materials.length > 3 && (
                        <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                          +{selectedPoint.materials.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Sidebar/Drawer responsiva */}
        {isMobile ? (
          <MobilePointsDrawer
            isOpen={isSidebarOpen}
            onOpenChange={setIsSidebarOpen}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            activeFilter={activeFilter}
            allMaterials={allMaterials}
            toggleFilter={toggleFilter}
            clearFilters={clearFilters}
            filteredPoints={filteredPoints}
            selectedPoint={selectedPoint}
            onPointSelect={handlePointSelect}
          />
        ) : (
          <FloatingSidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            activeFilter={activeFilter}
            allMaterials={allMaterials}
            toggleFilter={toggleFilter}
            clearFilters={clearFilters}
            filteredPoints={filteredPoints}
            selectedPoint={selectedPoint}
            onPointSelect={handlePointSelect}
          />
        )}
      </div>
    </MainLayout>
  );
};

export default MapPage;
