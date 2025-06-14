
import React from "react";
import { Languages } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

export function LanguageToggle() {
  const { language, setLanguage, translations } = useLanguage();

  const languages = [
    { code: 'pt' as const, name: translations['language.portuguese'] || 'Português', flag: '🇧🇷' },
    { code: 'en' as const, name: translations['language.english'] || 'English', flag: '🇺🇸' },
    { code: 'es' as const, name: translations['language.spanish'] || 'Español', flag: '🇪🇸' },
  ];

  const currentLanguage = languages.find(lang => lang.code === language);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full bg-white dark:bg-gray-800">
          <Languages className="h-5 w-5" />
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white dark:bg-gray-800">
        {languages.map((lang) => (
          <DropdownMenuItem 
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`cursor-pointer ${language === lang.code ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
          >
            <span className="mr-2">{lang.flag}</span>
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
