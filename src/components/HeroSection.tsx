import { Button } from "@/components/ui/button";
import { 
  Phone, 
  ArrowRight, 
  CheckCircle,
  Shield,
  Truck,
  Award,
  TrendingUp,
  Users,
  Package,
  Sparkles,
  ChevronDown,
  Star
} from "lucide-react";
import { useEffect, useState } from "react";

const NamamiHero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e) => {
      setMousePosition({ 
        x: (e.clientX / window.innerWidth) * 15, 
        y: (e.clientY / window.innerHeight) * 15 
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        {/* Premium Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Parallax gradient orbs */}
          <div 
            className="absolute inset-0 opacity-30 transition-transform duration-300 ease-out"
            style={{
              background: 'radial-gradient(circle at 20% 30%, rgba(255, 107, 0, 0.2) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(251, 146, 60, 0.15) 0%, transparent 50%)',
              transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`
            }}
          />
          
          {/* Animated gradient blobs */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-orange-500/20 via-amber-500/10 to-transparent rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-tl from-orange-600/15 via-orange-400/5 to-transparent rounded-full blur-3xl animate-float-delay" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-r from-amber-500/5 to-orange-500/5 rounded-full blur-3xl animate-pulse-slow" />
          </div>
          
          {/* Premium grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_90%)]" />
          
          {/* Subtle noise texture */}
          <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay" style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="3.5" numOctaves="4" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noiseFilter)"/%3E%3C/svg%3E")'
          }} />
        </div>

        <div className="relative z-10 container mx-auto px-6 lg:px-12 py-20">
          <div className={`max-w-7xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            
            {/* Premium Trust Badge */}
            <div className="flex justify-center mb-10 animate-fade-in-down">
              <div className="group relative inline-flex items-center gap-3 px-6 py-3 rounded-full border border-orange-500/30 bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-orange-500/10 backdrop-blur-xl hover:border-orange-400/50 transition-all duration-500 hover:shadow-lg hover:shadow-orange-500/20">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/10 to-orange-500/0 opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
                <Award className="text-orange-400 w-5 h-5 animate-pulse-subtle" />
                <span className="text-sm font-bold text-white/95 tracking-wide">ISO 9001:2015 Certified</span>
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-sm font-semibold text-white/80">5000+ Orders Delivered</span>
                <Shield className="text-orange-400 w-5 h-5" />
              </div>
            </div>

            {/* Hero Headline - Maximum Impact */}
            <div className="text-center mb-12 space-y-6">
              <div className="relative inline-block">
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black leading-[0.9] tracking-tighter">
                  <span className="block text-white mb-2 animate-slide-in-left">
                    Namami
                  </span>
                  <span className="relative inline-block animate-slide-in-right">
                    <span className="relative z-10 bg-gradient-to-r from-orange-400 via-orange-500 to-amber-400 bg-clip-text text-transparent drop-shadow-2xl">
                      Enterprises
                    </span>
                    <div className="absolute -inset-2 bg-gradient-to-r from-orange-500/30 via-amber-500/30 to-orange-500/30 blur-3xl -z-10 animate-pulse-glow" />
                  </span>
                </h1>
              </div>
              
              <div className="relative">
                <p className="text-2xl sm:text-3xl md:text-4xl text-white/90 font-bold max-w-4xl mx-auto leading-tight animate-fade-in-up animation-delay-300">
                  India's Premier Manufacturer of
                  <span className="block mt-2 bg-gradient-to-r from-orange-300 via-amber-300 to-orange-400 bg-clip-text text-transparent">
                    Premium Agarbatti & Raw Materials
                  </span>
                </p>
              </div>
              
              <p className="text-lg sm:text-xl md:text-2xl text-white/60 max-w-4xl mx-auto leading-relaxed font-light px-4 animate-fade-in-up animation-delay-500">
                From raw materials to industrial machinery — delivering excellence with every order, trusted by 500+ businesses across India
              </p>
              
              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-white/70 text-sm sm:text-base pt-4 animate-fade-in-up animation-delay-700">
                <div className="flex items-center gap-2.5 group cursor-default">
                  <div className="relative">
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-ping absolute" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                  </div>
                  <span className="font-medium group-hover:text-white/90 transition-colors">500+ Active Partners</span>
                </div>
                <div className="hidden sm:block w-px h-5 bg-white/20" />
                <div className="flex items-center gap-2.5 group cursor-default">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className="font-medium group-hover:text-white/90 transition-colors">4.5/5 Rating</span>
                </div>
                <div className="hidden sm:block w-px h-5 bg-white/20" />
                <div className="flex items-center gap-2.5 group cursor-default">
                  <CheckCircle className="w-5 h-5 text-orange-400" />
                  <span className="font-medium group-hover:text-white/90 transition-colors">99.9% Quality Guaranteed</span>
                </div>
              </div>
            </div>

            {/* Premium Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12 animate-fade-in-up animation-delay-900">
              {[
                { 
                  value: '500+', 
                  label: 'Trusted Distributors', 
                  sublabel: 'Across India',
                  icon: Users, 
                  gradient: 'from-emerald-400 via-green-400 to-emerald-500',
                  bgGradient: 'from-emerald-500/10 via-green-500/5 to-emerald-500/10',
                  iconBg: 'from-emerald-500/20 to-green-500/20'
                },
                { 
                  value: '5000+', 
                  label: 'Orders Completed', 
                  sublabel: 'On-time delivery',
                  icon: Package, 
                  gradient: 'from-orange-400 via-amber-400 to-orange-500',
                  bgGradient: 'from-orange-500/10 via-amber-500/5 to-orange-500/10',
                  iconBg: 'from-orange-500/20 to-amber-500/20'
                },
                { 
                  value: 'ISO', 
                  label: 'Certified Quality', 
                  sublabel: 'Zero compromise',
                  icon: Shield, 
                  gradient: 'from-blue-400 via-cyan-400 to-blue-500',
                  bgGradient: 'from-blue-500/10 via-cyan-500/5 to-blue-500/10',
                  iconBg: 'from-blue-500/20 to-cyan-500/20'
                }
              ].map((metric, i) => (
                <div 
                  key={i} 
                  className="group relative bg-white/[0.03] backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-white/30 transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 cursor-default"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${metric.bgGradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  <div className="relative">
                    <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${metric.iconBg} mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <metric.icon className="text-white drop-shadow-lg" size={26} strokeWidth={2} />
                    </div>
                    <div className={`text-4xl sm:text-5xl md:text-6xl font-black bg-gradient-to-r ${metric.gradient} bg-clip-text text-transparent mb-2 leading-none`}>
                      {metric.value}
                    </div>
                    <div className="text-white/90 text-base sm:text-lg font-bold mb-1">{metric.label}</div>
                    <div className="text-white/50 text-sm font-medium">{metric.sublabel}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Premium USPs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto mb-12 animate-fade-in-up animation-delay-1100">
              {[
                { 
                  icon: Shield, 
                  text: 'ISO-Certified Quality', 
                  subtext: 'Rigorous quality standards',
                  color: 'blue'
                },
                { 
                  icon: Truck, 
                  text: 'Pan-India Delivery', 
                  subtext: 'Real-time tracking system',
                  color: 'orange'
                },
                { 
                  icon: TrendingUp, 
                  text: 'Manufacturer Direct', 
                  subtext: 'Best wholesale pricing',
                  color: 'green'
                }
              ].map((item, i) => (
                <div 
                  key={i}
                  className="group relative flex items-start gap-4 p-5 rounded-xl bg-white/[0.02] backdrop-blur-sm border border-white/10 hover:bg-white/[0.05] hover:border-white/30 transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
                  <div className="relative flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-amber-500/20 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <item.icon className="text-orange-400 w-6 h-6" strokeWidth={2} />
                  </div>
                  <div className="relative">
                    <div className="text-white font-bold text-base mb-1.5">{item.text}</div>
                    <div className="text-white/50 text-sm font-medium">{item.subtext}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Premium CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 animate-fade-in-up animation-delay-1300">
              <Button 
                size="lg"
                className="group relative overflow-hidden bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600 hover:from-orange-500 hover:via-orange-400 hover:to-orange-500 text-white font-bold text-lg px-10 py-7 rounded-2xl shadow-2xl shadow-orange-500/30 hover:shadow-orange-500/50 transition-all duration-500 border-2 border-orange-400/30 hover:border-orange-300/50 hover:scale-105 w-full sm:w-auto"
                onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                <div className="relative flex items-center gap-3">
                  <Phone className="w-6 h-6" strokeWidth={2.5} />
                  <span className="tracking-wide">Get Wholesale Quote</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" strokeWidth={2.5} />
                </div>
              </Button>
              
              <Button 
                size="lg"
                className="group relative overflow-hidden bg-white/5 backdrop-blur-xl border-2 border-white/20 text-white hover:bg-white/10 hover:border-white/40 font-bold text-lg px-10 py-7 rounded-2xl transition-all duration-500 hover:scale-105 w-full sm:w-auto"
                onClick={() => scrollToSection('products')}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/10 to-orange-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative flex items-center gap-3">
                  <Sparkles className="w-6 h-6 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300" strokeWidth={2} />
                  <span className="tracking-wide">View Products</span>
                </div>
              </Button>
            </div>

            {/* Additional Trust Elements */}
            <div className="mt-16 flex items-center justify-center gap-8 text-white/40 text-sm animate-fade-in-up animation-delay-1500">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>Secure Payment</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-white/20" />
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4" />
                <span>Fast Delivery</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-white/20" />
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>Quality Assured</span>
              </div>
            </div>
          </div>
        </div>

        {/* Elegant Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
          <div className="flex flex-col items-center gap-2 opacity-40 hover:opacity-80 transition-opacity cursor-pointer group"
               onClick={() => scrollToSection('about')}>
            <span className="text-white text-xs font-semibold uppercase tracking-widest">Scroll</span>
            <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center p-2 group-hover:border-white/50 transition-colors">
              <div className="w-1 h-2 bg-white/50 rounded-full animate-scroll-down" />
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes float {
          0%, 100% { 
            transform: translate(0, 0) rotate(0deg); 
          }
          33% { 
            transform: translate(30px, -30px) rotate(5deg); 
          }
          66% { 
            transform: translate(-20px, 20px) rotate(-5deg); 
          }
        }
        
        @keyframes float-delay {
          0%, 100% { 
            transform: translate(0, 0) rotate(0deg); 
          }
          33% { 
            transform: translate(-40px, 30px) rotate(-5deg); 
          }
          66% { 
            transform: translate(30px, -20px) rotate(5deg); 
          }
        }

        @keyframes pulse-slow {
          0%, 100% { 
            opacity: 0.3;
            transform: translate(-50%, -50%) scale(1);
          }
          50% { 
            opacity: 0.5;
            transform: translate(-50%, -50%) scale(1.05);
          }
        }

        @keyframes pulse-glow {
          0%, 100% { 
            opacity: 0.5;
          }
          50% { 
            opacity: 0.8;
          }
        }

        @keyframes pulse-subtle {
          0%, 100% { 
            opacity: 1;
          }
          50% { 
            opacity: 0.6;
          }
        }

        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes scroll-down {
          0% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(12px);
          }
        }
        
        .animate-float {
          animation: float 20s ease-in-out infinite;
        }
        
        .animate-float-delay {
          animation: float-delay 25s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }

        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }

        .animate-pulse-subtle {
          animation: pulse-subtle 2s ease-in-out infinite;
        }

        .animate-fade-in-down {
          animation: fade-in-down 0.8s ease-out forwards;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-slide-in-left {
          animation: slide-in-left 0.8s ease-out forwards;
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.8s ease-out forwards;
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }

        .animate-scroll-down {
          animation: scroll-down 2s ease-in-out infinite;
        }

        .animation-delay-300 {
          animation-delay: 300ms;
        }

        .animation-delay-500 {
          animation-delay: 500ms;
        }

        .animation-delay-700 {
          animation-delay: 700ms;
        }

        .animation-delay-900 {
          animation-delay: 900ms;
        }

        .animation-delay-1100 {
          animation-delay: 1100ms;
        }

        .animation-delay-1300 {
          animation-delay: 1300ms;
        }

        .animation-delay-1500 {
          animation-delay: 1500ms;
        }
      `}</style>
    </>
  );
};

export default NamamiHero;