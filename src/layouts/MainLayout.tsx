
import { ReactNode, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Facebook, Instagram, Twitter, Linkedin, ChevronUp } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import RecycleLogoWithText from "@/components/RecycleLogoWithText";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("inicio");
  const [showScrollToTop, setShowScrollToTop] = useState<boolean>(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const closeMenu = () => {
    if (isMenuOpen) setIsMenuOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      closeMenu();
    }
  };

  const handleScroll = () => {
    const scrollY = window.scrollY;
    
    // Check if we should show the scroll to top button
    setShowScrollToTop(scrollY > 500);
    
    // Update active section based on scroll position
    const sections = ['inicio', 'sobre', 'como-funciona', 'faq', 'mapa'];
    
    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const { top, bottom } = element.getBoundingClientRect();
        // Consider a section active if its top is near the viewport top
        // or if we're inside the section
        if ((top <= 150 && top > -100) || (top <= 150 && bottom > 150)) {
          setActiveSection(section);
          break;
        }
      }
    }
  };
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { id: "inicio", text: "Início" },
    { id: "sobre", text: "Sobre" },
    { id: "como-funciona", text: "Como Funciona" },
    { id: "faq", text: "FAQ" },
    { id: "mapa", text: "Mapa" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-white dark:bg-gray-900 shadow-sm dark:shadow-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link 
                to="/" 
                onClick={() => scrollToSection('inicio')}
                className="flex items-center"
              >
                <RecycleLogoWithText />
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              {navLinks.map(({ id, text }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`nav-link ${activeSection === id ? 'active-nav-link' : ''}`}
                >
                  {text}
                </button>
              ))}
            </nav>
            
            {/* Theme Toggle */}
            <div className="flex items-center">
              <ThemeToggle />
              
              {/* Mobile Menu Button */}
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
        
        {/* Mobile Navigation */}
        <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} bg-white dark:bg-gray-900 shadow-md`}>
          <nav className="container mx-auto px-4 py-3">
            <div className="flex flex-col space-y-3">
              {navLinks.map(({ id, text }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`py-2 px-3 rounded-md text-left ${
                    activeSection === id
                      ? 'bg-recicla-primary/10 text-recicla-primary dark:bg-recicla-primary/20 dark:text-recicla-secondary'
                      : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  {text}
                </button>
              ))}
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow" onClick={closeMenu}>
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* About */}
            <div>
              <div className="flex items-center mb-4">
                <RecycleLogoWithText />
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Conectando pessoas e empresas a pontos de coleta para um mundo mais sustentável.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-500 hover:text-recicla-primary dark:hover:text-recicla-secondary transition-colors">
                  <Facebook size={20} />
                </a>
                <a href="#" className="text-gray-500 hover:text-recicla-primary dark:hover:text-recicla-secondary transition-colors">
                  <Instagram size={20} />
                </a>
                <a href="#" className="text-gray-500 hover:text-recicla-primary dark:hover:text-recicla-secondary transition-colors">
                  <Twitter size={20} />
                </a>
                <a href="#" className="text-gray-500 hover:text-recicla-primary dark:hover:text-recicla-secondary transition-colors">
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Links Rápidos</h3>
              <ul className="space-y-2">
                {navLinks.map(({ id, text }) => (
                  <li key={id}>
                    <button
                      onClick={() => scrollToSection(id)}
                      className="text-gray-600 dark:text-gray-300 hover:text-recicla-primary dark:hover:text-recicla-secondary transition-colors"
                    >
                      {text}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Contact */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Contato</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-2">contato@reciclamais.com.br</p>
              <p className="text-gray-600 dark:text-gray-300">+55 (11) 99999-9999</p>
            </div>
          </div>
          
          {/* Copyright */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-center text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} RECICLA+. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
      
      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed right-6 bottom-6 bg-recicla-primary hover:bg-recicla-accent dark:bg-recicla-secondary dark:hover:bg-recicla-primary text-white rounded-full p-2 shadow-lg transition-all duration-300 ${
          showScrollToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="Voltar ao topo"
      >
        <ChevronUp size={24} />
      </button>
    </div>
  );
};

export default MainLayout;
