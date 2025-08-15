import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { CollectionPoint } from '@/types/collection-point';
import { supabase } from '@/integrations/supabase/client';
import { collectionPointsService } from '@/services/collection-points-service';
import { useOffline } from '@/hooks/use-offline';
import { useToast } from '@/components/ui/use-toast';
import type { MapboxCollectionMapRef } from '@/components/map/MapboxCollectionMap';
import { findClosestPoint } from '@/lib/map-utils';
import type { LatLngTuple } from '@/lib/map-utils';

const POINTS_PER_PAGE = 3;

export const useMapSection = () => {
    const [collectionPoints, setCollectionPoints] = useState<CollectionPoint[]>([]);
    const [selectedPoint, setSelectedPoint] = useState<CollectionPoint | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [activeFilter, setActiveFilter] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [showMapMobile, setShowMapMobile] = useState(false);
    const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
    const [isLocating, setIsLocating] = useState(false);
    const { toast } = useToast();
    const { isOnline } = useOffline();
    const mapRef = useRef<MapboxCollectionMapRef | null>(null);

    useEffect(() => {
        const fetchPoints = async () => {
            setIsLoading(true);
            try {
                const points = await collectionPointsService.loadPoints();
                setCollectionPoints(points);
                
                if (!isOnline) {
                    toast({
                        title: "Modo Offline",
                        description: "Carregando dados em cache. Algumas informações podem estar desatualizadas.",
                    });
                }
            } catch (error) {
                console.error("Error fetching collection points:", error);
                toast({
                    title: "Erro ao carregar pontos de coleta",
                    description: "Tentando carregar dados em cache...",
                    variant: "destructive",
                });
            } finally {
                setIsLoading(false);
            }
        };

        fetchPoints();

        // Sync offline operations when back online
        if (isOnline) {
            collectionPointsService.syncOfflineOperations().catch(console.error);
        }

        // Only set up real-time subscription when online
        let channel: any = null;
        if (isOnline) {
            channel = supabase
                .channel('public:collection_points')
                .on('postgres_changes', {
                    event: '*',
                    schema: 'public',
                    table: 'collection_points'
                }, () => {
                    fetchPoints();
                })
                .subscribe();
        }

        return () => {
            if (channel) {
                supabase.removeChannel(channel);
            }
        };
    }, [toast, isOnline]);

    const filteredPoints = useMemo(() => collectionPoints.filter(point => {
        const matchesSearch = point.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            point.address.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesFilter = activeFilter.length === 0 ||
            point.materials.some(material => activeFilter.includes(material));
        
        return matchesSearch && matchesFilter;
    }), [collectionPoints, searchTerm, activeFilter]);

    const totalPages = useMemo(() => Math.ceil(filteredPoints.length / POINTS_PER_PAGE), [filteredPoints]);
    
    const paginatedPoints = useMemo(() => {
        const startIndex = (currentPage - 1) * POINTS_PER_PAGE;
        return filteredPoints.slice(startIndex, startIndex + POINTS_PER_PAGE);
    }, [filteredPoints, currentPage]);

    const allMaterials = useMemo(() => Array.from(
        new Set(collectionPoints.flatMap(point => point.materials))
    ).sort(), [collectionPoints]);

    const toggleFilter = useCallback((material: string) => {
        setActiveFilter(prev => {
            if (prev.includes(material)) {
                return prev.filter(m => m !== material);
            }
            return [...prev, material];
        });
        setCurrentPage(1);
    }, []);

    const clearFilters = useCallback(() => {
        setActiveFilter([]);
        setSearchTerm("");
        setCurrentPage(1);
    }, []);

    const handlePointSelect = useCallback((point: CollectionPoint) => {
        setSelectedPoint(current => current?.id === point.id ? null : point);
    }, []);

    const handlePageChange = useCallback((page: number) => {
        setCurrentPage(page);
        document.getElementById('mapa')?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    const getPageNumbers = useCallback(() => {
        let pages: (number | 'ellipsis')[] = [];
        if (totalPages <= 5) {
            pages = Array.from({ length: totalPages }, (_, i) => i + 1);
        } else {
            pages.push(1);
            if (currentPage > 3) pages.push('ellipsis');
            let start = Math.max(2, currentPage - 1);
            let end = Math.min(currentPage + 1, totalPages - 1);
            for (let i = start; i <= end; i++) pages.push(i);
            if (currentPage < totalPages - 2) pages.push('ellipsis');
            pages.push(totalPages);
        }
        return pages;
    }, [totalPages, currentPage]);

    const getUserLocation = useCallback(() => {
        if (!navigator.geolocation) {
            toast({
                title: "Geolocalização não suportada",
                description: "Seu navegador não suporta geolocalização",
                variant: "destructive",
            });
            return;
        }

        setIsLocating(true);

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude, accuracy } = position.coords;
                const location: LatLngTuple = [latitude, longitude];
                setUserLocation(location);

                if (mapRef.current?.setUserLocation) {
                    mapRef.current.setUserLocation(location, accuracy);
                }

                const closestPoint = findClosestPoint(location, collectionPoints);
                if (closestPoint) {
                    setSelectedPoint(closestPoint);
                    toast({
                        title: "Ponto mais próximo encontrado!",
                        description: `Exibindo o ponto de coleta mais perto de você: ${closestPoint.name}.`,
                    });
                } else {
                    toast({
                        title: "Localização encontrada",
                        description: "Sua localização foi marcada no mapa",
                    });
                }

                setIsLocating(false);
            },
            (error) => {
                console.error("Erro ao obter localização:", error);
                setIsLocating(false);
                toast({
                    title: "Erro ao obter localização",
                    description: `Não foi possível obter sua localização: ${error.message}`,
                    variant: "destructive",
                });
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
    }, [toast, mapRef, collectionPoints]);

    useEffect(() => {
        if (showMapMobile) {
            setTimeout(() => {
                mapRef.current?.getMap()?.resize();
            }, 310);
        }
    }, [showMapMobile, mapRef]);

    return {
        mapRef,
        isLoading,
        filteredPoints,
        paginatedPoints,
        allMaterials,
        selectedPoint,
        handlePointSelect,
        searchTerm,
        setSearchTerm,
        activeFilter,
        toggleFilter,
        clearFilters,
        showMapMobile,
        setShowMapMobile,
        isLocating,
        getUserLocation,
        totalPages,
        currentPage,
        handlePageChange,
        getPageNumbers,
    };
};
