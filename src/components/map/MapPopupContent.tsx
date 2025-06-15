
import React from 'react';
import type { CollectionPoint } from '@/types/collection-point';
import { LatLngTuple, calculateDistance } from '@/lib/map-utils';
import { MapPin, Navigation } from 'lucide-react';
import { materialColors } from '@/types/collection-point';

interface MapPopupContentProps {
    point: CollectionPoint;
    userLocation: LatLngTuple | null;
    compact: boolean;
}

const MapPopupContent = ({ point, userLocation }: MapPopupContentProps) => {
    const distanceInKm = userLocation ? (calculateDistance(userLocation, [point.latitude, point.longitude]) / 1000).toFixed(2) : null;

    return (
        <div className="w-64 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-xl shadow-xl overflow-hidden">
            <div className="p-3">
                <h3 className="font-bold text-base text-gray-900 dark:text-white mb-1 truncate">{point.name}</h3>
                <div className="flex items-start gap-1.5 text-xs text-gray-500 dark:text-gray-400 mb-2">
                    <MapPin className="w-3 h-3 mt-0.5 flex-shrink-0" />
                    <span className="truncate">{point.address}</span>
                </div>
                {distanceInKm && (
                    <p className="text-xs text-gray-600 dark:text-gray-300 font-medium mb-2">
                        Aproximadamente {distanceInKm} km de distância
                    </p>
                )}
                {point.materials && point.materials.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 text-xs">
                        {point.materials.map((material) => (
                            <span
                                key={material}
                                className={`px-2 py-0.5 font-semibold rounded-full ${materialColors[material] || 'bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-gray-200'}`}
                            >
                                {material}
                            </span>
                        ))}
                    </div>
                )}
            </div>
            <div className="px-3 pb-3 pt-2 border-t border-black/10 dark:border-white/10 flex items-center gap-2">
                <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${point.latitude},${point.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Obter rotas no Google Maps"
                    className="flex-1 flex items-center justify-center gap-1.5 text-center text-xs px-2 py-1.5 rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors font-semibold"
                >
                    <div className="bg-white rounded-full p-0.5 flex items-center justify-center">
                        <img src="/lovable-uploads/googlemapslogo.png" alt="Google Maps" className="h-3 w-3" />
                    </div>
                    <span>Google Maps</span>
                </a>
                <a
                    href={`https://waze.com/ul?ll=${point.latitude},${point.longitude}&navigate=yes`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Obter rotas no Waze"
                    className="flex-1 flex items-center justify-center gap-1.5 text-center text-xs px-2 py-1.5 rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors font-semibold"
                >
                    <div className="bg-white rounded-full p-0.5 flex items-center justify-center">
                        <img src="/lovable-uploads/wazelogo.png" alt="Waze" className="h-3 w-3" />
                    </div>
                    <span>Waze</span>
                </a>
            </div>
        </div>
    );
};

export default MapPopupContent;
