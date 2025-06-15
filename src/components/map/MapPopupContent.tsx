
import React from 'react';
import type { CollectionPoint } from '@/types/collection-point';
import { LatLngTuple, calculateDistance } from '@/lib/map-utils';

interface MapPopupContentProps {
    point: CollectionPoint;
    userLocation: LatLngTuple | null;
    compact: boolean;
}

const MapPopupContent = ({ point, userLocation, compact }: MapPopupContentProps) => {
    const distanceInKm = userLocation ? (calculateDistance(userLocation, [point.latitude, point.longitude]) / 1000).toFixed(2) : null;

    if (compact) {
        return (
            <div className="p-1 w-56 bg-white dark:bg-gray-800 rounded-lg">
                <h3 className="font-bold text-sm text-recicla-primary dark:text-recicla-secondary mb-1">{point.name}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{point.address}</p>
                {distanceInKm && (
                    <p className="text-xs mt-1 text-gray-500 dark:text-gray-400">
                        Distância: ~{distanceInKm} km
                    </p>
                )}
                <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                    <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=${point.latitude},${point.longitude}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Obter rotas no Google Maps"
                        className="w-full inline-block text-center text-xs px-2 py-1.5 rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors font-medium"
                    >
                        Ver no mapa
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="p-2.5 w-64 bg-white dark:bg-gray-800 rounded-lg">
            <h3 className="font-bold text-base text-recicla-primary dark:text-recicla-secondary transition-colors mb-1.5">{point.name}</h3>
            {point.description && <p className="text-xs text-gray-600 dark:text-gray-300 mb-2 leading-snug">{point.description}</p>}
            <p className="text-xs mt-1 text-gray-500 dark:text-gray-400">{point.address}</p>
            
            {distanceInKm && (
                <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                        Distância: ~{distanceInKm} km
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
    );
};

export default MapPopupContent;
