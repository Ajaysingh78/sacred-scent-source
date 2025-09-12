import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProductsSection from "@/components/ProductsSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <ProductsSection />
        <WhyChooseUsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
