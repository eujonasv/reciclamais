import React, { ReactNode, useState, useEffect, useMemo, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Instagram, ChevronUp, Lock } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import RecycleLogoWithText from "@/components/RecycleLogoWithText";
import { Button } from "@/components/ui/button";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
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
    
    const sections = ["inicio", "sobre", "como-funciona", "mapa", "educacao", "faq"];
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
      // On home page, activeSection will be managed by scroll
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
    text: "Início"
  }, {
    id: "sobre",
    text: "Sobre"
  }, {
    id: "como-funciona",
    text: "Como Funciona"
  }, {
    id: "mapa",
    text: "Mapa",
    isPage: true,
    path: "/mapa"
  }, {
    id: "educacao", 
    text: "Educação",
    isPage: true,
    path: "/educacao"
  }, {
    id: "faq",
    text: "FAQ"
  }, {
    id: "valores",
    text: "Diretrizes Estratégicas",
    isPage: true,
    path: "/valores"
  }], []);
  
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      <header className="sticky top-0 z-50 w-full bg-white dark:bg-gray-900 shadow-sm dark:shadow-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" onClick={() => scrollToSection("inicio")} className="flex items-center">
                <RecycleLogoWithText size="lg" />
              </Link>
            </div>

            <nav className="hidden md:flex items-center space-x-6">
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
                >
                  {text}
                </button>
              ))}
            </nav>

            <div className="flex items-center">
              <ThemeToggle />
              <button 
                className="ml-4 md:hidden rounded-md p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none" 
                onClick={toggleMenu} 
                aria-label="Menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"} bg-white dark:bg-gray-900 shadow-md`}>
          <nav className="container mx-auto px-4 py-3">
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
                  className={`py-2 px-3 rounded-md text-left ${
                    activeSection === id 
                      ? "bg-recicla-primary/10 text-recicla-primary dark:bg-recicla-primary/20 dark:text-recicla-secondary" 
                      : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  {text}
                </button>
              ))}
            </div>
          </nav>
        </div>
      </header>

      <main className="flex-grow" onClick={closeMenu}>
        {children}
      </main>

      <footer className="bg-gray-100 dark:bg-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <RecycleLogoWithText size="lg" />
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Conectando pessoas e empresas a pontos de coleta para um mundo mais sustentável.
              </p>
              <div className="flex space-x-4">
                <a 
                  href="https://www.instagram.com/reciclamais.br/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-recicla-primary dark:hover:text-recicla-secondary transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={20} />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Links Rápidos</h3>
              <ul className="space-y-2">
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
                      className="text-gray-600 dark:text-gray-300 hover:text-recicla-primary dark:hover:text-recicla-secondary transition-colors"
                    >
                      {text}
                    </button>
                  </li>
                ))}
                <li>
                  <Link to="/admin" className="flex items-center gap-1 text-gray-600 dark:text-gray-300 hover:text-recicla-primary dark:hover:text-recicla-secondary transition-colors">
                    <Lock size={16} />
                    <span>Área Administrativa</span>
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Contato</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-2">reciclamais25@gmail.com</p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-center text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} RECICLA+. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>

      <button 
        onClick={scrollToTop} 
        className={`fixed right-6 bottom-6 bg-recicla-primary hover:bg-recicla-accent dark:bg-recicla-secondary dark:hover:bg-recicla-primary text-white rounded-full p-2 shadow-lg transition-all duration-300 ${
          showScrollToTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        }`} 
        aria-label="Voltar ao topo"
      >
        <ChevronUp size={24} />
      </button>
    </div>
  );
};

export default MainLayout;
