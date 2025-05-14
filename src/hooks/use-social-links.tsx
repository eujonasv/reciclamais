
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface SocialLink {
  id: string;
  name: string;
  url: string;
  icon: string;
}

export const useSocialLinks = () => {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchSocialLinks = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('social_links')
          .select('*')
          .order('name');
          
        if (error) throw error;
        
        setSocialLinks(data as SocialLink[] || []);
      } catch (err: any) {
        console.error('Error loading social links:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSocialLinks();
  }, []);

  return { socialLinks, loading, error };
};
