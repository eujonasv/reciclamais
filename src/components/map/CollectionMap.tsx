
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { CollectionPoint } from '@/types/collection-point';
import { materialColors } from '@/types/collection-point';
import { useTheme } from "next-themes";

// Custom map center updater component
function MapCenterUpdater({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng], map.getZoom(), { animate: true, duration: 0.75 });
  }, [lat, lng, map]);
  return null;
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

interface CollectionMapProps {
  collectionPoints: CollectionPoint[];
  selectedPoint: CollectionPoint | null;
  onMarkerClick: (point: CollectionPoint) => void;
}

const CollectionMap: React.FC<CollectionMapProps> = ({
  collectionPoints,
  selectedPoint,
  onMarkerClick
}) => {
  // Responsividade do mapa
  const [mapCenter, setMapCenter] = useState<[number, number]>([-25.59, -49.39]);

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

  // Responsividade personalizada
  // h-64 (mobile/sm), h-80 (md), h-96 (lg+)
  return (
    <div className="mt-8 rounded-xl overflow-hidden bg-white/70 dark:bg-gray-900/80 shadow-lg border border-gray-200 dark:border-gray-700 backdrop-blur-lg transition-colors duration-300">
      <MapContainer
        center={mapCenter}
        zoom={14}
        scrollWheelZoom={true}
        className="z-0 w-full"
        style={{
          height: '22rem',
          minHeight: '16rem',
          width: '100%',
          transition: 'background 0.3s',
        }}
        // Responsividade via Tailwind também:
        // Mobile: h-64 (256px), md: h-80 (320px), lg: h-96 (384px)
        // style acima para fallback e suavidade de animação
      >
        <TileLayer
          attribution={tileSet.attribution}
          url={tileSet.url}
        />

        <MapCenterUpdater lat={mapCenter[0]} lng={mapCenter[1]} />

        {collectionPoints.map((point) => (
          <Marker
            key={point.id}
            position={[point.latitude, point.longitude]}
            icon={selectedPoint?.id === point.id ? selectedIcon : defaultIcon}
            eventHandlers={{
              click: () => onMarkerClick(point),
            }}
          >
            <Popup className={`rounded-lg shadow-xl ${getMaterialColors(point.materials)}`}>
              <div>
                <h3 className="font-bold text-recicla-primary dark:text-recicla-secondary transition-colors">{point.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{point.description}</p>
                <p className="text-xs mt-1 text-gray-500 dark:text-gray-400">{point.address}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      <style>{`
        .leaflet-container {
          border-radius: 0.75rem !important;
          box-shadow: 0 4px 30px rgba(0,0,0,0.10);
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
};

export default CollectionMap;
