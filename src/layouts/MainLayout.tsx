import React, { ReactNode, useState, useEffect, useMemo, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { Menu, X, Instagram, ChevronUp, Lock, Mail } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LanguageSelector } from '@/components/ui/language-selector';
import { SkipLink } from '@/components/accessibility/SkipLink';
import RecycleLogoWithText from "@/components/RecycleLogoWithText";
import { Button } from "@/components/ui/button";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("inicio");
  const [showScrollToTop, setShowScrollToTop] = useState<boolean>(false);
  
  const toggleMenu = useCallback(() => setIsMenuOpen(!isMenuOpen), [isMenuOpen]);
  const closeMenu = useCallback(() => isMenuOpen && setIsMenuOpen(false), [isMenuOpen]);
  
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth"
      });
      setActiveSection(sectionId);
      closeMenu();
    }
  }, [closeMenu]);
  
  const navigateToPage = useCallback((path: string) => {
    navigate(path);
    closeMenu();
  }, [navigate, closeMenu]);
  
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    setShowScrollToTop(scrollY > 500);
    
    if (!isHome) return;
    
    const sections = ["inicio", "sobre", "como-funciona", "mapa-cta", "educacao", "faq"];
    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const {
          top,
          bottom
        } = element.getBoundingClientRect();
        if (top <= 150 && top > -100 || top <= 150 && bottom > 150) {
          setActiveSection(section);
          break;
        }
      }
    }
  }, [isHome]);
  
  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, []);

  // Set active section based on current route
  useEffect(() => {
    if (location.pathname === "/") {
      const hash = window.location.hash;
      if (hash) {
        const sectionId = hash.replace("#", "");
        setActiveSection(sectionId);
      } else {
        setActiveSection("inicio");
      }
    } else if (location.pathname === "/mapa") {
      setActiveSection("mapa");
    } else if (location.pathname === "/educacao") {
      setActiveSection("educacao");
    } else if (location.pathname === "/valores") {
      setActiveSection("valores");
    } else {
      setActiveSection("");
    }
  }, [location.pathname]);

  // Scroll based on URL hash when entering Home
  useEffect(() => {
    const hash = window.location.hash;
    if (isHome && hash) {
      const sectionId = hash.replace("#", "");
      const element = document.getElementById(sectionId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({
            behavior: "smooth"
          });
        }, 300);
      }
    }
  }, [isHome]);

  // Enable scroll listener only on home
  useEffect(() => {
    if (!isHome) return;
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome, handleScroll]);

  const navLinks = useMemo(() => [{
    id: "inicio",
    text: t('navigation.home')
  }, {
    id: "sobre",
    text: "Sobre"
  }, {
    id: "como-funciona",
    text: "Como Funciona"
  }, {
    id: "mapa",
    text: t('navigation.map'),
    isPage: true,
    path: "/mapa"
  }, {
    id: "educacao", 
    text: t('navigation.education'),
    isPage: true,
    path: "/educacao"
  }, {
    id: "faq",
    text: "FAQ"
  }, {
    id: "valores",
    text: t('navigation.values'),
    isPage: true,
    path: "/valores"
  }], [t]);
  
  return (
    <>
      <SkipLink />
      <div className="min-h-screen flex flex-col bg-background">
        <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <Link 
                  to="/" 
                  onClick={() => scrollToSection("inicio")} 
                  className="flex items-center transition-transform hover:scale-105"
                >
                  <RecycleLogoWithText size="lg" />
                </Link>
              </div>

              <nav className="hidden md:flex items-center space-x-6" role="navigation">
                {navLinks.map(({id, text, isPage, path}) => (
                  <button 
                    key={id} 
                    onClick={() => {
                      if (isPage) {
                        navigateToPage(path!);
                      } else {
                        if (isHome) {
                          scrollToSection(id);
                        } else {
                          navigate(`/#${id}`);
                        }
                      }
                    }} 
                    className={`nav-link ${activeSection === id ? "active-nav-link" : ""}`}
                    aria-current={activeSection === id ? 'page' : undefined}
                  >
                    {text}
                  </button>
                ))}
              </nav>

              <div className="hidden md:flex items-center space-x-2">
                <LanguageSelector />
                <ThemeToggle />
              </div>

              <div className="md:hidden flex items-center space-x-2">
                <LanguageSelector />
                <ThemeToggle />
                <button 
                  className="rounded-md p-2 hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring" 
                  onClick={toggleMenu} 
                  aria-label={isMenuOpen ? t('accessibility.closeMenu') : t('accessibility.openMenu')}
                  aria-expanded={isMenuOpen}
                  aria-controls="mobile-menu"
                >
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </div>

          {isMenuOpen && (
            <div id="mobile-menu" className="md:hidden bg-background border-t">
              <nav className="container mx-auto px-4 py-3" role="navigation">
                <div className="flex flex-col space-y-3">
                  {navLinks.map(({id, text, isPage, path}) => (
                    <button 
                      key={id} 
                      onClick={() => {
                        if (isPage) {
                          navigateToPage(path!);
                        } else {
                          if (isHome) {
                            scrollToSection(id);
                          } else {
                            navigate(`/#${id}`);
                          }
                        }
                      }} 
                      className={`py-2 px-3 rounded-md text-left transition-colors ${
                        activeSection === id 
                          ? "bg-accent text-accent-foreground" 
                          : "hover:bg-accent hover:text-accent-foreground"
                      }`}
                      aria-current={activeSection === id ? 'page' : undefined}
                    >
                      {text}
                    </button>
                  ))}
                </div>
              </nav>
            </div>
          )}
        </header>

        <main id="main-content" className="flex-grow" onClick={closeMenu}>
          {children}
        </main>

        <footer className="bg-muted/50 border-t">
          <div className="container mx-auto px-4 py-12 md:py-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
              <div className="sm:col-span-2 lg:col-span-2">
                <Link to="/" onClick={() => scrollToSection("inicio")} className="inline-block mb-4">
                  <div className="origin-left">
                    <RecycleLogoWithText size="lg" />
                  </div>
                </Link>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {t('about.subtitle')}
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold mb-4 uppercase tracking-wider">{t('navigation.home')}</h3>
                <ul className="space-y-3">
                  {navLinks.map(({id, text, isPage, path}) => (
                    <li key={id}>
                      <button
                        onClick={() => {
                          if (isPage) {
                            navigateToPage(path!);
                          } else if (isHome) {
                            scrollToSection(id);
                          } else {
                            navigate(`/#${id}`);
                          }
                        }}
                        className="text-muted-foreground hover:text-primary transition-colors text-sm"
                      >
                        {text}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-base font-semibold mb-4 uppercase tracking-wider">{t('common.settings')}</h3>
                <ul className="space-y-3">
                  <li>
                    <Link to="/politica-de-privacidade" className="text-muted-foreground hover:text-primary transition-colors text-sm">{t('navigation.privacy')}</Link>
                  </li>
                  <li>
                    <Link to="/termos-de-servico" className="text-muted-foreground hover:text-primary transition-colors text-sm">{t('navigation.terms')}</Link>
                  </li>
                  <li>
                    <Link to="/admin" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm">
                      <Lock size={14} />
                      <span>{t('navigation.admin')}</span>
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-base font-semibold mb-4 uppercase tracking-wider">Contato</h3>
                <ul className="space-y-3">
                  <li>
                    <a href="mailto:reciclamais25@gmail.com" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm">
                      <Mail size={16} />
                      <span>reciclamais25@gmail.com</span>
                    </a>
                  </li>
                </ul>
                <div className="flex space-x-3 mt-6">
                  <a 
                    href="https://www.instagram.com/reciclamais.br/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 bg-muted hover:bg-accent rounded-full transition-all duration-300"
                    aria-label="Instagram"
                  >
                    <Instagram size={20} />
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-8 mt-8 border-t flex flex-col sm:flex-row justify-between items-center">
              <p className="text-sm text-muted-foreground text-center sm:text-left mb-4 sm:mb-0">
                © {new Date().getFullYear()} RECICLA+. Todos os direitos reservados.
              </p>
            </div>
          </div>
        </footer>

        <button 
          onClick={scrollToTop} 
          className={`fixed left-6 bottom-6 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full p-2 shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-ring ${
            showScrollToTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
          }`} 
          aria-label={t('accessibility.skipToContent')}
        >
          <ChevronUp size={24} />
        </button>
      </div>
    </>
  );
};

export default MainLayout;