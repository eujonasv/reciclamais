
import React, { useState, useEffect, useRef } from 'react';
import { Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import EnhancedCollectionMap from './EnhancedCollectionMap';
import FloatingSidebar from './FloatingSidebar';
import type { CollectionPoint } from '@/types/collection-point';

const FullscreenMap = () => {
  const [collectionPoints, setCollectionPoints] = useState<CollectionPoint[]>([]);
  const [selectedPoint, setSelectedPoint] = useState<CollectionPoint | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
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
    setSelectedPoint(selectedPoint?.id === point.id ? null : point);
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
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation([latitude, longitude]);
        toast({
          title: "Localização encontrada",
          description: "Centralizando mapa na sua localização",
        });
      },
      (error) => {
        console.error("Erro ao obter localização:", error);
        toast({
          title: "Erro de localização",
          description: "Não foi possível obter sua localização",
          variant: "destructive",
        });
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-recicla-primary mb-4"></div>
          <p className="text-gray-600">Carregando mapa...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-full">
      {/* Fullscreen Map */}
      <div className="absolute inset-0 pt-16">
        <EnhancedCollectionMap
          collectionPoints={filteredPoints}
          selectedPoint={selectedPoint}
          onMarkerClick={handlePointSelect}
          ref={mapRef}
        />
      </div>

      {/* Floating Sidebar */}
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

      {/* My Location Button */}
      <Button
        onClick={getUserLocation}
        className="fixed bottom-6 left-6 z-40 rounded-full w-12 h-12 p-0 bg-white hover:bg-gray-50 text-recicla-primary border border-gray-200 shadow-lg"
        variant="outline"
      >
        <Target size={20} />
      </Button>
    </div>
  );
};

export default FullscreenMap;
