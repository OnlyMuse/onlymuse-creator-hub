import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

const FAQ = () => {
  const faqs = [
    {
      question: "¿Qué servicios incluye la gestión completa?",
      answer: "Nuestra gestión completa incluye chat 24/7 con tus fans, programación y publicación de contenido, estrategias de marketing en redes sociales, optimización de precios, promociones exclusivas, soporte técnico, análisis de rendimiento y reportes mensuales detallados."
    },
    {
      question: "¿Cómo garantizan el crecimiento de mi perfil?",
      answer: "Utilizamos estrategias probadas que incluyen marketing orgánico en redes sociales, optimización SEO, colaboraciones estratégicas, análisis de competencia y técnicas de engagement comprobadas. Nuestros clientes ven un crecimiento promedio del 300% en los primeros 6 meses."
    },
    {
      question: "¿Es seguro y legal trabajar con ustedes?",
      answer: "Absolutamente. Cumplimos con todas las regulaciones locales e internacionales, mantenemos estricta confidencialidad, todos nuestros contratos son transparentes y legales, y trabajamos únicamente con mayores de 18 años con documentación verificada."
    },
    {
      question: "¿Cómo manejan la privacidad y confidencialidad?",
      answer: "La confidencialidad es nuestra prioridad. Todos nuestros empleados firman acuerdos de confidencialidad, tus datos están encriptados y protegidos, nunca compartimos información personal, y tienes control total sobre tu contenido y datos en todo momento."
    },
    {
      question: "¿Cuál es la estructura de pagos?",
      answer: "Trabajamos principalmente con porcentajes de ingresos (20-30% dependiendo del paquete), sin costos iniciales para modelos. Para empresas ofrecemos tarifas fijas mensuales. Solo ganamos cuando tú ganas, alineando nuestros intereses con tu éxito."
    },
    {
      question: "¿Qué pasa si no estoy satisfecho(a) con los resultados?",
      answer: "Ofrecemos una garantía de satisfacción. Si no ves mejoras en los primeros 60 días, evaluaremos tu caso individual y ajustaremos la estrategia. Nuestro objetivo es tu éxito a largo plazo, no ganancias a corto plazo."
    },
    {
      question: "¿Necesito tener experiencia previa en OnlyFans?",
      answer: "No es necesario. Trabajamos tanto con principiantes como con creadores experimentados. Para principiantes, proporcionamos capacitación completa, guías paso a paso y acompañamiento personalizado desde el primer día."
    },
    {
      question: "¿En qué países operan?",
      answer: "Trabajamos principalmente con modelos de España, México, Argentina, Colombia, Chile y Estados Unidos. Sin embargo, evaluamos casos de otros países hispanohablantes. Nuestro equipo maneja múltiples zonas horarias para soporte 24/7."
    },
    {
      question: "¿Cómo es el proceso de selección?",
      answer: "El proceso incluye: aplicación inicial, verificación de edad e identidad, entrevista por videollamada, evaluación de potencial, desarrollo de estrategia personalizada y firma de contrato. El proceso completo toma entre 3-7 días hábiles."
    },
    {
      question: "¿Puedo mantener el control de mi cuenta?",
      answer: "Sí, siempre mantienes la propiedad y control final de tu cuenta. Nosotros gestionamos las operaciones diarias bajo tu supervisión y aprobación. Puedes terminar la colaboración en cualquier momento con 30 días de aviso previo."
    }
  ];

  return (
    <section id="faq" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 border-primary text-primary">
            Preguntas Frecuentes
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Resolvemos tus{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              dudas más comunes
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transparencia total sobre nuestros procesos, métodos y expectativas. 
            Si tu pregunta no está aquí, contáctanos directamente.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-card border border-border rounded-lg px-6"
              >
                <AccordionTrigger className="text-left hover:text-primary font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="text-center mt-12">
          <div className="bg-card rounded-2xl p-8 max-w-2xl mx-auto border border-border">
            <MessageCircle className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">
              ¿Tienes más preguntas?
            </h3>
            <p className="text-muted-foreground mb-6">
              Nuestro equipo está disponible para resolver cualquier duda específica sobre tu caso.
            </p>
            <Button className="bg-primary hover:bg-primary-hover">
              Contactar Ahora
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;