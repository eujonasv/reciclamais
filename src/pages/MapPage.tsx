
import React, { useState, useRef, useEffect } from "react";
import MainLayout from "@/layouts/MainLayout";
import FloatingSidebar from "@/components/map/FloatingSidebar";
import EnhancedCollectionMap from "@/components/map/EnhancedCollectionMap";
import { supabase } from "@/integrations/supabase/client";
import { CollectionPoint } from "@/types/collection-point";
import { useToast } from "@/components/ui/use-toast";
import { Locate } from "lucide-react";
import { Button } from "@/components/ui/button";

// Sidebar width, mantenha sincronizado com FloatingSidebar.
const MAP_SIDEBAR_WIDTH = 420;

const POINTS_PER_FETCH = 100;

const MapPage = () => {
  const [collectionPoints, setCollectionPoints] = useState<CollectionPoint[]>([]);
  const [selectedPoint, setSelectedPoint] = useState<CollectionPoint | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const mapRef = useRef<any>(null);

  // User location (lat, lng)
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

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

  // Seleção de ponto sincroniza com o mapa
  const handlePointSelect = (point: CollectionPoint) => {
    setSelectedPoint(point);
    // Centraliza mapa no ponto selecionado
    if (mapRef.current && typeof mapRef.current.setViewFromExternal === "function") {
      mapRef.current.setViewFromExternal([point.latitude, point.longitude]);
    }
  };

  // Botão "Minha Localização"
  const handleLocation = () => {
    if (!navigator.geolocation) {
      toast({ title: "Seu navegador não suporta geolocalização.", variant: "destructive" });
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation([position.coords.latitude, position.coords.longitude]);
        // Centralizar no mapa
        if (mapRef.current && typeof mapRef.current.setViewFromExternal === "function") {
          mapRef.current.setViewFromExternal([position.coords.latitude, position.coords.longitude], 15);
        }
      },
      (error) => {
        toast({
          title: "Erro ao obter localização",
          description: error.message,
          variant: "destructive",
        });
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  return (
    <MainLayout>
      {/* Tira todo o espaço da tela abaixo do header (supondo header ~4rem) */}
      <div className="relative h-[calc(100vh-4rem)] w-full bg-white dark:bg-gray-900 flex">
        {/* Mapa: ocupa toda largura (menos a sidebar) e altura */}
        <div
          className="absolute top-0 left-0 h-full"
          style={{ width: `calc(100% - ${MAP_SIDEBAR_WIDTH}px)` }}
        >
          <EnhancedCollectionMap
            collectionPoints={filteredPoints}
            selectedPoint={selectedPoint}
            onMarkerClick={handlePointSelect}
            ref={mapRef}
          />
          {/* Botão "Minha Localização" fixo, canto inferior esquerdo */}
          <div className="absolute bottom-6 left-6 z-50 flex items-center gap-2">
            <Button
              className="rounded-full bg-recicla-primary text-white border-none shadow-lg h-12 w-12 flex items-center justify-center"
              size="icon"
              onClick={handleLocation}
              type="button"
              title="Minha localização"
            >
              <Locate size={22} />
            </Button>
            <span className="bg-white/90 dark:bg-gray-900/90 text-sm px-3 py-1 rounded-lg text-recicla-primary dark:text-recicla-secondary font-medium shadow">
              Minha Localização
            </span>
          </div>
        </div>
        {/* Sidebar flutuante cards & busca */}
        <FloatingSidebar
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
      </div>
    </MainLayout>
  );
};

export default MapPage;

