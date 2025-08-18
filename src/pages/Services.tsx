import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Services from "@/components/Services";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-background via-background to-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-6 border-primary text-primary">
              Nuestros Servicios
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Soluciones completas para tu{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                crecimiento digital
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Cada servicio está diseñado para maximizar tu potencial de ingresos y 
              construir una marca personal sólida en el ecosistema digital.
            </p>
            <Button variant="outline" className="mb-8">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al Inicio
            </Button>
          </div>
        </div>
      </section>

      <Services />
      <Footer />
    </div>
  );
};

export default ServicesPage;