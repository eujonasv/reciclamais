
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

interface MapCenterUpdaterProps {
  lat: number;
  lng: number;
  zoom?: number;
}

const MapCenterUpdater = ({ lat, lng, zoom }: MapCenterUpdaterProps) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng], zoom || map.getZoom(), { animate: true, duration: 0.75 });
  }, [lat, lng, zoom, map]);
  return null;
}

export default MapCenterUpdater;

