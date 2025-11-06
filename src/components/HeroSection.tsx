import { Button } from "@/components/ui/button";
import { 
  Phone, 
  MessageCircle, 
  Sparkles, 
  ArrowRight, 
  CheckCircle,
  Shield,
  Truck,
  Star,
  Award,
  TrendingUp,
  Users,
  Zap,
  Package,
  Clock,
  ChevronDown,
  Calculator,
  PlayCircle
} from "lucide-react";
import { useEffect, useState } from "react";

const NamamiHero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeStyle, setActiveStyle] = useState('premium');
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Style selector component
  const StyleSelector = () => (
    <div className="fixed top-4 right-4 z-50 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-2 shadow-2xl">
      <div className="flex gap-2">
        {[
          { id: 'premium', label: 'Premium', icon: Star },
          { id: 'minimal', label: 'Minimal', icon: Zap },
          { id: 'bold', label: 'Bold', icon: TrendingUp }
        ].map(style => (
          <button
            key={style.id}
            onClick={() => setActiveStyle(style.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
              activeStyle === style.id 
                ? 'bg-orange-500 text-white shadow-lg' 
                : 'bg-white/5 text-white/60 hover:bg-white/10'
            }`}
          >
            <style.icon size={16} />
            <span className="text-sm font-semibold">{style.label}</span>
          </button>
        ))}
      </div>
    </div>
  );

  // STYLE 1: PREMIUM & MODERN
  const PremiumStyle = () => (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900">
      {/* Elegant Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mix-blend-screen filter blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mix-blend-screen filter blur-3xl animate-float-slow" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjA1Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40"></div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className={`max-w-7xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* Premium Badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-xl px-6 py-3 rounded-full border border-white/20 shadow-2xl">
              <Shield className="text-orange-400" size={20} />
              <span className="text-white font-bold text-sm">ISO Certified Manufacturing Excellence</span>
              <Award className="text-purple-400" size={20} />
            </div>
          </div>

          {/* Main Headline */}
          <div className="text-center space-y-6 mb-12">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-tight">
              <span className="block text-white mb-2">India's Most Trusted</span>
              <span className="block bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                Manufacturing Partner
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl md:text-3xl text-white/80 max-w-4xl mx-auto font-medium leading-relaxed">
              For Agarbatti & Industrial Excellence
            </p>

            <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
              We don't just supply products—we power your business growth with ISO-certified quality, unmatched reliability, and <span className="text-orange-400 font-bold">5000+ successful deliveries</span> across India.
            </p>
          </div>

          {/* Trust Metrics */}
          <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-4xl mx-auto mb-12">
            {[
              { value: '500+', label: 'Trusted Businesses', icon: Users, color: 'from-green-400 to-emerald-500' },
              { value: '5000+', label: 'Products Delivered', icon: Package, color: 'from-orange-400 to-amber-500' },
              { value: '100%', label: 'Quality Assured', icon: Shield, color: 'from-purple-400 to-pink-500' }
            ].map((metric, i) => (
              <div key={i} className="text-center group cursor-pointer">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${metric.color} mb-3 group-hover:scale-110 transition-transform duration-300`}>
                  <metric.icon className="text-white" size={28} />
                </div>
                <div className={`text-3xl sm:text-4xl md:text-5xl font-black bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`}>
                  {metric.value}
                </div>
                <div className="text-white/60 text-xs sm:text-sm font-semibold mt-1">{metric.label}</div>
              </div>
            ))}
          </div>

          {/* Benefits */}
          <div className="flex flex-wrap justify-center gap-4 mb-12 max-w-5xl mx-auto">
            {[
              'ISO-Certified Manufacturing with Zero-Compromise Quality',
              '500+ Businesses Trust Us for Consistent Supply',
              'Pan-India Delivery with Real-Time Order Tracking'
            ].map((benefit, i) => (
              <div key={i} className="flex items-center gap-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-4 sm:px-6 py-3 hover:bg-white/10 hover:scale-105 transition-all duration-300">
                <CheckCircle className="text-green-400 flex-shrink-0" size={18} />
                <span className="text-white text-sm font-medium">{benefit}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <Button 
              size="lg"
              className="group relative overflow-hidden bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 text-white font-bold text-lg px-10 py-7 rounded-2xl shadow-2xl shadow-orange-500/50 hover:scale-110 transition-all duration-300 border-2 border-orange-400/30"
              onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              <div className="relative flex items-center gap-3">
                <Phone className="group-hover:rotate-12 transition-transform" size={22} />
                <span>Get Your Wholesale Quote Now</span>
                <ArrowRight className="group-hover:translate-x-2 transition-transform" size={20} />
              </div>
            </Button>
            
            <Button 
              size="lg"
              variant="outline"
              className="group bg-white/5 backdrop-blur-xl border-2 border-white/20 text-white hover:bg-white/10 hover:border-white/40 font-semibold text-lg px-10 py-7 rounded-2xl hover:scale-105 transition-all duration-300"
              onClick={() => alert('Product range coming soon!')}
            >
              <div className="flex items-center gap-3">
                <Package className="group-hover:rotate-12 transition-transform" size={22} />
                <span>View Our Product Range</span>
              </div>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="text-white/40" size={32} />
      </div>
    </section>
  );

  // STYLE 2: MINIMAL & CLEAN
  const MinimalStyle = () => (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Subtle Grid */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjAzIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-100"></div>

      {/* Single Orange Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange-600 to-transparent"></div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className={`max-w-6xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* Minimal Headline */}
          <div className="text-center space-y-8 mb-16">
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-slate-900 leading-none tracking-tight">
              Manufacturing<br/>Excellence.
              <span className="block text-orange-600">Delivered.</span>
            </h1>
            
            <div className="w-24 h-1 bg-slate-900 mx-auto"></div>

            <p className="text-xl sm:text-2xl md:text-3xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-light">
              From premium agarbatti to industrial machinery—one partner, unlimited possibilities.
            </p>

            <p className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto">
              Simple ordering. Transparent pricing. Guaranteed quality.
            </p>
          </div>

          {/* Minimal Benefits */}
          <div className="space-y-4 max-w-2xl mx-auto mb-16">
            {[
              'Straight from manufacturer. No middlemen markup.',
              'Fixed timelines. Zero delays. Always on schedule.',
              'One call away. Real human support, not bots.'
            ].map((benefit, i) => (
              <div key={i} className="flex items-start gap-4 group cursor-pointer">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <ArrowRight className="text-white" size={16} />
                </div>
                <p className="text-lg text-slate-700 font-medium group-hover:text-slate-900 transition-colors">{benefit}</p>
              </div>
            ))}
          </div>

          {/* Minimal CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button 
              size="lg"
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-lg px-12 py-7 rounded-none shadow-xl hover:shadow-2xl transition-all duration-300"
              onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
            >
              Start Your Order
            </Button>
            
            <button className="text-slate-900 font-semibold text-lg underline underline-offset-4 hover:text-orange-600 transition-colors">
              Calculate Your Bulk Discount
            </button>
          </div>

          {/* Minimal Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-4xl mx-auto mt-20 pt-20 border-t border-slate-200">
            {[
              { value: '5000+', label: 'Orders' },
              { value: '500+', label: 'Clients' },
              { value: '100%', label: 'Quality' }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-5xl font-black text-slate-900 mb-2">{stat.value}</div>
                <div className="text-sm text-slate-500 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );

  // STYLE 3: BOLD & HIGH-IMPACT
  const BoldStyle = () => (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Dramatic Diagonal Split */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600 via-red-600 to-orange-700" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 70%, 0 100%)' }}></div>
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800" style={{ clipPath: 'polygon(0 100%, 100% 70%, 100% 100%, 0 100%)' }}></div>
      </div>

      {/* Motion Blur Lines */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute h-1 bg-white rounded-full animate-slide"
            style={{
              top: `${i * 10}%`,
              left: '-100%',
              width: '200%',
              animationDelay: `${i * 0.2}s`,
              animationDuration: '3s'
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className={`max-w-7xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* Urgency Badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-3 bg-yellow-400 text-slate-900 px-6 py-3 rounded-full shadow-2xl animate-pulse">
              <Zap className="animate-bounce" size={20} />
              <span className="font-black text-sm uppercase tracking-wider">Limited Manufacturer Slots Available</span>
            </div>
          </div>

          {/* Bold Headline */}
          <div className="text-center space-y-6 mb-12">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-tight text-white">
              <span className="block mb-2">Stop Overpaying</span>
              <span className="block text-yellow-400">Middlemen.</span>
              <span className="block">Buy Direct.</span>
              <span className="block text-yellow-400">Build Bigger.</span>
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-medium">
              Why settle for average suppliers when you can partner with manufacturers who've delivered <span className="text-yellow-400 font-black">5000+ orders</span> without a single quality complaint?
            </p>

            <p className="text-xl sm:text-2xl font-bold text-yellow-400">
              This is wholesale, reimagined.
            </p>
          </div>

          {/* Impact Benefits */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-5xl mx-auto mb-12">
            {[
              { icon: TrendingUp, text: 'Up to 40% Savings vs. Distributor Prices', color: 'bg-green-500' },
              { icon: Zap, text: '48-Hour Express Fulfillment Available', color: 'bg-yellow-500' },
              { icon: Shield, text: '100% Money-Back Quality Guarantee', color: 'bg-blue-500' }
            ].map((benefit, i) => (
              <div key={i} className={`${benefit.color} text-slate-900 rounded-2xl p-6 shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer`}>
                <benefit.icon className="mb-3" size={32} />
                <p className="font-bold text-base">{benefit.text}</p>
              </div>
            ))}
          </div>

          {/* Aggressive CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <Button 
              size="lg"
              className="group relative overflow-hidden bg-red-600 hover:bg-red-700 text-white font-black text-xl px-12 py-8 rounded-2xl shadow-2xl shadow-red-600/50 hover:scale-110 transition-all duration-300 border-4 border-yellow-400 animate-pulse-slow"
              onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
            >
              <div className="relative flex items-center gap-3">
                <Star className="animate-spin-slow" size={24} />
                <span>Claim Your Manufacturer Discount</span>
                <ArrowRight className="group-hover:translate-x-2 transition-transform" size={22} />
              </div>
            </Button>
            
            <Button 
              size="lg"
              className="bg-transparent border-4 border-white text-white hover:bg-white hover:text-slate-900 font-bold text-xl px-12 py-8 rounded-2xl transition-all duration-300 hover:scale-105"
              onClick={() => alert('Live pricing coming soon!')}
            >
              <div className="flex items-center gap-3">
                <Calculator size={24} />
                <span>See Live Pricing</span>
              </div>
            </Button>
          </div>

          {/* Countdown Timer (Mock) */}
          <div className="mt-12 text-center">
            <p className="text-white/80 text-sm mb-2">Special manufacturer pricing expires in:</p>
            <div className="flex justify-center gap-4">
              {['23', '59', '45'].map((time, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-xl rounded-xl px-4 py-2 border border-white/20">
                  <div className="text-3xl font-black text-yellow-400">{time}</div>
                  <div className="text-xs text-white/60">{['HRS', 'MIN', 'SEC'][i]}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <>
      <StyleSelector />
      {activeStyle === 'premium' && <PremiumStyle />}
      {activeStyle === 'minimal' && <MinimalStyle />}
      {activeStyle === 'bold' && <BoldStyle />}

      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, 30px) scale(1.1); }
        }
        
        @keyframes slide {
          0% { left: -100%; }
          100% { left: 100%; }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        
        .animate-slide {
          animation: slide 3s linear infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </>
  );
};

export default NamamiHero;