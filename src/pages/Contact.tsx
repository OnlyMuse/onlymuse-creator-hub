import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LeadForm from "@/components/LeadForm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-6 border-primary text-primary">
              Proceso de Aplicación
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Comienza tu{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                transformación
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Completa nuestro formulario de aplicación para una evaluación personalizada 
              de tu potencial y estrategia de crecimiento.
            </p>
            <Button variant="outline" className="mb-8">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al Inicio
            </Button>
          </div>
        </div>
      </section>

      <LeadForm />
      <Footer />
    </div>
  );
};

export default ContactPage;