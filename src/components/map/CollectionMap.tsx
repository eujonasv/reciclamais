
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { CollectionPoint } from '@/types/collection-point';
import { materialColors } from '@/types/collection-point';

// Custom map center updater component
function MapCenterUpdater({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  
  useEffect(() => {
    map.setView([lat, lng], map.getZoom());
  }, [lat, lng, map]);
  
  return null;
}

// Define map marker icon
const defaultIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Define selected marker icon (green version)
const selectedIcon = new Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
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
  // Default map center (will be adjusted based on points or selection)
  const [mapCenter, setMapCenter] = useState<[number, number]>([-25.59, -49.39]);
  
  // Update map center when selected point changes
  useEffect(() => {
    if (selectedPoint) {
      setMapCenter([selectedPoint.latitude, selectedPoint.longitude]);
    } else if (collectionPoints.length > 0) {
      // If no point is selected, center on the first point
      setMapCenter([collectionPoints[0].latitude, collectionPoints[0].longitude]);
    }
  }, [selectedPoint, collectionPoints]);

  // Get material colors for popup styling
  const getMaterialColors = (materials: string[]) => {
    if (materials.length === 0) return '';
    // Get the first material's color class for the popup
    const firstMaterial = materials[0];
    const colorClass = materialColors[firstMaterial] || '';
    return colorClass;
  };

  return (
    <div className="mt-8 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md overflow-hidden">
      <MapContainer 
        center={mapCenter}
        zoom={14} 
        scrollWheelZoom={true}
        style={{ height: "50vh", width: "100%" }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Dynamic map center updater */}
        <MapCenterUpdater lat={mapCenter[0]} lng={mapCenter[1]} />
        
        {/* Markers for collection points */}
        {collectionPoints.map((point) => (
          <Marker 
            key={point.id}
            position={[point.latitude, point.longitude]}
            icon={selectedPoint?.id === point.id ? selectedIcon : defaultIcon}
            eventHandlers={{
              click: () => onMarkerClick(point),
            }}
          >
            <Popup className={`${getMaterialColors(point.materials)}`}>
              <div>
                <h3 className="font-bold">{point.name}</h3>
                <p className="text-sm">{point.description}</p>
                <p className="text-xs mt-1">{point.address}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default CollectionMap;
