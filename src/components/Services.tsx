import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Settings, 
  TrendingUp, 
  Camera, 
  DollarSign, 
  MessageSquare, 
  BarChart3,
  Star,
  Headphones
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Services = () => {
  const { t } = useLanguage();
  const services = [
    {
      icon: Settings,
      title: "Gestión Completa",
      description: "Nos encargamos de toda la operación: contenido, chat, promoción y administración.",
      features: ["Chat 24/7", "Programación de contenido", "Gestión de suscripciones", "Soporte técnico"],
      price: "Desde 30%",
      popular: true
    },
    {
      icon: TrendingUp,
      title: "Crecimiento Acelerado",
      description: "Estrategias avanzadas de marketing para maximizar tu alcance y nuevos suscriptores.",
      features: ["Marketing en redes", "SEO optimizado", "Colaboraciones", "Análisis de competencia"],
      price: "Desde 25%",
      popular: false
    },
    {
      icon: Camera,
      title: "Creación de Contenido",
      description: "Producción profesional de fotos y videos que destacan y generan más ingresos.",
      features: ["Sesiones fotográficas", "Edición profesional", "Contenido personalizado", "Calendario editorial"],
      price: "Desde $500/mes",
      popular: false
    },
    {
      icon: DollarSign,
      title: "Monetización Premium",
      description: "Optimización de precios, promociones y estrategias para maximizar los ingresos por fan.",
      features: ["Estrategia de precios", "Promociones exclusivas", "Upselling", "Análisis de ROI"],
      price: "Desde 20%",
      popular: false
    }
  ];

  return (
    <section id="servicios" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 border-primary text-primary">
            {t('services.title')}
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            {t('services.subtitle')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Cada paquete está diseñado para diferentes necesidades y objetivos. 
            Todos incluyen soporte profesional y resultados medibles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card 
                key={index} 
                className={`relative p-8 hover:shadow-2xl transition-all duration-300 ${
                  service.popular ? 'border-primary shadow-lg scale-105' : ''
                }`}
              >
                {service.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                    <Star className="w-3 h-3 mr-1" />
                    Más Popular
                  </Badge>
                )}
                
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                    <p className="text-muted-foreground">{service.description}</p>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-6 border-t">
                  <div className="text-2xl font-bold text-primary">
                    {service.price}
                  </div>
                  <Button 
                    variant={service.popular ? "default" : "outline"}
                    className={service.popular ? "bg-primary hover:bg-primary-hover" : "border-primary text-primary hover:bg-primary hover:text-primary-foreground"}
                  >
                    Más Información
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Additional Services */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="p-6 text-center">
            <MessageSquare className="w-8 h-8 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Consultoría Estratégica</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Sesiones personalizadas para optimizar tu estrategia y resolver desafíos específicos.
            </p>
            <Badge variant="outline">Desde $150/hora</Badge>
          </Card>

          <Card className="p-6 text-center">
            <BarChart3 className="w-8 h-8 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Análisis y Reportes</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Informes detallados de rendimiento, insights y recomendaciones de mejora.
            </p>
            <Badge variant="outline">Incluido en todos los planes</Badge>
          </Card>
        </div>

        <div className="text-center mt-12">
          <Button size="lg" className="bg-primary hover:bg-primary-hover px-8">
            Ver Todos los Servicios
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;