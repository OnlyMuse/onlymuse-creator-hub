import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Users, TrendingUp, Shield } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Hero = () => {
  const { t } = useLanguage();
  return (
    <section id="inicio" className="relative min-h-screen flex items-center bg-gradient-to-br from-background via-background to-primary/5">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_35%,hsl(var(--primary)/0.1)_35%,hsl(var(--primary)/0.1)_65%,transparent_65%)] bg-[length:20px_20px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Age Verification Badge */}
          <Badge variant="outline" className="mb-6 border-warning text-warning font-medium px-4 py-2">
            <Shield className="w-4 h-4 mr-2" />
            Solo mayores de 18 años • Compliance y confidencialidad
          </Badge>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight md:leading-[1.3] tracking-tight bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
            {t('hero.title')}
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            {t('hero.subtitle')}
          </p>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-6 mb-10 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" />
              <span>+30 modelos activas</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-success" />
              <span>+300% crecimiento promedio</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-success" />
              <span>100% legal y confidencial</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary-hover text-primary-foreground px-8 py-6 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => {
                document.getElementById('aplicar')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {t('hero.cta')}
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-6 text-lg font-semibold rounded-lg transition-all duration-300"
              onClick={() => {
                document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Solicitar Propuesta
            </Button>
          </div>

          {/* Value Propositions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border/50">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Crecimiento Garantizado</h3>
              <p className="text-sm text-muted-foreground">
                Estrategias probadas para maximizar tu alcance e ingresos
              </p>
            </div>

            <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border/50">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">100% Profesional</h3>
              <p className="text-sm text-muted-foreground">
                Cumplimiento legal, confidencialidad y enfoque empresarial
              </p>
            </div>

            <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border/50">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Soporte 24/7</h3>
              <p className="text-sm text-muted-foreground">
                Acompañamiento completo con equipo especializado
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;