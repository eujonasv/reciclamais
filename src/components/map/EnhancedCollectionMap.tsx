
import React, { useEffect, useState, useRef, forwardRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle, LayerGroup } from 'react-leaflet';
import { Icon, LatLngTuple } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { CollectionPoint } from '@/types/collection-point';
import { materialColors } from '@/types/collection-point';
import { useTheme } from "next-themes";
import { Button } from '@/components/ui/button';
import { MapPin, Navigation, Target } from 'lucide-react';

// Custom map center updater component
function MapCenterUpdater({ lat, lng, zoom }: { lat: number; lng: number; zoom?: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng], zoom || map.getZoom(), { animate: true, duration: 0.75 });
  }, [lat, lng, zoom, map]);
  return null;
}

// User Location Component
function UserLocationMarker({ position, accuracy }: { position: LatLngTuple | null; accuracy: number }) {
  const map = useMap();
  
  useEffect(() => {
    if (position) {
      map.flyTo(position, 15, { duration: 1.5 });
    }
  }, [position, map]);
  
  return position === null ? null : (
    <LayerGroup>
      <Circle
        center={position}
        radius={accuracy}
        pathOptions={{ fillColor: 'blue', fillOpacity: 0.1, color: 'blue', weight: 1 }}
      />
      <Circle 
        center={position}
        radius={8}
        pathOptions={{ fillColor: 'blue', fillOpacity: 0.8, color: 'white', weight: 2 }}
      />
    </LayerGroup>
  );
}

// Define map marker icon (azul claro)
const defaultIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  className: "marker-normal"
});

// Define selected marker icon (verde destaque)
const selectedIcon = new Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [30, 48],
  iconAnchor: [15, 48],
  popupAnchor: [1, -36],
  shadowSize: [41, 41],
  className: "marker-selected"
});

interface EnhancedCollectionMapProps {
  collectionPoints: CollectionPoint[];
  selectedPoint: CollectionPoint | null;
  onMarkerClick: (point: CollectionPoint) => void;
  showLocationButton?: boolean;
}

const EnhancedCollectionMap = forwardRef<any, EnhancedCollectionMapProps>(({
  collectionPoints,
  selectedPoint,
  onMarkerClick,
  showLocationButton = false
}, ref) => {
  // Responsividade do mapa
  const [mapCenter, setMapCenter] = useState<[number, number]>([-25.59, -49.39]);
  const [userLocation, setUserLocation] = useState<LatLngTuple | null>(null);
  const [userLocationAccuracy, setUserLocationAccuracy] = useState<number>(0);
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [closestPoint, setClosestPoint] = useState<CollectionPoint | null>(null);

  // Detectar dark mode (usando next-themes)
  const { resolvedTheme } = useTheme();

  // Tiles: OSM padrão para claro, CartoDB DarkMatter para escuro
  const tileSets = {
    light: {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    },
    dark: {
      url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
      attribution: '&copy; <a href="https://carto.com/attributions">CARTO</a> • OpenStreetMap'
    }
  };
  const isDark = resolvedTheme === "dark";
  const tileSet = isDark ? tileSets.dark : tileSets.light;

  useEffect(() => {
    if (selectedPoint) {
      setMapCenter([selectedPoint.latitude, selectedPoint.longitude]);
    } else if (collectionPoints.length > 0) {
      setMapCenter([collectionPoints[0].latitude, collectionPoints[0].longitude]);
    }
  }, [selectedPoint, collectionPoints]);

  const getMaterialColors = (materials: string[]) => {
    if (materials.length === 0) return '';
    const firstMaterial = materials[0];
    const colorClass = materialColors[firstMaterial] || '';
    return colorClass;
  };

  const getUserLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocalização não é suportada pelo seu navegador");
      return;
    }
    
    setIsLocating(true);
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        setUserLocation([latitude, longitude]);
        setUserLocationAccuracy(accuracy);
        setMapCenter([latitude, longitude]);
        setIsLocating(false);
        
        // Find closest collection point
        if (collectionPoints.length > 0) {
          const closest = findClosestPoint([latitude, longitude], collectionPoints);
          setClosestPoint(closest);
        }
      },
      (error) => {
        console.error("Erro ao obter localização:", error);
        setIsLocating(false);
        alert(`Não foi possível obter sua localização: ${error.message}`);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  // Calculate distance between two points using Haversine formula
  const calculateDistance = (point1: LatLngTuple, point2: [number, number]): number => {
    const R = 6371e3; // Earth radius in meters
    const φ1 = (point1[0] * Math.PI) / 180;
    const φ2 = (point2[0] * Math.PI) / 180;
    const Δφ = ((point2[0] - point1[0]) * Math.PI) / 180;
    const Δλ = ((point2[1] - point1[1]) * Math.PI) / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in meters
  };

  const findClosestPoint = (userLocation: LatLngTuple, points: CollectionPoint[]): CollectionPoint => {
    let closest = points[0];
    let minDistance = calculateDistance(userLocation, [points[0].latitude, points[0].longitude]);

    for (let i = 1; i < points.length; i++) {
      const distance = calculateDistance(userLocation, [points[i].latitude, points[i].longitude]);
      if (distance < minDistance) {
        minDistance = distance;
        closest = points[i];
      }
    }

    return closest;
  };

  // Expose method to parent component
  React.useImperativeHandle(ref, () => ({
    setViewFromExternal: (coordinates: [number, number]) => {
      setMapCenter(coordinates);
    }
  }));

  return (
    <div className="relative w-full h-full">
      <MapContainer
        center={mapCenter}
        zoom={14}
        scrollWheelZoom={true}
        className="z-0 w-full h-full"
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution={tileSet.attribution}
          url={tileSet.url}
        />

        <MapCenterUpdater lat={mapCenter[0]} lng={mapCenter[1]} />
        
        {userLocation && (
          <UserLocationMarker position={userLocation} accuracy={userLocationAccuracy} />
        )}

        {collectionPoints.map((point) => (
          <Marker
            key={point.id}
            position={[point.latitude, point.longitude]}
            icon={(selectedPoint?.id === point.id || closestPoint?.id === point.id) ? selectedIcon : defaultIcon}
            eventHandlers={{
              click: () => onMarkerClick(point),
            }}
          >
            <Popup className={`rounded-lg shadow-xl ${getMaterialColors(point.materials)}`}>
              <div>
                <h3 className="font-bold text-recicla-primary dark:text-recicla-secondary transition-colors">{point.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{point.description}</p>
                <p className="text-xs mt-1 text-gray-500 dark:text-gray-400">{point.address}</p>
                
                {userLocation && (
                  <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Distância aproximada: {(calculateDistance(userLocation, [point.latitude, point.longitude]) / 1000).toFixed(2)} km
                    </p>
                  </div>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Botão de localização - só aparece se showLocationButton for true */}
      {showLocationButton && (
        <div className="absolute top-4 right-4 z-10">
          <Button
            onClick={getUserLocation}
            disabled={isLocating}
            className="bg-white/90 dark:bg-gray-800/90 text-recicla-primary dark:text-recicla-secondary border border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800 shadow-lg backdrop-blur-sm"
            size="sm"
          >
            {isLocating ? (
              <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-recicla-primary dark:border-recicla-secondary"></div>
            ) : (
              <Navigation size={16} />
            )}
            {!isLocating && <span className="ml-2 hidden sm:inline">Minha Localização</span>}
          </Button>
        </div>
      )}
      
      <style>{`
        .leaflet-container {
          font-family: "Montserrat Variable", sans-serif;
        }
        .leaflet-popup-content-wrapper,
        .leaflet-popup-tip {
          background: rgba(255,255,255,0.95);
          color: #333;
        }
        .dark .leaflet-popup-content-wrapper,
        .dark .leaflet-popup-tip {
          background: rgba(34,34,34,0.98);
          color: #eee;
        }
        .marker-selected {
          filter: drop-shadow(0 0 8px #36e67a99);
          animation: pulse-green 1.6s cubic-bezier(0.4,0,0.6,1) infinite;
        }
        @keyframes pulse-green {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(46,204,113,0.5);
          }
          50% {
            box-shadow: 0 0 0 10px rgba(46,204,113,0);
          }
        }
      `}</style>
    </div>
  );
});

EnhancedCollectionMap.displayName = 'EnhancedCollectionMap';

export default EnhancedCollectionMap;
