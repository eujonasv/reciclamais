import { supabase } from "@/integrations/supabase/client";
import { CollectionPoint } from '@/types/collection-point';
import { offlineStorage } from './offline-storage';

const parseOpeningHours = (description: string | null) => {
  const defaultHours = {
    monday: { enabled: false, openTime: '', closeTime: '' },
    tuesday: { enabled: false, openTime: '', closeTime: '' },
    wednesday: { enabled: false, openTime: '', closeTime: '' },
    thursday: { enabled: false, openTime: '', closeTime: '' },
    friday: { enabled: false, openTime: '', closeTime: '' },
    saturday: { enabled: false, openTime: '', closeTime: '' },
    sunday: { enabled: false, openTime: '', closeTime: '' },
  };
  
  if (!description) return defaultHours;
  
  try {
    const parsed = JSON.parse(description);
    if (typeof parsed === 'object' && parsed.monday !== undefined) {
      return parsed;
    }
    return defaultHours;
  } catch (error) {
    return defaultHours;
  }
};

const isOnline = () => navigator.onLine;

export const collectionPointsService = {
  async loadPoints(): Promise<CollectionPoint[]> {
    try {
      if (isOnline()) {
        const { data, error } = await supabase
          .from("collection_points")
          .select("*")
          .order('display_order', { ascending: true });
        
        if (error) {
          throw error;
        }
        
        const points = data.map((point) => ({
          ...point,
          materials: point.materials?.split(',').map((m: string) => m.trim()) || [],
          openingHours: parseOpeningHours(point.description)
        })) as CollectionPoint[];
        
        // Cache points for offline use
        await offlineStorage.cacheCollectionPoints(points);
        return points;
      } else {
        // Load from cache when offline
        return await offlineStorage.getCachedCollectionPoints();
      }
    } catch (error) {
      // Fallback to cache if online request fails
      console.warn('Failed to load points online, falling back to cache:', error);
      return await offlineStorage.getCachedCollectionPoints();
    }
  },

  async deletePoint(id: string): Promise<void> {
    if (isOnline()) {
      const { error } = await supabase
        .from("collection_points")
        .delete()
        .eq("id", id);
      
      if (error) {
        throw error;
      }
      
      // Remove from cache
      await offlineStorage.deleteCachedPoint(id);
    } else {
      // Queue for deletion when back online
      await offlineStorage.queueOperation('delete', { id });
      await offlineStorage.deleteCachedPoint(id);
    }
  },

  async createPoint(payload: any): Promise<void> {
    if (isOnline()) {
      const { error } = await supabase
        .from("collection_points")
        .insert(payload);
      
      if (error) {
        throw error;
      }
    } else {
      // Queue for creation when back online
      await offlineStorage.queueOperation('create', payload);
      
      // Add to local cache with temporary ID
      const tempPoint = {
        ...payload,
        id: `temp_${Date.now()}`,
        materials: payload.materials?.split(',').map((m: string) => m.trim()) || [],
        openingHours: parseOpeningHours(payload.description)
      };
      await offlineStorage.updateCachedPoint(tempPoint);
    }
  },

  async updatePoint(id: string, payload: any): Promise<void> {
    if (isOnline()) {
      const { error } = await supabase
        .from("collection_points")
        .update(payload)
        .eq("id", id);
      
      if (error) {
        throw error;
      }
      
      // Update cache
      const updatedPoint = {
        ...payload,
        id,
        materials: payload.materials?.split(',').map((m: string) => m.trim()) || [],
        openingHours: parseOpeningHours(payload.description)
      };
      await offlineStorage.updateCachedPoint(updatedPoint);
    } else {
      // Queue for update when back online
      await offlineStorage.queueOperation('update', { id, ...payload });
      
      // Update local cache
      const updatedPoint = {
        ...payload,
        id,
        materials: payload.materials?.split(',').map((m: string) => m.trim()) || [],
        openingHours: parseOpeningHours(payload.description)
      };
      await offlineStorage.updateCachedPoint(updatedPoint);
    }
  },

  async updateAllPointsOrder(updates: any[]): Promise<void> {
    if (isOnline()) {
      const { error } = await supabase
        .from('collection_points')
        .upsert(updates);
      
      if (error) {
        throw error;
      }
      
      // Update cache for each point
      for (const update of updates) {
        const existingPoint = await offlineStorage.getCachedPoint(update.id);
        if (existingPoint) {
          await offlineStorage.updateCachedPoint({ ...existingPoint, ...update });
        }
      }
    } else {
      // Queue for update when back online
      await offlineStorage.queueOperation('update', { bulkOrderUpdate: updates });
      
      // Update local cache
      for (const update of updates) {
        const existingPoint = await offlineStorage.getCachedPoint(update.id);
        if (existingPoint) {
          await offlineStorage.updateCachedPoint({ ...existingPoint, ...update });
        }
      }
    }
  },

  // New method for syncing queued operations when back online
  async syncOfflineOperations(): Promise<void> {
    if (!isOnline()) return;
    
    const queuedOps = await offlineStorage.getQueuedOperations();
    
    for (const op of queuedOps) {
      try {
        switch (op.operation) {
          case 'create':
            await supabase.from("collection_points").insert(op.data);
            break;
          case 'update':
            if (op.data.bulkOrderUpdate) {
              await supabase.from('collection_points').upsert(op.data.bulkOrderUpdate);
            } else {
              const { id, ...updateData } = op.data;
              await supabase.from("collection_points").update(updateData).eq("id", id);
            }
            break;
          case 'delete':
            await supabase.from("collection_points").delete().eq("id", op.data.id);
            break;
        }
        
        // Remove from queue after successful sync
        await offlineStorage.clearQueuedOperation(op.id);
      } catch (error) {
        console.error(`Failed to sync operation ${op.id}:`, error);
      }
    }
  }
};