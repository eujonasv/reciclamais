
import { useEffect } from 'react';
import { useMap, Circle, LayerGroup } from 'react-leaflet';
import type { LatLngTuple } from 'leaflet';

interface UserLocationMarkerProps {
  position: LatLngTuple | null;
  accuracy: number;
}

const UserLocationMarker = ({ position, accuracy }: UserLocationMarkerProps) => {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.flyTo(position, 15, { duration: 1.5 });
    }
  }, [position, map]);

  if (!position) return null;

  return (
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
};

export default UserLocationMarker;

