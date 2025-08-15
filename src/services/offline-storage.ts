import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { CollectionPoint } from '@/types/collection-point';

interface OfflineDB extends DBSchema {
  collectionPoints: {
    key: string;
    value: CollectionPoint & { cachedAt: number };
  };
  userPreferences: {
    key: string;
    value: {
      key: string;
      searchTerm: string;
      activeFilter: string;
      lastSync: number;
    };
  };
  offlineQueue: {
    key: string;
    value: {
      id: string;
      operation: 'create' | 'update' | 'delete';
      data: any;
      timestamp: number;
    };
  };
}

class OfflineStorageService {
  private db: IDBPDatabase<OfflineDB> | null = null;
  private readonly DB_NAME = 'ReciclaOfflineDB';
  private readonly DB_VERSION = 1;

  async init() {
    if (this.db) return this.db;

    this.db = await openDB<OfflineDB>(this.DB_NAME, this.DB_VERSION, {
      upgrade(db) {
        // Collection points store
        if (!db.objectStoreNames.contains('collectionPoints')) {
          db.createObjectStore('collectionPoints', { keyPath: 'id' });
        }

        // User preferences store
        if (!db.objectStoreNames.contains('userPreferences')) {
          db.createObjectStore('userPreferences', { keyPath: 'key' });
        }

        // Offline queue for operations
        if (!db.objectStoreNames.contains('offlineQueue')) {
          db.createObjectStore('offlineQueue', { keyPath: 'id' });
        }
      },
    });

    return this.db;
  }

  // Collection Points Management
  async cacheCollectionPoints(points: CollectionPoint[]) {
    const db = await this.init();
    const tx = db.transaction('collectionPoints', 'readwrite');
    
    await Promise.all(
      points.map(point => 
        tx.store.put({ ...point, cachedAt: Date.now() })
      )
    );
    
    await tx.done;
  }

  async getCachedCollectionPoints(): Promise<CollectionPoint[]> {
    const db = await this.init();
    const cachedPoints = await db.getAll('collectionPoints');
    
    // Return points without the cachedAt timestamp
    return cachedPoints.map(({ cachedAt, ...point }) => point);
  }

  async getCachedPoint(id: string): Promise<CollectionPoint | null> {
    const db = await this.init();
    const cachedPoint = await db.get('collectionPoints', id);
    
    if (!cachedPoint) return null;
    
    const { cachedAt, ...point } = cachedPoint;
    return point;
  }

  async updateCachedPoint(point: CollectionPoint) {
    const db = await this.init();
    await db.put('collectionPoints', { ...point, cachedAt: Date.now() });
  }

  async deleteCachedPoint(id: string) {
    const db = await this.init();
    await db.delete('collectionPoints', id);
  }

  // User Preferences
  async saveUserPreferences(preferences: { searchTerm: string; activeFilter: string }) {
    const db = await this.init();
    await db.put('userPreferences', {
      key: 'current',
      ...preferences,
      lastSync: Date.now()
    });
  }

  async getUserPreferences() {
    const db = await this.init();
    const prefs = await db.get('userPreferences', 'current');
    return prefs || { searchTerm: '', activeFilter: '', lastSync: 0 };
  }

  // Offline Operations Queue
  async queueOperation(operation: 'create' | 'update' | 'delete', data: any) {
    const db = await this.init();
    const id = `${operation}_${Date.now()}_${Math.random()}`;
    
    await db.put('offlineQueue', {
      id,
      operation,
      data,
      timestamp: Date.now()
    });
  }

  async getQueuedOperations() {
    const db = await this.init();
    return await db.getAll('offlineQueue');
  }

  async clearQueuedOperation(id: string) {
    const db = await this.init();
    await db.delete('offlineQueue', id);
  }

  async clearAllQueued() {
    const db = await this.init();
    const tx = db.transaction('offlineQueue', 'readwrite');
    await tx.store.clear();
    await tx.done;
  }

  // Cache Management
  async getCacheSize(): Promise<number> {
    if (!navigator.storage || !navigator.storage.estimate) return 0;
    
    const estimate = await navigator.storage.estimate();
    return estimate.usage || 0;
  }

  async clearOldCache(maxAgeHours = 24) {
    const db = await this.init();
    const maxAge = Date.now() - (maxAgeHours * 60 * 60 * 1000);
    
    const tx = db.transaction('collectionPoints', 'readwrite');
    const cursor = await tx.store.openCursor();
    
    while (cursor) {
      if (cursor.value.cachedAt < maxAge) {
        await cursor.delete();
      }
      await cursor.continue();
    }
    
    await tx.done;
  }
}

export const offlineStorage = new OfflineStorageService();