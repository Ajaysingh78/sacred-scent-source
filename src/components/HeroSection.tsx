import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, Sparkles, Package, Award, TrendingUp, ArrowRight, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const highlights = [
    { icon: Package, text: "Direct Factory Supply" },
    { icon: Award, text: "Premium Quality Products" },
    { icon: TrendingUp, text: "Bulk Orders Welcome" }
  ];

  const products = [
    { name: "Agarbatti Sticks", emoji: "🌸" },
    { name: "Machinery & Parts", emoji: "⚙️" },
    { name: "Business Solutions", emoji: "🚀" }
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      
      {/* Animated Gradient Mesh Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full animate-float opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-7xl mx-auto">
          
          {/* Center Content Layout */}
          <div className={`text-center space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-xl px-6 py-3 rounded-full border border-white/20 shadow-2xl">
              <Sparkles className="text-yellow-400 animate-pulse" size={20} />
              <span className="text-white font-semibold text-sm md:text-base">
                Premium Manufacturing • ISO Certified • Wholesale Specialists
              </span>
            </div>

            {/* Main Heading - More Impactful */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight">
                <span className="block bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text text-transparent animate-gradient">
                  Namami Enterprises
                </span>
              </h1>
              <div className="flex items-center justify-center gap-4">
                <div className="h-1 w-20 bg-gradient-to-r from-orange-500 to-transparent rounded-full"></div>
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white/90">
                  Your Complete Business Partner
                </h2>
                <div className="h-1 w-20 bg-gradient-to-l from-purple-500 to-transparent rounded-full"></div>
              </div>
            </div>

            {/* Subheading */}
            <p className="text-lg md:text-xl lg:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed font-medium">
              From <span className="text-orange-400 font-bold">premium agarbatti manufacturing</span> to 
              <span className="text-purple-400 font-bold"> industrial machinery supply</span> - 
              we power your business growth with quality products and expert support
            </p>

            {/* Product Tags */}
            <div className="flex flex-wrap justify-center gap-3 pt-4">
              {products.map((product, index) => (
                <div
                  key={index}
                  className="group bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-5 py-3 hover:bg-white/20 hover:scale-105 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-2xl group-hover:scale-125 transition-transform duration-300">{product.emoji}</span>
                    <span className="text-white font-semibold text-sm md:text-base">{product.name}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons - More Prominent */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-8">
              <Button 
                size="lg"
                className="group relative bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 hover:from-orange-700 hover:via-orange-600 hover:to-amber-600 text-white font-bold shadow-2xl shadow-orange-500/50 hover:shadow-orange-600/70 transition-all duration-300 text-lg px-10 py-7 rounded-2xl border-2 border-orange-400/30 hover:scale-110"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Phone className="mr-3 group-hover:rotate-12 transition-transform" size={24} />
                Get Wholesale Quote
                <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" size={22} />
                <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
              
              <Button 
                size="lg"
                className="group relative bg-gradient-to-r from-green-600 via-green-500 to-emerald-500 hover:from-green-700 hover:via-green-600 hover:to-emerald-600 text-white font-bold shadow-2xl shadow-green-500/50 hover:shadow-green-600/70 transition-all duration-300 text-lg px-10 py-7 rounded-2xl border-2 border-green-400/30 hover:scale-110"
                onClick={() => window.open("https://wa.me/917067449775", "_blank")}
              >
                <MessageCircle className="mr-3 group-hover:scale-125 transition-transform" size={24} />
                WhatsApp Inquiry
                <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
            </div>

            {/* Trust Indicators - Modern Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16 max-w-5xl mx-auto">
              {highlights.map((item, index) => (
                <div 
                  key={index}
                  className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <item.icon className="text-white" size={32} />
                    </div>
                    <span className="text-white font-bold text-lg text-center">{item.text}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats Bar */}
            <div className="flex flex-wrap items-center justify-center gap-8 pt-12">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">20+</div>
                <div className="text-white/70 font-semibold text-sm mt-1">Years Experience</div>
              </div>
              
              <div className="h-16 w-px bg-white/20"></div>
              
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">500+</div>
                <div className="text-white/70 font-semibold text-sm mt-1">Happy Clients</div>
              </div>
              
              <div className="h-16 w-px bg-white/20"></div>
              
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">100%</div>
                <div className="text-white/70 font-semibold text-sm mt-1">Quality Assured</div>
              </div>
            </div>

            {/* Bottom Features */}
            <div className="flex flex-wrap items-center justify-center gap-6 pt-8">
              {["✓ Bulk Orders", "✓ Pan India Delivery", "✓ Competitive Pricing", "✓ 24/7 Support"].map((feature, index) => (
                <div key={index} className="flex items-center gap-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-5 py-2">
                  <CheckCircle className="text-green-400" size={18} />
                  <span className="text-white font-semibold text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-8 h-12 border-2 border-white/30 rounded-full flex justify-center p-2">
          <div className="w-1.5 h-4 bg-gradient-to-b from-orange-400 to-purple-500 rounded-full animate-pulse" />
        </div>
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(180deg); }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;