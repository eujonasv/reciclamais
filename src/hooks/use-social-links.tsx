
import { useState, useEffect, useCallback } from 'react';
import { supabase } from "@/integrations/supabase/client";

// Define social media link structure
export type SocialMediaLink = {
  id: string;
  icon: string;
  href: string;
  label: string;
};

// Default social media links that will always be available
const defaultSocialLinks: SocialMediaLink[] = [
  { 
    id: "facebook", 
    icon: "facebook", 
    href: "https://facebook.com/reciclaplataforma", 
    label: "Facebook"
  },
  { 
    id: "instagram", 
    icon: "instagram", 
    href: "https://instagram.com/reciclaplataforma", 
    label: "Instagram" 
  },
  { 
    id: "x", 
    icon: "x", 
    href: "https://x.com/reciclaplataforma", 
    label: "X" 
  },
  { 
    id: "linkedin", 
    icon: "linkedin", 
    href: "https://linkedin.com/company/reciclaplataforma", 
    label: "LinkedIn" 
  }
];

export const useSocialLinks = () => {
  const [socialLinks, setSocialLinks] = useState<SocialMediaLink[]>(defaultSocialLinks);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch social links from the database
  const fetchSocialLinks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('social_links')
        .select('*')
        .order('name');

      if (error) throw error;

      // If we have data from the database, use it
      if (data && data.length > 0) {
        // Map database social links to the format expected by the layout
        const formattedLinks = data.map(link => ({
          id: link.id,
          icon: link.icon?.toLowerCase() || link.name.toLowerCase(),
          href: link.url,
          label: link.name
        }));

        setSocialLinks(formattedLinks);
      } else {
        // If no data, set to default links
        setSocialLinks(defaultSocialLinks);
      }
    } catch (err: any) {
      console.error('Error fetching social links:', err);
      setError(err.message);
      // Fallback to default links on error
      setSocialLinks(defaultSocialLinks);
    } finally {
      setLoading(false);
    }
  }, []);

  // Set up initial fetch and realtime subscription
  useEffect(() => {
    fetchSocialLinks();
    
    // Set up a realtime subscription for immediate updates
    const channel = supabase
      .channel('social-links-changes')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'social_links' 
      }, () => {
        console.log("Social links table changed, refreshing data");
        fetchSocialLinks();
      })
      .subscribe();
    
    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchSocialLinks]);

  return { socialLinks, loading, error, refresh: fetchSocialLinks };
};
