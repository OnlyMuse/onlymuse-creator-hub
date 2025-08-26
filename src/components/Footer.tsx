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
    <footer className="bg-card border-t">
      {/* Newsletter Section */}
      <div className="py-16 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Mantente al día con las últimas estrategias
            </h3>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Recibe tips exclusivos, estudios de caso y actualizaciones sobre el industry 
              directamente en tu inbox. Solo contenido de valor, sin spam.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input 
                placeholder="tu@email.com" 
                className="flex-1"
                type="email"
              />
              <Button 
                className="bg-primary hover:bg-primary-hover"
                onClick={() => {
                  // Aquí podrías integrar con un servicio de newsletter como Mailchimp
                  alert('¡Funcionalidad de newsletter próximamente!');
                }}
              >
                Suscribirme
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand Column */}
            <div className="space-y-6">
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
              <p className="text-muted-foreground text-sm leading-relaxed">
                La agencia líder en gestión profesional para creadores de OnlyFans. 
                Transformamos tu presencia digital en un negocio rentable y sostenible.
              </p>
              <div className="flex space-x-3">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="p-2 h-auto"
                  onClick={() => window.open('https://instagram.com/onlymuse.agency', '_blank')}
                >
                  <Instagram size={16} />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="p-2 h-auto"
                  onClick={() => window.open('https://twitter.com/onlymuse', '_blank')}
                >
                  <Twitter size={16} />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="p-2 h-auto"
                  onClick={() => window.location.href = 'mailto:hola@onlymuse.agency'}
                >
                  <Mail size={16} />
                </Button>
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-semibold mb-6">Servicios</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Gestión Completa</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Crecimiento Acelerado</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Creación de Contenido</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Monetización Premium</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Consultoría Estratégica</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold mb-6">Empresa</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Sobre Nosotros</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Casos de Éxito</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Carreras</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Prensa</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold mb-6">Contacto</h4>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <div>hola@onlymuse.agency</div>
                    <div className="text-xs text-muted-foreground">Consultas generales</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <div>+34 XXX XXX XXX</div>
                    <div className="text-xs text-muted-foreground">WhatsApp Business</div>
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

          <Separator className="my-12" />

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-success" />
              <span>SSL Certificado</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-success" />
              <span>GDPR Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-success" />
              <span>Datos Encriptados</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs border-warning text-warning">
                +18 Verificado
              </Badge>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t text-sm text-muted-foreground">
            <div className="mb-4 md:mb-0">
              © 2024 OnlyMuse Agency. Todos los derechos reservados.
            </div>
            <div className="flex flex-wrap gap-6">
              <a href="#" className="hover:text-primary transition-colors">Política de Privacidad</a>
              <a href="#" className="hover:text-primary transition-colors">Términos de Servicio</a>
              <a href="#" className="hover:text-primary transition-colors">Cookies</a>
              <a href="#" className="hover:text-primary transition-colors">Aviso Legal</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;