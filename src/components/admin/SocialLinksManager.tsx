
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Link, Trash, Plus } from 'lucide-react';
import { SocialLinkForm } from '@/components/admin/SocialLinkForm';
import { useSocialLinks } from '@/hooks/use-social-links';

interface SocialLink {
  id: string;
  name: string;
  url: string;
  icon: string;
}

const defaultSocialLinks: Partial<SocialLink>[] = [
  { name: 'Instagram', url: '', icon: 'instagram' },
  { name: 'Facebook', url: '', icon: 'facebook' },
  { name: 'Twitter', url: '', icon: 'twitter' },
  { name: 'LinkedIn', url: '', icon: 'linkedin' }
];

const SocialLinksManager = () => {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { refresh: refreshSiteLinks } = useSocialLinks();

  useEffect(() => {
    fetchSocialLinks();
  }, []);

  const fetchSocialLinks = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('social_links')
        .select('*')
        .order('name');

      if (error) throw error;

      // If no data, use default social media platforms
      if (!data || data.length === 0) {
        setSocialLinks(defaultSocialLinks.map(link => ({
          ...link,
          id: crypto.randomUUID()
        })) as SocialLink[]);
      } else {
        setSocialLinks(data as SocialLink[]);
      }
    } catch (error: any) {
      console.error('Error fetching social links:', error);
      toast({
        title: "Erro ao carregar links sociais",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      
      // First, delete all existing records from the table
      // Use a simpler method that won't cause UUID validation errors
      const { error: deleteError } = await supabase
        .from('social_links')
        .delete()
        .is('id', 'not.null'); // This will delete all records without UUID validation issues
      
      if (deleteError) throw deleteError;
      
      // Then insert all current links with their names and URLs
      if (socialLinks.length > 0) {
        const linksToInsert = socialLinks
          .filter(link => link.name && link.url) // Only insert links with both name and URL
          .map(link => ({
            name: link.name,
            url: link.url,
            icon: link.icon || link.name.toLowerCase()
          }));
          
        if (linksToInsert.length > 0) {
          const { error: insertError } = await supabase
            .from('social_links')
            .insert(linksToInsert);
  
          if (insertError) throw insertError;
        }
      }

      toast({
        title: "Links sociais salvos",
        description: "Os links foram atualizados com sucesso",
      });
      
      // Refresh links to get updated IDs and refresh site links 
      await fetchSocialLinks();
      await refreshSiteLinks();
      
    } catch (error: any) {
      console.error('Error saving social links:', error);
      toast({
        title: "Erro ao salvar links sociais",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const updateLink = (id: string, key: keyof SocialLink, value: string) => {
    setSocialLinks(links => 
      links.map(link => 
        link.id === id ? { ...link, [key]: value } : link
      )
    );
  };

  const addNewLink = () => {
    const newLink: SocialLink = {
      id: crypto.randomUUID(),
      name: '',
      url: '',
      icon: ''
    };
    setSocialLinks([...socialLinks, newLink]);
  };

  const removeLink = (id: string) => {
    setSocialLinks(links => links.filter(link => link.id !== id));
  };

  const validateLinks = () => {
    return socialLinks.every(link => link.name && link.url);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Links de Redes Sociais</CardTitle>
        <CardDescription>
          Gerencie os links das redes sociais que aparecerão no site
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-3">
            <div className="h-10 bg-gray-200 dark:bg-gray-800 animate-pulse rounded"></div>
            <div className="h-10 bg-gray-200 dark:bg-gray-800 animate-pulse rounded"></div>
            <div className="h-10 bg-gray-200 dark:bg-gray-800 animate-pulse rounded"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {socialLinks.map((link) => (
              <SocialLinkForm 
                key={link.id} 
                link={link} 
                updateLink={updateLink} 
                removeLink={removeLink}
              />
            ))}

            <Button 
              variant="outline" 
              className="w-full" 
              onClick={addNewLink}
            >
              <Plus size={16} className="mr-2" />
              Adicionar rede social
            </Button>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={handleSave} 
          disabled={saving || !validateLinks()}
        >
          {saving ? "Salvando..." : "Salvar alterações"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SocialLinksManager;
