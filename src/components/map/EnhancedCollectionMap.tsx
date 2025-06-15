
import React, { useState, useRef, forwardRef, useImperativeHandle, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngTuple, Map as LeafletMap } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { CollectionPoint } from '@/types/collection-point';
import { useTheme } from "next-themes";
import { findClosestPoint } from '@/lib/map-utils';
import { defaultIcon, selectedIcon } from './map-icons';
import MapCenterUpdater from './MapCenterUpdater';
import UserLocationMarker from './UserLocationMarker';
import MapPopupContent from './MapPopupContent';

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

interface EnhancedCollectionMapProps {
  collectionPoints: CollectionPoint[];
  selectedPoint: CollectionPoint | null;
  onMarkerClick: (point: CollectionPoint) => void;
  compactPopup?: boolean;
}

export interface EnhancedCollectionMapRef {
  setViewFromExternal: (coordinates: [number, number]) => void;
  setUserLocation: (coordinates: LatLngTuple) => void;
  getMap: () => LeafletMap | null;
}

const EnhancedCollectionMap = forwardRef<EnhancedCollectionMapRef, EnhancedCollectionMapProps>(({
  collectionPoints,
  selectedPoint,
  onMarkerClick,
  compactPopup = false
}, ref) => {
  const [mapCenter, setMapCenter] = useState<[number, number]>([-25.59, -49.39]);
  const [userLocation, setUserLocation] = useState<LatLngTuple | null>(null);
  const [userLocationAccuracy, setUserLocationAccuracy] = useState<number>(0);
  const [closestPoint, setClosestPoint] = useState<CollectionPoint | null>(null);
  const mapInstanceRef = useRef<LeafletMap | null>(null);

  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const tileSet = isDark ? tileSets.dark : tileSets.light;

  useEffect(() => {
    if (selectedPoint) {
      setMapCenter([selectedPoint.latitude, selectedPoint.longitude]);
    } else if (collectionPoints.length > 0 && !userLocation) {
      // Only set to first point if no user location is set, to avoid jumping the map
      setMapCenter([collectionPoints[0].latitude, collectionPoints[0].longitude]);
    }
  }, [selectedPoint, collectionPoints, userLocation]);

  useImperativeHandle(ref, () => ({
    setViewFromExternal: (coordinates: [number, number]) => {
      setMapCenter(coordinates);
    },
    setUserLocation: (coordinates: LatLngTuple) => {
      setUserLocation(coordinates);
      setMapCenter([coordinates[0], coordinates[1]]);
      setUserLocationAccuracy(50); // Default accuracy
      
      const closest = findClosestPoint(coordinates, collectionPoints);
      setClosestPoint(closest);
    },
    getMap: () => mapInstanceRef.current,
  }));

  return (
    <div className="w-full h-full">
      <MapContainer
        center={mapCenter}
        zoom={14}
        scrollWheelZoom={true}
        className="z-0 w-full h-full"
        style={{ height: '100%', width: '100%' }}
        ref={mapInstanceRef}
      >
        <TileLayer
          attribution={tileSet.attribution}
          url={tileSet.url}
          key={isDark ? 'dark' : 'light'}
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
              <MapPopupContent point={point} userLocation={userLocation} compact={compactPopup} />
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

