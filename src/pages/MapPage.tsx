
import React, { useState, useMemo, useRef } from "react";
import MainLayout from "@/layouts/MainLayout";
import EnhancedCollectionMap from "@/components/map/EnhancedCollectionMap";
import FloatingSidebar from "@/components/map/FloatingSidebar";
import { CollectionPoint } from "@/types/collection-point";

// TODO: Use real data.
const mockPoints: CollectionPoint[] = [
  {
    id: "1",
    name: "Ecoponto I",
    address: "Rua das Flores, 123",
    description: "Coleta de recicláveis.",
    latitude: -25.4323,
    longitude: -49.2769,
    materials: ["Papel", "Plástico", "Metal"],
  },
  {
    id: "2",
    name: "Ecoponto II",
    address: "Av. Brasil, 456",
    description: "Ponto de entrega para eletrônicos e vidro.",
    latitude: -25.4400,
    longitude: -49.2850,
    materials: ["Eletrônicos", "Vidro"],
  },
  // ... outros pontos ...
];

const allMaterials = ["Papel", "Plástico", "Metal", "Vidro", "Eletrônicos"];

const MapPage = () => {
  const [search, setSearch] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [selectedPoint, setSelectedPoint] = useState<CollectionPoint | null>(null);

  // Mock, filtrar pontos
  const filteredPoints = useMemo(() => {
    return mockPoints.filter((pt) => {
      const nameMatch = pt.name.toLowerCase().includes(search.toLowerCase());
      const materialsMatch =
        activeFilters.length === 0 ||
        pt.materials.some((m) => activeFilters.includes(m));
      return nameMatch && materialsMatch;
    });
  }, [search, activeFilters]);

  // Controla mapRef para centralizar marcador ao clicar no card
  const mapRef = useRef<any>(null);
  const handleCardClick = (pt: CollectionPoint) => {
    setSelectedPoint(pt);
    // Se EnhancedCollectionMap permitir, ajuste: mapRef.current.flyTo(...)
    if (mapRef.current && mapRef.current.setView) {
      mapRef.current.setView([pt.latitude, pt.longitude], 15);
    }
  };

  return (
    <MainLayout>
      <div className="relative w-full h-[calc(100vh-64px)] bg-gray-100 dark:bg-gray-900">
        <EnhancedCollectionMap
          ref={mapRef}
          collectionPoints={filteredPoints}
          selectedPoint={selectedPoint}
          onMarkerClick={setSelectedPoint}
        />
        <FloatingSidebar
          search={search}
          setSearch={setSearch}
          allMaterials={allMaterials}
          activeFilters={activeFilters}
          setActiveFilters={setActiveFilters}
          points={filteredPoints}
          onPointClick={handleCardClick}
          selectedPointId={selectedPoint?.id}
        />
      </div>
    </MainLayout>
  );
};

export default MapPage;
