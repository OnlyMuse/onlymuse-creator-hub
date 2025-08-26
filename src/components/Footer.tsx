import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Instagram, 
  Twitter, 
  Mail, 
  Phone, 
  MapPin, 
  Shield,
  Clock,
  Globe
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-card/95 backdrop-blur border-t overflow-hidden">
      {/* Subtle decorative gradient blobs */}
      <div className="pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(circle_at_center,black,transparent)]">
        <div className="absolute -top-24 -left-32 w-72 h-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute top-1/2 -right-32 w-80 h-80 rounded-full bg-accent/10 blur-3xl" />
      </div>

      {/* Main Footer */}
      <div className="relative py-16">
  <div className="container mx-auto px-6 md:px-8 max-w-6xl">
          {/* Ajuste: 4 columnas generaba un hueco vacío a la derecha; ahora 3 columnas reales */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            {/* Brand Column */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-br from-primary/90 to-primary rounded-full flex items-center justify-center overflow-hidden ring-2 ring-primary/30 shadow-sm">
                  <img 
                    src="/lovable-uploads/6318e933-6850-4026-b87e-fe0773b164dd.png" 
                    alt="OnlynMuse" 
                    className="w-8 h-8 object-cover rounded-full"
                  />
                </div>
                <span className="text-xl font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">OnlynMuse</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed pr-2">
                La agencia líder en gestión profesional para creadores de OnlyFans. 
                Transformamos tu presencia digital en un negocio rentable y sostenible.
              </p>
              <div className="flex space-x-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="p-2 h-auto rounded-full hover:bg-primary/10 hover:text-primary transition-colors" aria-label="Instagram"
                  onClick={() => window.open('https://instagram.com/onlynmuse', '_blank')}
                >
                  <Instagram size={16} />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="p-2 h-auto rounded-full hover:bg-primary/10 hover:text-primary transition-colors" aria-label="Twitter"
                  onClick={() => window.open('https://twitter.com/onlynmuse', '_blank')}
                >
                  <Twitter size={16} />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="p-2 h-auto rounded-full hover:bg-primary/10 hover:text-primary transition-colors" aria-label="Email"
                  onClick={() => window.location.href = 'mailto:onlynmuse@gmail.com'}
                >
                  <Mail size={16} />
                </Button>
              </div>
            </div>

            {/* Services */}
            <div className="relative">
              <h4 className="font-medium mb-6 text-xs uppercase tracking-wider text-muted-foreground">Servicios</h4>
              <ul className="space-y-2 text-sm text-muted-foreground/90">
                <li><a href="#" className="group inline-flex items-center gap-1 hover:text-primary transition-colors"><span className="h-1.5 w-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors" />Gestión Completa</a></li>
                <li><a href="#" className="group inline-flex items-center gap-1 hover:text-primary transition-colors"><span className="h-1.5 w-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors" />Crecimiento Acelerado</a></li>
                <li><a href="#" className="group inline-flex items-center gap-1 hover:text-primary transition-colors"><span className="h-1.5 w-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors" />Creación de Contenido</a></li>
                <li><a href="#" className="group inline-flex items-center gap-1 hover:text-primary transition-colors"><span className="h-1.5 w-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors" />Monetización Premium</a></li>
                <li><a href="#" className="group inline-flex items-center gap-1 hover:text-primary transition-colors"><span className="h-1.5 w-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors" />Consultoría Estratégica</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div className="relative">
              <h4 className="font-medium mb-6 text-xs uppercase tracking-wider text-muted-foreground">Contacto</h4>
              <div className="space-y-4 text-sm text-muted-foreground/90">
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <div>onlynmuse@gmail.com</div>
                    <div className="text-xs text-muted-foreground">Consultas generales</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Instagram className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <a
                      href="https://instagram.com/onlynmuse"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium hover:text-primary transition-colors"
                      aria-label="Abrir perfil de Instagram @onlynmuse"
                    >
                      @onlynmuse
                    </a>
                    <div className="text-xs text-muted-foreground">Instagram oficial (DM rápido)</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <div>24/7 Disponible</div>
                    <div className="text-xs text-muted-foreground">Soporte para clientes</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Globe className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <div>Múltiples zonas horarias</div>
                    <div className="text-xs text-muted-foreground">Cobertura internacional</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-14 opacity-60" />

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-10 text-xs md:text-sm">
            <div className="inline-flex items-center gap-1.5 rounded-full border bg-background/50 px-3 py-1.5 text-muted-foreground hover:border-primary/30 transition-colors">
              <Shield className="w-3.5 h-3.5 text-success" /> <span>SSL Certificado</span>
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-full border bg-background/50 px-3 py-1.5 text-muted-foreground hover:border-primary/30 transition-colors">
              <Shield className="w-3.5 h-3.5 text-success" /> <span>GDPR Compliant</span>
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-full border bg-background/50 px-3 py-1.5 text-muted-foreground hover:border-primary/30 transition-colors">
              <Shield className="w-3.5 h-3.5 text-success" /> <span>Datos Encriptados</span>
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-full border bg-background/50 px-3 py-1.5 text-warning hover:border-warning/50 transition-colors">
              <Badge variant="outline" className="text-[10px] md:text-xs border-warning text-warning px-2 py-0.5 leading-none">+18 Verificado</Badge>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pt-8 border-t/60 text-xs md:text-sm text-muted-foreground/80">
            <div className="tracking-tight">
              © 2024 OnlynMuse Agency. Todos los derechos reservados.
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              <a href="#" className="hover:text-primary transition-colors underline-offset-4 hover:underline">Política de Privacidad</a>
              <a href="#" className="hover:text-primary transition-colors underline-offset-4 hover:underline">Términos de Servicio</a>
              <a href="#" className="hover:text-primary transition-colors underline-offset-4 hover:underline">Cookies</a>
              <a href="#" className="hover:text-primary transition-colors underline-offset-4 hover:underline">Aviso Legal</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;