import { supabase } from "@/integrations/supabase/client";
import { CollectionPoint } from '@/types/collection-point';

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

export const collectionPointsService = {
  async loadPoints(): Promise<CollectionPoint[]> {
    const { data, error } = await supabase
      .from("collection_points")
      .select("*")
      .order('display_order', { ascending: true });
    
    if (error) {
      throw error;
    }
    
    return data.map((point) => ({
      ...point,
      materials: point.materials?.split(',').map((m: string) => m.trim()) || [],
      openingHours: parseOpeningHours(point.description)
    })) as CollectionPoint[];
  },

  async deletePoint(id: string): Promise<void> {
    const { error } = await supabase
      .from("collection_points")
      .delete()
      .eq("id", id);
    
    if (error) {
      throw error;
    }
  },

  async createPoint(payload: any): Promise<void> {
    const { error } = await supabase
      .from("collection_points")
      .insert(payload);
    
    if (error) {
      throw error;
    }
  },

  async updatePoint(id: string, payload: any): Promise<void> {
    const { error } = await supabase
      .from("collection_points")
      .update(payload)
      .eq("id", id);
    
    if (error) {
      throw error;
    }
  },

  async updateAllPointsOrder(updates: any[]): Promise<void> {
    const { error } = await supabase
      .from('collection_points')
      .upsert(updates);
    
    if (error) {
      throw error;
    }
  }
};