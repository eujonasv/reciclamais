
import React, { useState, useRef, useEffect } from "react";
import MainLayout from "@/layouts/MainLayout";
import FloatingSidebar from "@/components/map/FloatingSidebar";
import MobilePointsDrawer from "@/components/map/MobilePointsDrawer";
import EnhancedCollectionMap from "@/components/map/EnhancedCollectionMap";
import { supabase } from "@/integrations/supabase/client";
import { CollectionPoint } from "@/types/collection-point";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Navigation, List } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const POINTS_PER_FETCH = 100;

const MapPage = () => {
  const [collectionPoints, setCollectionPoints] = useState<CollectionPoint[]>([]);
  const [selectedPoint, setSelectedPoint] = useState<CollectionPoint | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLocating, setIsLocating] = useState(false);
  const { toast } = useToast();
  const mapRef = useRef<any>(null);
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
    <MainLayout>
      {/* Layout flex que ocupa toda altura abaixo do header */}
      <div className="flex h-[calc(100vh-4rem)] w-full bg-white dark:bg-gray-900 relative">
        {/* Mapa: ocupa toda a área */}
        <div className="flex-1 h-full relative">
          <EnhancedCollectionMap
            collectionPoints={filteredPoints}
            selectedPoint={selectedPoint}
            onMarkerClick={handlePointSelect}
            ref={mapRef}
          />
          
          {/* Botões flutuantes no mapa */}
          <div className="absolute bottom-4 left-4 z-[1000] flex flex-col sm:flex-row gap-2">
            <Button
              onClick={getUserLocation}
              disabled={isLocating}
              className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700"
              size={isMobile ? "icon" : "lg"}
              aria-label="Minha Localização"
            >
              <Navigation className={isMobile ? "h-5 w-5" : "h-5 w-5 mr-2"} />
              {!isMobile && (isLocating ? "Localizando..." : "Minha Localização")}
            </Button>

            {isMobile && (
              <Button
                onClick={() => setIsSidebarOpen(true)}
                className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 md:hidden"
                size="icon"
                aria-label="Ver lista de pontos"
              >
                <List className="h-5 w-5" />
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
            isMobile={false}
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
