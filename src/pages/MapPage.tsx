
import React, { useState, useRef, useEffect } from "react";
import MainLayout from "@/layouts/MainLayout";
import FloatingSidebar from "@/components/map/FloatingSidebar";
import MobilePointsDrawer from "@/components/map/MobilePointsDrawer";
import MapboxCollectionMap, { MapboxCollectionMapRef } from "@/components/map/MapboxCollectionMap";
import { supabase } from "@/integrations/supabase/client";
import { CollectionPoint } from "@/types/collection-point";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Locate, List } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import DemoWarningBanner from "@/components/map/DemoWarningBanner";
import type { LatLngTuple } from "@/lib/map-utils";
import { findClosestPoint } from "@/lib/map-utils";

const parseOpeningHours = (description: string | null) => {
  const defaultHours = {
    monday: { enabled: false, openTime: '', closeTime: '' },
    tuesday: { enabled: false, openTime: '', closeTime: '' },
    wednesday: { enabled: false, openTime: '', closeTime: '' },
    thursday: { enabled: false, openTime: '', closeTime: '' },
    friday: { enabled: false, openTime: '', closeTime: '' },
    saturday: { enabled: false, openTime: '', closeTime: '' },
    sunday: { enabled: false, openTime: '', closeTime: '' },
  };
  
  if (!description) return defaultHours;
  
  try {
    const parsed = JSON.parse(description);
    if (typeof parsed === 'object' && parsed.monday !== undefined) {
      return parsed;
    }
    return defaultHours;
  } catch (error) {
    return defaultHours;
  }
};

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
    // Quando o status de 'isMobile' muda, ajustamos a sidebar.
    // Em mobile, ela começa fechada; em desktop, aberta.
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
          openingHours: parseOpeningHours(pt.description)
        }));
        setCollectionPoints(points);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPoints();
  }, [toast]);

  // Lista de materiais distintos, ordenados
  const allMaterials = Array.from(
    new Set(collectionPoints.flatMap((p) => p.materials))
  ).sort();

  // Filtragem local
  const filteredPoints = collectionPoints.filter((point) => {
    const matchesSearch =
      point.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      point.address.toLowerCase().includes(searchTerm.toLowerCase());

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

  // Seleção de ponto sincroniza com o mapa e sidebar
  const handlePointSelect = (point: CollectionPoint) => {
    setSelectedPoint(point);
    if (mapRef.current && typeof mapRef.current.setViewFromExternal === "function") {
      mapRef.current.setViewFromExternal([point.latitude, point.longitude]);
    }
    // Em mobile, ao selecionar um ponto, fechamos a lista para o usuário ver o mapa
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
      {/* Aviso de demonstração */}
      <DemoWarningBanner />
      
      {/* Layout flex que ocupa toda altura abaixo do header */}
      <div className="h-[calc(100vh-8rem)] w-full bg-white dark:bg-gray-900 relative">
        {/* Mapa: ocupa toda a área */}
        <div className="flex-1 h-full relative">
          <MapboxCollectionMap
            collectionPoints={filteredPoints}
            selectedPoint={selectedPoint}
            onMarkerClick={handlePointSelect}
            ref={mapRef}
          />
          
          {/* Botões flutuantes no mapa */}
          <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-40 flex flex-col gap-2 sm:gap-3">
            {!isMobile && !isSidebarOpen && (
              <Button
                onClick={() => setIsSidebarOpen(true)}
                className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 rounded-full animate-fade-in touch-manipulation"
                size="icon"
                aria-label="Ver lista de pontos"
              >
                <List className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            )}

            <Button
              onClick={getUserLocation}
              disabled={isLocating}
              className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 rounded-full touch-manipulation min-h-[44px] text-sm"
              size={isMobile ? "sm" : "default"}
              aria-label="Minha Localização"
            >
              <Locate className={isMobile ? "h-4 w-4" : "h-4 w-4 sm:h-5 sm:w-5 mr-2"} />
              {!isMobile && (isLocating ? "Localizando..." : "Minha Localização")}
            </Button>

            {isMobile && (
              <Button
                onClick={() => setIsSidebarOpen(true)}
                className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 rounded-full touch-manipulation min-h-[44px]"
                size="sm"
                aria-label="Ver lista de pontos"
              >
                <List className="h-4 w-4" />
              </Button>
            )}
          </div>
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
