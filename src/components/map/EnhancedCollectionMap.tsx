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

// Helper to create custom SVG icons for map markers
const createSvgIcon = (color: string) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="${color}" stroke="white" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3" fill="white" stroke="${color}"/></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};

// Define map marker icon
const defaultIcon = new Icon({
  iconUrl: createSvgIcon('#3b82f6'), // blue-500
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  shadowSize: [41, 41],
});

// Define selected marker icon
const selectedIcon = new Icon({
  iconUrl: createSvgIcon('#2ecc71'), // recicla-primary
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  shadowSize: [41, 41],
  className: "marker-selected"
});

interface EnhancedCollectionMapProps {
  collectionPoints: CollectionPoint[];
  selectedPoint: CollectionPoint | null;
  onMarkerClick: (point: CollectionPoint) => void;
}

const EnhancedCollectionMap = forwardRef<any, EnhancedCollectionMapProps>(({
  collectionPoints,
  selectedPoint,
  onMarkerClick
}, ref) => {
  // Responsividade do mapa
  const [mapCenter, setMapCenter] = useState<[number, number]>([-25.59, -49.39]);
  const [userLocation, setUserLocation] = useState<LatLngTuple | null>(null);
  const [userLocationAccuracy, setUserLocationAccuracy] = useState<number>(0);
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
    },
    setUserLocation: (coordinates: LatLngTuple) => {
      setUserLocation(coordinates);
      setMapCenter([coordinates[0], coordinates[1]]);
      setUserLocationAccuracy(50); // Default accuracy
      
      // Find closest collection point
      if (collectionPoints.length > 0) {
        const closest = findClosestPoint(coordinates, collectionPoints);
        setClosestPoint(closest);
      }
    }
  }));

  return (
    <div className="w-full h-full">
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
            <Popup className="recicla-popup">
              <div className="p-2.5 w-64">
                <h3 className="font-bold text-base text-recicla-primary dark:text-recicla-secondary transition-colors mb-1.5">{point.name}</h3>
                {point.description && <p className="text-xs text-gray-600 dark:text-gray-300 mb-2 leading-snug">{point.description}</p>}
                <p className="text-xs mt-1 text-gray-500 dark:text-gray-400">{point.address}</p>
                
                {userLocation && (
                  <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Distância: ~{(calculateDistance(userLocation, [point.latitude, point.longitude]) / 1000).toFixed(2)} km
                    </p>
                  </div>
                )}
                 <div className="mt-3 pt-2.5 border-t border-gray-200 dark:border-gray-700 flex items-center gap-2">
                   <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${point.latitude},${point.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Obter rotas no Google Maps"
                      className="flex-1 text-center text-xs px-2 py-1.5 rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors font-medium"
                    >
                      Google Maps
                    </a>
                    <a
                      href={`https://waze.com/ul?ll=${point.latitude},${point.longitude}&navigate=yes`}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Obter rotas no Waze"
                      className="flex-1 text-center text-xs px-2 py-1.5 rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors font-medium"
                    >
                      Waze
                    </a>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      
      <style>{`
        .leaflet-container {
          font-family: "Montserrat Variable", sans-serif;
        }
        .marker-selected .leaflet-marker-icon {
          animation: pulse-marker 1.8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse-marker {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }
      `}</style>
    </div>
  );
});

EnhancedCollectionMap.displayName = 'EnhancedCollectionMap';

export default EnhancedCollectionMap;
