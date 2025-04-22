import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import type { CollectionPoint } from "@/types/collection-point";

interface CollectionPointsMapProps {
  points: CollectionPoint[];
  selectedPoint: CollectionPoint | null;
  onSelectPoint: (point: CollectionPoint) => void;
}

const MAPBOX_TOKEN = "pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJja3BxYXlka24wcXZqMm9wcXBzejNreGcwIn0.KVjLpkJ_wQwBp7p2w1v7Qg"; // Token de acesso Mapbox

const CollectionPointsMap: React.FC<CollectionPointsMapProps> = ({
  points,
  selectedPoint,
  onSelectPoint,
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/navigation-day-v1",
      center: points.length ? [points[0].longitude, points[0].latitude] : [-47.9292, -15.7801],
      zoom: 11,
      attributionControl: false,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), "bottom-right");
    map.current.scrollZoom.disable();

    return () => {
      map.current?.remove();
    };
  }, []);

  useEffect(() => {
    if (!map.current) return;

    // Limpar marcadores antigos
    markers.current.forEach((marker) => marker.remove());
    markers.current = [];

    // Adicionar novos
    points.forEach((point) => {
      if (point.latitude == null || point.longitude == null) return;

      const el = document.createElement("div");
      el.className = "marker";
      el.style.width = "22px";
      el.style.height = "22px";
      el.style.background =
        selectedPoint?.id === point.id ? "#2ecc71" : "#49494E";
      el.style.borderRadius = "50%";
      el.style.boxShadow =
        selectedPoint?.id === point.id
          ? "0 0 0 4px rgba(46, 204, 113, 0.4), 0 0 0 8px rgba(46, 204, 113, 0.2)"
          : "0 0 0 2px #fff";
      el.style.cursor = "pointer";
      el.title = point.name;

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

      if (selectedPoint?.id === point.id) {
        new mapboxgl.Popup({ closeButton: false, offset: 25, className: "custom-popup" })
          .setLngLat([point.longitude, point.latitude])
          .setHTML(`<h3>${point.name}</h3><p>${point.address}</p>`)
          .addTo(map.current);
      }
    });

    if (selectedPoint && selectedPoint.latitude && selectedPoint.longitude) {
      map.current.flyTo({ center: [selectedPoint.longitude, selectedPoint.latitude], zoom: 14 });
    } else if (points.length > 0) {
      map.current.flyTo({ center: [points[0].longitude, points[0].latitude], zoom: 11 });
    }
  }, [points, selectedPoint, onSelectPoint]);

  return (
    <div
      ref={mapContainer}
      className="w-full h-[60vh] sm:h-[400px] rounded-lg border shadow mt-6"
    />
  );
};

export default CollectionPointsMap;
