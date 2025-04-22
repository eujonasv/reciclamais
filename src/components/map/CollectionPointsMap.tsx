
import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import type { CollectionPoint } from "@/types/collection-point";

interface CollectionPointsMapProps {
  points: CollectionPoint[];
  selectedPoint: CollectionPoint | null;
  onSelectPoint: (point: CollectionPoint) => void;
}

// Use a more modern and clean mapbox style
const MAPBOX_TOKEN = "pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJja3BxYXlka24wcXZqMm9wcXBzejNreGcwIn0.KVjLpkJ_wQwBp7p2w1v7Qg";

const CollectionPointsMap: React.FC<CollectionPointsMapProps> = ({
  points,
  selectedPoint,
  onSelectPoint,
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);
  const popupRef = useRef<mapboxgl.Popup | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Initialize the map
  useEffect(() => {
    if (!mapContainer.current) return;
    if (map.current) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      // Using a style similar to Google Maps/Apple Maps
      style: "mapbox://styles/mapbox/streets-v12", // More detailed streets view
      center: points.length ? [points[0].longitude, points[0].latitude] : [-47.9292, -15.7801],
      zoom: 12,
      attributionControl: false,
      pitch: 0, // Flat 2D view
      bearing: 0
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({ showCompass: false }),
      'bottom-right'
    );

    map.current.on('load', () => {
      setMapLoaded(true);
    });

    // Enable scroll zoom for better map experience
    map.current.scrollZoom.enable();
    
    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, []);

  // Handle markers and popups
  useEffect(() => {
    if (!map.current || !mapLoaded) return;

    // Remove any existing popup
    if (popupRef.current) {
      popupRef.current.remove();
      popupRef.current = null;
    }

    // Remove old markers
    markers.current.forEach(marker => marker.remove());
    markers.current = [];

    // Add new markers
    points.forEach((point) => {
      if (point.latitude == null || point.longitude == null) return;
      
      const el = document.createElement("div");
      el.className = "marker";
      el.style.width = "24px";
      el.style.height = "24px";
      el.style.background = selectedPoint?.id === point.id ? "#2ecc71" : "#49494E";
      el.style.borderRadius = "50%";
      el.style.boxShadow = selectedPoint?.id === point.id
        ? "0 0 0 4px rgba(46, 204, 113, 0.4)"
        : "0 0 0 2px #fff";
      el.style.cursor = "pointer";
      el.style.transition = "all 0.2s ease-in-out";
      el.title = point.name;

      el.addEventListener("click", (e) => {
        e.stopPropagation();
        onSelectPoint(point);
      });

      const marker = new mapboxgl.Marker({ element: el })
        .setLngLat([point.longitude, point.latitude])
        .addTo(map.current!);

      markers.current.push(marker);

      // Add popup only to the selected marker
      if (selectedPoint?.id === point.id) {
        popupRef.current = new mapboxgl.Popup({ 
          closeButton: false, 
          offset: 25,
          closeOnClick: false
        })
          .setLngLat([point.longitude, point.latitude])
          .setHTML(`<div class="p-2 bg-white dark:bg-gray-800 shadow-md rounded-md">
            <h3 class="font-bold text-gray-900 dark:text-white text-sm">${point.name}</h3>
            <p class="text-gray-700 dark:text-gray-300 text-xs">${point.address}</p>
          </div>`)
          .addTo(map.current);
      }
    });

    // Fly to selected point with smoother animation
    if (selectedPoint && selectedPoint.latitude !== null && selectedPoint.longitude !== null) {
      map.current.flyTo({ 
        center: [selectedPoint.longitude, selectedPoint.latitude], 
        zoom: 14,
        duration: 800,
        essential: true
      });
    } else if (points.length > 0) {
      // Fit to all points if no point is selected
      const bounds = new mapboxgl.LngLatBounds();
      points.forEach(point => {
        if (point.latitude !== null && point.longitude !== null) {
          bounds.extend([point.longitude, point.latitude]);
        }
      });
      
      if (!bounds.isEmpty()) {
        map.current.fitBounds(bounds, {
          padding: 50,
          maxZoom: 14,
          duration: 800
        });
      }
    }
  }, [points, selectedPoint, onSelectPoint, mapLoaded]);

  return (
    <div className="relative w-full h-64 md:h-80 lg:h-96 rounded-lg border shadow-md mt-6 overflow-hidden">
      <div ref={mapContainer} className="absolute inset-0" />
    </div>
  );
};

export default CollectionPointsMap;
