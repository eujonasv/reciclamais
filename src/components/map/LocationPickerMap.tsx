
import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import { LatLngTuple, Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useTheme } from "next-themes";

const markerIcon = new Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

function MapUpdater({ center }: { center: LatLngTuple }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, 17, { animate: true, duration: 1 });
  }, [center, map]);
  return null;
}

function DraggableMarker({ position, onLocationChange }: { position: LatLngTuple, onLocationChange: (lat: number, lng: number) => void }) {
    const markerRef = useRef<any>(null);

    const eventHandlers = React.useMemo(() => ({
        dragend() {
            const marker = markerRef.current;
            if (marker) {
                const { lat, lng } = marker.getLatLng();
                onLocationChange(lat, lng);
            }
        },
    }), [onLocationChange]);

    return (
        <Marker
            draggable={true}
            eventHandlers={eventHandlers}
            position={position}
            ref={markerRef}
            icon={markerIcon}
        />
    );
}

interface LocationPickerMapProps {
  location: LatLngTuple;
  onLocationChange: (lat: number, lng: number) => void;
}

const LocationPickerMap: React.FC<LocationPickerMapProps> = ({ location, onLocationChange }) => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const tileSets = {
    light: { url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', attribution: '&copy; OpenStreetMap contributors' },
    dark: { url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', attribution: '&copy; CARTO' }
  };
  const tileSet = isDark ? tileSets.dark : tileSets.light;

  return (
    <div className="w-full h-64 rounded-md overflow-hidden z-0 border">
      <MapContainer center={location} zoom={17} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
        <TileLayer url={tileSet.url} attribution={tileSet.attribution} />
        <DraggableMarker position={location} onLocationChange={onLocationChange} />
        <MapUpdater center={location} />
      </MapContainer>
    </div>
  );
};

export default LocationPickerMap;
