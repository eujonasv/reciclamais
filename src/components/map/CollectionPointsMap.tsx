// CollectionPointsMap.tsx
import React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import type { CollectionPoint } from "@/types/collection-point";

// Corrige os ícones padrão do Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

interface Props {
  points: CollectionPoint[];
  selectedPoint: CollectionPoint | null;
  onSelectPoint: (point: CollectionPoint) => void;
}

const ChangeMapView: React.FC<{ center: [number, number] }> = ({ center }) => {
  const map = useMap();
  map.setView(center, 13);
  return null;
};

const CollectionPointsMap: React.FC<Props> = ({ points, selectedPoint, onSelectPoint }) => {
  const center: [number, number] = selectedPoint
    ? [selectedPoint.latitude, selectedPoint.longitude]
    : points.length
    ? [points[0].latitude, points[0].longitude]
    : [-25.5, -49.3]; // Fallback: Paraná

  return (
    <div className="w-full h-64 rounded-lg overflow-hidden shadow mt-6">
      <MapContainer center={center} zoom={13} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ChangeMapView center={center} />
        {points.map((point) => (
          <Marker
            key={point.id}
            position={[point.latitude, point.longitude]}
            eventHandlers={{
              click: () => onSelectPoint(point),
            }}
          >
            <Popup>
              <strong>{point.name}</strong>
              <br />
              {point.address}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default CollectionPointsMap;
