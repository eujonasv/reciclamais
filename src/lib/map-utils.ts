
import type { CollectionPoint } from '@/types/collection-point';

// A latitude/longitude tuple: [lat, lng]
export type LatLngTuple = [number, number];

// Calculate distance between two points using Haversine formula
export const calculateDistance = (point1: LatLngTuple, point2: LatLngTuple): number => {
    const R = 6371e3; // Earth radius in meters
    const φ1 = (point1[0] * Math.PI) / 180;
    const φ2 = (point2[0] * Math.PI) / 180;
    const Δφ = ((point2[0] - point1[0]) * Math.PI) / 180;
    const Δλ = ((point2[1] - point1[1]) * Math.PI) / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in meters
};

export const findClosestPoint = (userLocation: LatLngTuple, points: CollectionPoint[]): CollectionPoint | null => {
    if (!points || points.length === 0) {
        return null;
    }

    let closest = points[0];
    let minDistance = calculateDistance(userLocation, [points[0].latitude, points[0].longitude]);

    for (let i = 1; i < points.length; i++) {
        const distance = calculateDistance(userLocation, [points[i].latitude, points[i].longitude]);
        if (distance < minDistance) {
            minDistance = distance;
            closest = points[i];
        }
    }

    return closest;
};
