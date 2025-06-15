
import { useRef, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { Popup } from 'mapbox-gl';
import type { CollectionPoint } from '@/types/collection-point';
import MapPopupContent from '@/components/map/MapPopupContent';
import { LatLngTuple } from '@/lib/map-utils';

export const useMapboxPopups = () => {
  const popupsRef = useRef<{ [key: string]: Popup }>({});

  const createPopup = useCallback((point: CollectionPoint) => {
    const popupNode = document.createElement('div');
    const popup = new Popup({ 
      offset: [0, -35], 
      closeButton: false, 
      className: 'recicla-mapbox-popup' 
    }).setDOMContent(popupNode);
    
    popupsRef.current[point.id] = popup;
    return popup;
  }, []);

  const updatePopupContent = useCallback((
    point: CollectionPoint, 
    userLocation: LatLngTuple | null, 
    compactPopup: boolean
  ) => {
    const popup = popupsRef.current[point.id];
    if (!popup) return;

    const popupNode = document.createElement('div');
    const root = (ReactDOM as any).createRoot ? (ReactDOM as any).createRoot(popupNode) : null;
    
    if (root) {
      root.render(<MapPopupContent point={point} userLocation={userLocation} compact={compactPopup} />);
    } else {
      ReactDOM.render(<MapPopupContent point={point} userLocation={userLocation} compact={compactPopup} />, popupNode);
    }
    popup.setDOMContent(popupNode);
  }, []);

  const removeAllPopups = useCallback(() => {
    Object.values(popupsRef.current).forEach(popup => {
      if (popup.isOpen()) {
        popup.remove();
      }
    });
  }, []);

  const removePopup = useCallback((pointId: string) => {
    if (popupsRef.current[pointId]) {
      if (popupsRef.current[pointId].isOpen()) {
        popupsRef.current[pointId].remove();
      }
      delete popupsRef.current[pointId];
    }
  }, []);

  const showPopup = useCallback((point: CollectionPoint, map: mapboxgl.Map) => {
    const popup = popupsRef.current[point.id];
    if (popup && map) {
      // Remove o popup se já estiver aberto antes de reabrir
      if (popup.isOpen()) {
        popup.remove();
      }
      popup.setLngLat([point.longitude, point.latitude]).addTo(map);
    }
  }, []);

  const hidePopup = useCallback((pointId: string) => {
    const popup = popupsRef.current[pointId];
    if (popup && popup.isOpen()) {
      popup.remove();
    }
  }, []);

  return {
    popupsRef,
    createPopup,
    updatePopupContent,
    removeAllPopups,
    removePopup,
    showPopup,
    hidePopup
  };
};
