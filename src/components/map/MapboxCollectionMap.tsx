
import React, { useRef, useEffect, useImperativeHandle, forwardRef, useState } from 'react';
import ReactDOM from 'react-dom';
import mapboxgl, { Map, Marker, Popup } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useTheme } from 'next-themes';
import type { CollectionPoint } from '@/types/collection-point';
import MapPopupContent from './MapPopupContent';
import { LatLngTuple } from '@/lib/map-utils';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;
if (MAPBOX_TOKEN) {
  mapboxgl.accessToken = MAPBOX_TOKEN;
} else {
  console.error("Mapbox token not set. Please add VITE_MAPBOX_TOKEN to your .env file.");
}

const mapStyles = {
  light: 'mapbox://styles/mapbox/streets-v12',
  dark: 'mapbox://styles/mapbox/dark-v11',
};

const createMarkerElement = (color: string, size: number, isSelected: boolean = false) => {
  const el = document.createElement('div');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="${color}" stroke="white" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3" fill="white" stroke="${color}"/></svg>`;
  el.innerHTML = svg;
  el.style.cursor = 'pointer';
  if (isSelected) {
    el.style.animation = 'pulse-marker 1.8s cubic-bezier(0.4, 0, 0.6, 1) infinite';
    el.style.transformOrigin = 'bottom';
  }
  return el;
};

const createUserMarkerElement = () => {
    const el = document.createElement('div');
    el.className = 'user-location-dot';
    return el;
};

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
  const markersRef = useRef<{ [key: string]: Marker }>({});
  const popupsRef = useRef<{ [key: string]: Popup }>({});
  const userMarkerRef = useRef<Marker | null>(null);
  const [userLocation, setUserLocation] = useState<LatLngTuple | null>(null);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  useEffect(() => {
    if (!mapContainer.current || !MAPBOX_TOKEN) return;

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
    if(mapRef.current) {
        mapRef.current.setStyle(isDark ? mapStyles.dark : mapStyles.light);
    }
  }, [isDark]);

  useEffect(() => {
    if (!mapRef.current) return;
    const map = mapRef.current;
    
    collectionPoints.forEach(point => {
      const isSelected = selectedPoint?.id === point.id;
      const lngLat: [number, number] = [point.longitude, point.latitude];
      const markerColor = isSelected ? '#2ecc71' : '#3b82f6';
      const markerSize = isSelected ? 40 : 32;

      const markerElement = createMarkerElement(markerColor, markerSize, isSelected);

      if (markersRef.current[point.id]) {
        markersRef.current[point.id].getElement().innerHTML = markerElement.innerHTML;
      } else {
        const popupNode = document.createElement('div');
        const popup = new Popup({ offset: [0, -35], closeButton: false, className: 'recicla-mapbox-popup' }).setDOMContent(popupNode);
        popupsRef.current[point.id] = popup;

        const newMarker = new Marker({ element: markerElement, anchor: 'bottom' })
          .setLngLat(lngLat)
          .addTo(map);
        
        newMarker.getElement().addEventListener('click', (e) => {
            e.stopPropagation();
            onMarkerClick(point);
        });
        
        markersRef.current[point.id] = newMarker;
      }
      
      const popup = popupsRef.current[point.id];
      if (popup) {
        const popupNode = document.createElement('div');
        ReactDOM.render(<MapPopupContent point={point} userLocation={userLocation} compact={compactPopup} />, popupNode);
        popup.setDOMContent(popupNode);
      }
    });
    
  }, [collectionPoints, selectedPoint, userLocation, compactPopup, onMarkerClick, isDark]);
  
  useEffect(() => {
    if (mapRef.current) {
        Object.values(popupsRef.current).forEach(p => p.isOpen() && p.remove());

        if (selectedPoint) {
            mapRef.current.flyTo({
                center: [selectedPoint.longitude, selectedPoint.latitude],
                zoom: mapRef.current.getZoom() < 15 ? 15 : mapRef.current.getZoom(),
                duration: 1200,
            });
            
            const popup = popupsRef.current[selectedPoint.id];
            if (popup) {
                setTimeout(() => popup.setLngLat([selectedPoint.longitude, selectedPoint.latitude]).addTo(mapRef.current!), 300);
            }
        }
    }
  }, [selectedPoint]);


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
        
        if (userMarkerRef.current) {
            userMarkerRef.current.setLngLat(lngLat);
        } else {
            const el = createUserMarkerElement();
            userMarkerRef.current = new Marker({ element: el, anchor: 'center' }).setLngLat(lngLat).addTo(map);
        }
    },
    getMap: () => mapRef.current,
  }));

  if (!MAPBOX_TOKEN) {
    return <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-800 rounded-xl">
        <p className="text-red-500 font-semibold text-center p-4">Token do Mapbox não fornecido. <br/> Por favor, crie um arquivo `.env` e adicione `VITE_MAPBOX_TOKEN="SUA_CHAVE_AQUI"`.</p>
    </div>
  }

  return (
    <div className="w-full h-full relative">
      <div ref={mapContainer} className="w-full h-full" />
      <style>{`
        .mapboxgl-popup-content {
          padding: 0;
          border-radius: 8px;
          background: transparent;
          box-shadow: none;
        }
        .mapboxgl-popup-tip {
            border-top-color: white !important;
        }
        .dark .mapboxgl-popup-tip {
            border-top-color: #1f2937 !important;
        }
        .user-location-dot {
          width: 20px;
          height: 20px;
          border: 3px solid #fff;
          border-radius: 50%;
          background-color: #1a73e8;
          box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.3);
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
