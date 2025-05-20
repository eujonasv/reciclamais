
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastFetch, setLastFetch] = useState(0);

  // Use useCallback to ensure the function reference remains stable
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
        // Ensure icon names are normalized and lowercase for consistency
        const formattedLinks = data.map(link => ({
          id: link.id,
          icon: link.icon ? link.icon.toLowerCase() : link.name.toLowerCase(),
          href: link.url, // Use url from database as href
          label: link.name
        }));

        setSocialLinks(formattedLinks);
        console.log("Social links updated from database:", formattedLinks);
      } else {
        // If no data, set to default links
        setSocialLinks(defaultSocialLinks);
        console.log("No social links found in database, using defaults");
      }
      
      setLastFetch(Date.now()); // Update the fetch timestamp
    } catch (err: any) {
      console.error('Error fetching social links:', err);
      setError(err.message);
      // Default links are already set in useState, so we don't need to set them again
    } finally {
      setLoading(false);
    }
  }, []);

  // Listen for database changes with Supabase realtime
  useEffect(() => {
    fetchSocialLinks();
    
    // Set up a shorter polling interval to ensure fresh data
    const interval = setInterval(() => {
      fetchSocialLinks();
    }, 15000); // Check every 15 seconds
    
    // Also set up a realtime subscription for immediate updates
    const channel = supabase
      .channel('public:social_links')
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
      clearInterval(interval);
      supabase.removeChannel(channel);
    };
  }, [fetchSocialLinks]);

  return { socialLinks, loading, error, refresh: fetchSocialLinks };
};
