
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Link, Trash } from 'lucide-react';

interface SocialLink {
  id: string;
  name: string;
  url: string;
  icon: string;
}

interface SocialLinkFormProps {
  link: SocialLink;
  updateLink: (id: string, key: keyof SocialLink, value: string) => void;
  removeLink: (id: string) => void;
}

export const SocialLinkForm: React.FC<SocialLinkFormProps> = ({
  link,
  updateLink,
  removeLink
}) => {
  // Sugestão de placeholder baseada no nome da rede social
  const getPlaceholder = (name: string) => {
    const nameLower = name.toLowerCase();
    if (nameLower.includes('instagram')) return 'https://instagram.com/sua-conta';
    if (nameLower.includes('facebook')) return 'https://facebook.com/sua-pagina';
    if (nameLower.includes('x') || nameLower.includes('twitter')) return 'https://x.com/sua-conta';
    if (nameLower.includes('linkedin')) return 'https://linkedin.com/company/sua-empresa';
    return 'https://...';
  };

  return (
    <div className="flex items-center space-x-2">
      <div className="flex-1">
        <Label htmlFor={`name-${link.id}`} className="sr-only">Nome</Label>
        <Input
          id={`name-${link.id}`}
          placeholder="Nome (ex: Instagram)"
          value={link.name}
          onChange={(e) => {
            updateLink(link.id, 'name', e.target.value);
            // Atualizar o ícone automaticamente se estiver vazio
            if (!link.icon) {
              const iconName = e.target.value.toLowerCase();
              updateLink(link.id, 'icon', iconName);
            }
          }}
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
            placeholder={getPlaceholder(link.name)}
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
  );
};
