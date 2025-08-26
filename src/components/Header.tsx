import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center overflow-hidden">
              <img 
                src="/lovable-uploads/6318e933-6850-4026-b87e-fe0773b164dd.png" 
                alt="OnlynMuse" 
                className="w-8 h-8 object-cover rounded-full"
              />
            </div>
            <span className="text-xl font-bold text-primary">OnlynMuse</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a 
              href="#inicio" 
              className="text-muted-foreground hover:text-primary transition-colors cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('inicio')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {t('header.inicio')}
            </a>
            <a 
              href="#servicios" 
              className="text-muted-foreground hover:text-primary transition-colors cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {t('header.servicios')}
            </a>
            <a 
              href="#proceso" 
              className="text-muted-foreground hover:text-primary transition-colors cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('proceso')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {t('header.proceso')}
            </a>
            <a 
              href="#faq" 
              className="text-muted-foreground hover:text-primary transition-colors cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {t('header.faq')}
            </a>
            <LanguageSwitcher />
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex">
            <Button 
              className="bg-primary hover:bg-primary-hover"
              onClick={() => {
                document.getElementById('aplicar')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {t('header.apply')}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          {/* Invisible Admin Hotspot */}
          <Link
            to="/admin/login"
            aria-label="Acceso administración"
            className="absolute top-0 right-0 w-10 h-10 opacity-0 focus:opacity-100 focus:outline-none"
          >
            <span className="sr-only">Admin</span>
          </Link>
        </div>

        {/* Mobile Menu */}
  {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <a 
                href="#inicio" 
                className="text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('inicio')?.scrollIntoView({ behavior: 'smooth' });
                  setIsMenuOpen(false);
                }}
              >
                {t('header.inicio')}
              </a>
              <a 
                href="#servicios" 
                className="text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' });
                  setIsMenuOpen(false);
                }}
              >
                {t('header.servicios')}
              </a>
              <a 
                href="#proceso" 
                className="text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('proceso')?.scrollIntoView({ behavior: 'smooth' });
                  setIsMenuOpen(false);
                }}
              >
                {t('header.proceso')}
              </a>
              <a 
                href="#faq" 
                className="text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });
                  setIsMenuOpen(false);
                }}
              >
                {t('header.faq')}
              </a>
              <LanguageSwitcher />
              <div className="pt-4">
                <Button 
                  className="bg-primary hover:bg-primary-hover w-full"
                  onClick={() => {
                    document.getElementById('aplicar')?.scrollIntoView({ behavior: 'smooth' });
                    setIsMenuOpen(false);
                  }}
                >
                  {t('header.apply')}
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

// Keyboard shortcut: Ctrl+Alt+A opens admin login
// Placed outside component not needed; easier inside via useEffect.
// Adjust component to add effect.

// Re-export with shortcut enhancement
const EnhancedHeader = () => {
  const Component = Header as any;
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.altKey && (e.key === 'a' || e.key === 'A')) {
        window.location.href = '/admin/login';
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);
  return <Component />;
};

export default EnhancedHeader;
// NOTE: Original default export replaced by EnhancedHeader.