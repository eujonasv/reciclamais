
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Link, Trash, Plus } from 'lucide-react';

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
      
      // Esta é a parte que está causando o erro - não podemos usar .gte('id', '0')
      // Vamos simplesmente excluir sem filtro, já que a tabela social_links 
      // serve apenas para esta funcionalidade
      const { error: deleteError } = await supabase
        .from('social_links')
        .delete()
        .neq('id', ''); // Este é um truque para excluir todos os registros
      
      if (deleteError) throw deleteError;
      
      // Então inserimos todos os links atuais
      if (socialLinks.length > 0) {
        const { error: insertError } = await supabase
          .from('social_links')
          .insert(
            socialLinks.map(link => ({
              name: link.name,
              url: link.url,
              icon: link.icon || link.name.toLowerCase()
            }))
          );

        if (insertError) throw insertError;
      }

      toast({
        title: "Links sociais salvos",
        description: "Os links foram atualizados com sucesso",
      });
      
      // Recarrega os links para obter os IDs atualizados do banco de dados
      fetchSocialLinks();
      
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
              <div key={link.id} className="flex items-center space-x-2">
                <div className="flex-1">
                  <Label htmlFor={`name-${link.id}`} className="sr-only">Nome</Label>
                  <Input
                    id={`name-${link.id}`}
                    placeholder="Nome (ex: Instagram)"
                    value={link.name}
                    onChange={(e) => updateLink(link.id, 'name', e.target.value)}
                  />
                </div>
                <div className="flex-[2]">
                  <Label htmlFor={`url-${link.id}`} className="sr-only">URL</Label>
                  <div className="flex rounded-md">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground">
                      <Link size={16} />
                    </span>
                    <Input
                      id={`url-${link.id}`}
                      className="rounded-l-none"
                      placeholder="https://..."
                      value={link.url}
                      onChange={(e) => updateLink(link.id, 'url', e.target.value)}
                    />
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => removeLink(link.id)}
                  className="flex-shrink-0"
                >
                  <Trash size={18} />
                  <span className="sr-only">Remover</span>
                </Button>
              </div>
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
