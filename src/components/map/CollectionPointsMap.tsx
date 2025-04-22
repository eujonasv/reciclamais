
import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import type { CollectionPoint } from "@/types/collection-point";

interface CollectionPointsMapProps {
  points: CollectionPoint[];
  selectedPoint: CollectionPoint | null;
  onSelectPoint: (point: CollectionPoint) => void;
}

const MAPBOX_TOKEN = "pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJja3BxYXlka24wcXZqMm9wcXBzejNreGcwIn0.KVjLpkJ_wQwBp7p2w1v7Qg"; // Utilize seu token do Mapbox aqui

const CollectionPointsMap: React.FC<CollectionPointsMapProps> = ({
  points,
  selectedPoint,
  onSelectPoint,
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);

  // Inicializando o mapa
  useEffect(() => {
    if (!mapContainer.current) return;
    if (map.current) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/standard", // Estilo de mapa com ruas e nomes de lugares
      center: points.length ? [points[0].longitude, points[0].latitude] : [-47.9292, -15.7801],
      zoom: 11,
      attributionControl: false
    });

    // Adicionar controles de navegação
    map.current.addControl(
      new mapboxgl.NavigationControl(),
      'bottom-right'
    );

    // Disable scroll zoom for small map experience
    map.current.scrollZoom.disable();
    return () => {
      map.current?.remove();
    };
  }, []);

  // Atualizando marcadores
  useEffect(() => {
    if (!map.current) return;

    // Remove old markers
    markers.current.forEach(marker => marker.remove());
    markers.current = [];

    // Adiciona novos marcadores
    points.forEach((point) => {
      if (point.latitude == null || point.longitude == null) return;
      const el = document.createElement("div");
      el.className = "marker";
      el.style.width = "22px";
      el.style.height = "22px";
      el.style.background =
        selectedPoint?.id === point.id
          ? "#2ecc71" // Verde mais vibrante para o ponto selecionado
          : "#49494E";
      el.style.borderRadius = "50%";
      el.style.boxShadow = selectedPoint?.id === point.id
        ? "0 0 0 4px rgba(46, 204, 113, 0.4), 0 0 0 8px rgba(46, 204, 113, 0.2)"
        : "0 0 0 2px #fff";
      el.style.cursor = "pointer";
      el.title = point.name;

      // Adicionar efeito pulsante ao marcador selecionado
      if (selectedPoint?.id === point.id) {
        el.style.animation = "pulse-green 2s infinite";
      }

      el.addEventListener("click", (e) => {
        e.stopPropagation();
        onSelectPoint(point);
      });

      const marker = new mapboxgl.Marker({ element: el })
        .setLngLat([point.longitude, point.latitude])
        .addTo(map.current!);

      markers.current.push(marker);

      // Se for o ponto selecionado, adicionar um popup
      if (selectedPoint?.id === point.id) {
        new mapboxgl.Popup({ closeButton: false, offset: 25, className: 'custom-popup' })
          .setLngLat([point.longitude, point.latitude])
          .setHTML(`<h3>${point.name}</h3><p>${point.address}</p>`)
          .addTo(map.current);
      }
    });

    // Ajusta o centro se houver ponto selecionado
    if (selectedPoint && selectedPoint.latitude !== null && selectedPoint.longitude !== null) {
      map.current.flyTo({ center: [selectedPoint.longitude, selectedPoint.latitude], zoom: 14 });
    } else if (points.length > 0) {
      map.current.flyTo({ center: [points[0].longitude, points[0].latitude], zoom: 11 });
    }
  }, [points, selectedPoint, onSelectPoint]);

  return (
    <div
      ref={mapContainer}
      className="w-full h-64 rounded-lg border shadow mt-6"
    />
  );
};

export default CollectionPointsMap;
