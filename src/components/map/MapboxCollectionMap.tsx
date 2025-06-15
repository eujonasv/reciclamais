import React, { useRef, useEffect, useImperativeHandle, forwardRef, useState } from 'react';
import mapboxgl, { Map } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useTheme } from 'next-themes';
import type { CollectionPoint } from '@/types/collection-point';
import { LatLngTuple } from '@/lib/map-utils';
import { MAPBOX_TOKEN, mapStyles } from './mapbox-utils';
import { useMapboxMarkers } from '@/hooks/useMapboxMarkers';
import { useMapboxPopups } from '@/hooks/useMapboxPopups';

mapboxgl.accessToken = MAPBOX_TOKEN;

export interface MapboxCollectionMapRef {
  setViewFromExternal: (coordinates: [number, number]) => void;
  setUserLocation: (coordinates: LatLngTuple, accuracy: number) => void;
  getMap: () => Map | null;
}

interface MapboxCollectionMapProps {
  collectionPoints: CollectionPoint[];
  selectedPoint: CollectionPoint | null;
  onMarkerClick: (point: CollectionPoint) => void;
  compactPopup?: boolean;
}

const MapboxCollectionMap = forwardRef<MapboxCollectionMapRef, MapboxCollectionMapProps>(({
  collectionPoints,
  selectedPoint,
  onMarkerClick,
  compactPopup = false,
}, ref) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);
  const [userLocation, setUserLocation] = useState<LatLngTuple | null>(null);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const { markersRef, createOrUpdateMarker, removeMarker, setUserLocation: setUserMarkerLocation } = useMapboxMarkers();
  const { popupsRef, createPopup, updatePopupContent, removeAllPopups, removePopup, showPopup, hidePopup } = useMapboxPopups();

  // Handle marker clicks with proper toggle behavior
  const handleMarkerClick = (point: CollectionPoint) => {
    console.log('Marker clicked:', point.id, 'Currently selected:', selectedPoint?.id);
    
    // If clicking the same point that's already selected, deselect it
    if (selectedPoint?.id === point.id) {
      console.log('Deselecting point');
      onMarkerClick(point); // This should set selectedPoint to null
      return;
    }
    
    // Otherwise, select the new point
    console.log('Selecting new point');
    onMarkerClick(point);
  };

  useEffect(() => {
    if (!mapContainer.current) return;

    const map = new Map({
      container: mapContainer.current,
      style: isDark ? mapStyles.dark : mapStyles.light,
      center: [-49.39, -25.59],
      zoom: 12,
    });
    mapRef.current = map;

    map.on('load', () => {
      if (collectionPoints.length > 0) {
        map.setCenter([collectionPoints[0].longitude, collectionPoints[0].latitude]);
      }
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setStyle(isDark ? mapStyles.dark : mapStyles.light);
    }
  }, [isDark]);

  useEffect(() => {
    if (!mapRef.current) return;
    const map = mapRef.current;
    
    // Remove old markers that are no longer in the list
    Object.keys(markersRef.current).forEach(pointId => {
      if (!collectionPoints.find(p => p.id === pointId)) {
        removeMarker(pointId);
        removePopup(pointId);
      }
    });
    
    collectionPoints.forEach(point => {
      const isSelected = selectedPoint?.id === point.id;
      
      createOrUpdateMarker(point, isSelected, handleMarkerClick, map);
      
      // Create popup if it doesn't exist
      if (!popupsRef.current[point.id]) {
        createPopup(point);
      }
      
      // Update popup content
      updatePopupContent(point, userLocation, compactPopup);
    });
    
  }, [collectionPoints, userLocation, compactPopup, selectedPoint, createOrUpdateMarker, removeMarker, removePopup, createPopup, updatePopupContent]);
  
  useEffect(() => {
    if (!mapRef.current) return;

    console.log('Selected point changed:', selectedPoint?.id);

    // Remove all open popups first
    removeAllPopups();

    // If there's a selected point, show its popup
    if (selectedPoint) {
      console.log('Showing popup for selected point:', selectedPoint.id);
      mapRef.current.flyTo({
        center: [selectedPoint.longitude, selectedPoint.latitude],
        zoom: mapRef.current.getZoom() < 15 ? 15 : mapRef.current.getZoom(),
        duration: 1200,
      });
      
      setTimeout(() => {
        if (mapRef.current && selectedPoint) {
          showPopup(selectedPoint, mapRef.current);
        }
      }, 300);
    }
  }, [selectedPoint, removeAllPopups, showPopup]);

  useImperativeHandle(ref, () => ({
    setViewFromExternal: (coordinates: [number, number]) => {
      if (mapRef.current) {
        mapRef.current.flyTo({ center: [coordinates[1], coordinates[0]], zoom: 15 });
      }
    },
    setUserLocation: (coordinates: LatLngTuple, accuracy: number) => {
      if (!mapRef.current) return;
      const map = mapRef.current;
      const lngLat: [number, number] = [coordinates[1], coordinates[0]];

      setUserLocation(coordinates);
      map.flyTo({ center: lngLat, zoom: 15, duration: 1500 });
      
      setUserMarkerLocation(coordinates, map);
    },
    getMap: () => mapRef.current,
  }));

  if (!MAPBOX_TOKEN) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-800 rounded-xl">
        <p className="text-red-500 font-semibold text-center p-4">
          Token do Mapbox não fornecido. <br/> Por favor, crie um arquivo `.env` e adicione `VITE_MAPBOX_TOKEN="SUA_CHAVE_AQUI"`.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative">
      <div ref={mapContainer} className="w-full h-full" />
      <style>{`
        .mapboxgl-popup-content {
          padding: 0;
          border-radius: 12px;
          background: transparent;
          box-shadow: none;
        }
        .user-location-dot {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background-color: #3b82f6;
          border: 4px solid white;
          box-shadow: 0 0 0 4px #3b82f6;
          animation: pulse-blue 2s infinite;
        }
        @keyframes pulse-marker {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }
      `}</style>
    </div>
  );
});

MapboxCollectionMap.displayName = 'MapboxCollectionMap';

export default MapboxCollectionMap;
