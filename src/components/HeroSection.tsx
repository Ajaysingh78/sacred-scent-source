import { Button } from "@/components/ui/button";
import { Phone, MessageCircle } from "lucide-react";
import heroImage from "@/assets/hero-incense.jpg";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Traditional incense sticks burning with peaceful atmosphere"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brown-dark/80 via-brown/60 to-primary/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Pure Fragrance,{" "}
            <span className="text-accent-glow">Trusted Quality</span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-medium mb-8 text-cream">
            Direct from Factory
          </h2>
          <p className="text-xl md:text-2xl mb-12 text-cream/90 max-w-3xl mx-auto leading-relaxed">
            Supplying premium incense sticks directly from our manufacturing unit to 
            wholesalers and distributors across India
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              variant="hero" 
              size="lg" 
              className="text-lg px-8 py-4 animate-float"
            >
              <Phone className="mr-2" size={20} />
              Contact for Bulk Orders
            </Button>
            <Button 
              variant="whatsapp" 
              size="lg" 
              className="text-lg px-8 py-4"
              onClick={() => window.open("https://wa.me/+917089899828", "_blank")}
            >
              <MessageCircle className="mr-2" size={20} />
              WhatsApp Now
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-accent-glow">20+</div>
              <div className="text-cream/80">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent-glow">500+</div>
              <div className="text-cream/80">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent-glow">50+</div>
              <div className="text-cream/80">Fragrance Varieties</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;