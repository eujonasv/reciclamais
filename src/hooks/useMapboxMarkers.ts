
import { useRef, useCallback } from 'react';
import { Marker } from 'mapbox-gl';
import type { CollectionPoint } from '@/types/collection-point';
import { createMarkerElement, createUserMarkerElement } from '@/components/map/mapbox-utils';
import { LatLngTuple } from '@/lib/map-utils';

export const useMapboxMarkers = () => {
  const markersRef = useRef<{ [key: string]: Marker }>({});
  const userMarkerRef = useRef<Marker | null>(null);

  const createOrUpdateMarker = useCallback((
    point: CollectionPoint, 
    isSelected: boolean, 
    onMarkerClick: (point: CollectionPoint) => void,
    map: mapboxgl.Map
  ) => {
    const lngLat: [number, number] = [point.longitude, point.latitude];
    const markerColor = isSelected ? '#2ecc71' : '#3b82f6';
    const markerSize = isSelected ? 40 : 32;
    const markerElement = createMarkerElement(markerColor, markerSize, isSelected);

    if (markersRef.current[point.id]) {
      // Update existing marker
      markersRef.current[point.id].getElement().innerHTML = markerElement.innerHTML;
    } else {
      // Create new marker
      const newMarker = new Marker({ element: markerElement, anchor: 'bottom' })
        .setLngLat(lngLat)
        .addTo(map);
      
      // Add click event listener
      newMarker.getElement().addEventListener('click', (e) => {
        e.stopPropagation();
        onMarkerClick(point);
      });
      
      markersRef.current[point.id] = newMarker;
    }
  }, []);

  const removeMarker = useCallback((pointId: string) => {
    if (markersRef.current[pointId]) {
      markersRef.current[pointId].remove();
      delete markersRef.current[pointId];
    }
  }, []);

  const setUserLocation = useCallback((coordinates: LatLngTuple, map: mapboxgl.Map) => {
    const lngLat: [number, number] = [coordinates[1], coordinates[0]];
    
    if (userMarkerRef.current) {
      userMarkerRef.current.setLngLat(lngLat);
    } else {
      const el = createUserMarkerElement();
      userMarkerRef.current = new Marker({ element: el, anchor: 'center' }).setLngLat(lngLat).addTo(map);
    }
  }, []);

  return {
    markersRef,
    userMarkerRef,
    createOrUpdateMarker,
    removeMarker,
    setUserLocation
  };
};
