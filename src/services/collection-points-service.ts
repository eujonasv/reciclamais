
import { supabase } from "@/integrations/supabase/client";
import { CollectionPoint } from '@/types/collection-point';

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
      materials: point.materials?.split(',').map((m: string) => m.trim()) || []
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

  async swapPointsOrder(updates: any[]): Promise<void> {
    const { error } = await supabase
      .from('collection_points')
      .upsert(updates);
    
    if (error) {
      throw error;
    }
  }
};
