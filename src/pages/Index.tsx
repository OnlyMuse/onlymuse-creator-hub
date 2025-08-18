import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Process from "@/components/Process";
import FAQ from "@/components/FAQ";
import LeadForm from "@/components/LeadForm";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Services />
      <Process />
      <FAQ />
      <LeadForm />
      <Footer />
    </div>
  );
};

export default Index;
