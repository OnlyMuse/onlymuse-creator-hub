import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <img 
                src="/lovable-uploads/6318e933-6850-4026-b87e-fe0773b164dd.png" 
                alt="OnlyMuse" 
                className="w-8 h-8 object-contain"
              />
            </div>
            <span className="text-xl font-bold text-primary">OnlyMuse</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#inicio" className="text-muted-foreground hover:text-primary transition-colors">
              Inicio
            </a>
            <a href="#servicios" className="text-muted-foreground hover:text-primary transition-colors">
              Servicios
            </a>
            <a href="#proceso" className="text-muted-foreground hover:text-primary transition-colors">
              Proceso
            </a>
            <a href="#faq" className="text-muted-foreground hover:text-primary transition-colors">
              FAQ
            </a>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="outline" 
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              Soy Cliente
            </Button>
            <Button className="bg-primary hover:bg-primary-hover">
              Aplicar como Modelo
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <a href="#inicio" className="text-muted-foreground hover:text-primary transition-colors">
                Inicio
              </a>
              <a href="#servicios" className="text-muted-foreground hover:text-primary transition-colors">
                Servicios
              </a>
              <a href="#proceso" className="text-muted-foreground hover:text-primary transition-colors">
                Proceso
              </a>
              <a href="#faq" className="text-muted-foreground hover:text-primary transition-colors">
                FAQ
              </a>
              <div className="flex flex-col space-y-2 pt-4">
                <Button 
                  variant="outline" 
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  Soy Cliente
                </Button>
                <Button className="bg-primary hover:bg-primary-hover">
                  Aplicar como Modelo
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;