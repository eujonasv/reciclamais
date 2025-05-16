
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";

// Define social media link structure
export type SocialMediaLink = {
  id: string;
  icon: string;
  href: string;
  label: string;
};

export const useSocialLinks = () => {
  const [socialLinks, setSocialLinks] = useState<SocialMediaLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSocialLinks = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('social_links')
        .select('*')
        .order('name');

      if (error) throw error;

      // Map database social links to the format expected by the layout
      const formattedLinks = (data || []).map(link => ({
        id: link.id,
        icon: link.icon.toLowerCase(),
        href: link.url, // Use url from database as href
        label: link.name
      }));

      setSocialLinks(formattedLinks);
    } catch (err: any) {
      console.error('Error fetching social links:', err);
      setError(err.message);
      // Return default links on error
      setSocialLinks([
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
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSocialLinks();
  }, []);

  return { socialLinks, loading, error, refresh: fetchSocialLinks };
};
