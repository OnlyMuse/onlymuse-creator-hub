import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Users, 
  Rocket, 
  BarChart3, 
  CheckCircle, 
  ArrowRight 
} from "lucide-react";

const Process = () => {
  const steps = [
    {
      step: "01",
      icon: FileText,
      title: "Aplicación y Evaluación",
      description: "Completas el formulario de aplicación y nuestro equipo evalúa tu perfil y potencial de crecimiento.",
      duration: "24-48 horas",
      details: [
        "Análisis de redes sociales existentes",
        "Evaluación de mercado objetivo", 
        "Identificación de oportunidades",
        "Definición de estrategia inicial"
      ]
    },
    {
      step: "02",
      icon: Users,
      title: "Consulta Estratégica",
      description: "Videollamada personalizada para diseñar tu estrategia de crecimiento y definir objetivos claros.",
      duration: "60-90 minutos",
      details: [
        "Definición de objetivos SMART",
        "Planificación de contenido",
        "Estrategia de precios",
        "Calendario de lanzamiento"
      ]
    },
    {
      step: "03",
      icon: Rocket,
      title: "Implementación y Lanzamiento",
      description: "Comenzamos la gestión completa: optimización de perfil, creación de contenido y promoción inicial.",
      duration: "Primera semana",
      details: [
        "Optimización de perfil completa",
        "Configuración de herramientas",
        "Inicio de promoción orgánica",
        "Primeras interacciones con fans"
      ]
    },
    {
      step: "04",
      icon: BarChart3,
      title: "Crecimiento y Optimización",
      description: "Monitoreo continuo, ajustes de estrategia y escalamiento basado en métricas de rendimiento.",
      duration: "Ongoing",
      details: [
        "Análisis semanal de métricas",
        "Optimización de contenido",
        "Estrategias de retención",
        "Reportes mensuales detallados"
      ]
    }
  ];

  return (
    <section id="proceso" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 border-primary text-primary">
            Nuestro Proceso
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            De la aplicación al{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              éxito comprobado
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Un método probado y sistemático que ha transformado la carrera de cientos de creadores. 
            Cada paso está diseñado para maximizar tu potencial de crecimiento.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <Card key={index} className="relative p-8 hover:shadow-xl transition-all duration-300 group">
                  {/* Step connector for desktop */}
                  {index < steps.length - 1 && index % 2 === 0 && (
                    <div className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2">
                      <ArrowRight className="w-8 h-8 text-primary/30" />
                    </div>
                  )}
                  
                  {/* Step number */}
                  <div className="flex items-start gap-6 mb-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                        <IconComponent className="w-8 h-8 text-primary" />
                      </div>
                      <div className="text-3xl font-bold text-primary/20 text-center">
                        {step.step}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-xl font-semibold">{step.title}</h3>
                        <Badge variant="secondary" className="text-xs">
                          {step.duration}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Step details */}
                  <div className="space-y-2">
                    {step.details.map((detail, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{detail}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Success metrics */}
          <div className="bg-gradient-to-r from-primary/5 via-background to-accent/5 rounded-2xl p-8 border border-primary/20">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold mb-3">
                Resultados que hablan por sí solos
              </h3>
              <p className="text-muted-foreground">
                Métricas promedio de nuestros clientes en los primeros 6 meses
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">+300%</div>
                <div className="text-sm text-muted-foreground">Crecimiento en ingresos</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">+250%</div>
                <div className="text-sm text-muted-foreground">Nuevos suscriptores</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">+180%</div>
                <div className="text-sm text-muted-foreground">Engagement rate</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">95%</div>
                <div className="text-sm text-muted-foreground">Satisfacción del cliente</div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary-hover px-8"
              onClick={() => {
                document.getElementById('aplicar')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Comenzar mi Transformación
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;