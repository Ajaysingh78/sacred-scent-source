import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, Award, Shield, TrendingUp, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    { icon: Award, number: "20+", label: "Years Experience", color: "from-amber-400 to-orange-500" },
    { icon: Shield, number: "500+", label: "Happy Clients", color: "from-green-400 to-emerald-500" },
    { icon: TrendingUp, number: "50+", label: "Fragrance Varieties", color: "from-blue-400 to-cyan-500" }
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-0 -right-4 w-96 h-96 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-orange-400/20 rounded-full animate-float"
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
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-orange-200">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-gray-700">Direct From Factory • ISO Certified</span>
              </div>

              {/* Main Heading */}
              <div>
                <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-4">
                  <span className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500 bg-clip-text text-transparent">
                    Pure Fragrance,
                  </span>
                  <br />
                  <span className="text-gray-800">Trusted Quality</span>
                </h1>
                <div className="h-1.5 w-32 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"></div>
              </div>

              {/* Subheading */}
              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-xl">
                Supplying <span className="font-semibold text-orange-600">premium incense sticks</span> directly from our manufacturing unit to wholesalers and distributors across India
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg"
                  className="group bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white shadow-2xl shadow-orange-500/50 hover:shadow-orange-600/60 transition-all duration-300 text-lg px-8 py-6"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <Phone className="mr-2 group-hover:rotate-12 transition-transform" size={22} />
                  Contact for Bulk Orders
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </Button>
                
                <Button 
                  size="lg"
                  className="group bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white shadow-2xl shadow-green-500/50 hover:shadow-green-600/60 transition-all duration-300 text-lg px-8 py-6"
                  onClick={() => window.open("https://wa.me/+917089899828", "_blank")}
                >
                  <MessageCircle className="mr-2 group-hover:scale-110 transition-transform" size={22} />
                  WhatsApp Now
                </Button>
              </div>

              {/* Trust Bar */}
              <div className="flex flex-wrap items-center gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1,2,3,4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 border-2 border-white flex items-center justify-center text-white font-bold text-sm">
                        {String.fromCharCode(64 + i)}
                      </div>
                    ))}
                  </div>
                  <div className="text-sm">
                    <div className="font-semibold text-gray-800">500+ Clients</div>
                    <div className="text-gray-600">Trust Us Daily</div>
                  </div>
                </div>
                
                <div className="h-12 w-px bg-gray-300"></div>
                
                <div className="flex items-center gap-2">
                  <div className="flex text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                      </svg>
                    ))}
                  </div>
                  <div className="text-sm">
                    <div className="font-semibold text-gray-800">5.0 Rating</div>
                    <div className="text-gray-600">Premium Quality</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content - Image Showcase */}
            <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              
              {/* Main Image Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <div className="aspect-[4/5] bg-gradient-to-br from-orange-400 to-amber-600">
                  {/* Placeholder for actual image */}
                  <div className="w-full h-full flex items-center justify-center text-white">
                    <div className="text-center space-y-4">
                      <div className="text-6xl">🔥</div>
                      <div className="text-2xl font-bold">Premium Incense</div>
                      <div className="text-lg opacity-90">Traditional Fragrance</div>
                    </div>
                  </div>
                </div>
                
                {/* Floating Badge on Image */}
                <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl">
                  <div className="text-center">
                    <div className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">20+</div>
                    <div className="text-xs font-medium text-gray-600">Years Legacy</div>
                  </div>
                </div>
                
                {/* Quality Badge */}
                <div className="absolute bottom-6 left-6 bg-green-500 text-white rounded-xl px-4 py-2 shadow-xl flex items-center gap-2">
                  <Shield size={20} />
                  <span className="font-semibold">ISO Certified</span>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -z-10 top-10 -right-10 w-72 h-72 bg-orange-200 rounded-full blur-3xl opacity-60"></div>
              <div className="absolute -z-10 -bottom-10 -left-10 w-72 h-72 bg-amber-200 rounded-full blur-3xl opacity-60"></div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className={`mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-orange-100 hover:border-orange-300 hover:-translate-y-2"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon size={28} />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-gray-800">{stat.number}</div>
                    <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-orange-400/50 rounded-full flex justify-center p-2">
          <div className="w-1 h-3 bg-gradient-to-b from-orange-600 to-amber-600 rounded-full animate-pulse" />
        </div>
      </div>

      {/* Add animations in style tag */}
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
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