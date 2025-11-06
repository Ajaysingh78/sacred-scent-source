import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Sparkles, Star, Package, ArrowRight } from "lucide-react";
import { useRef } from "react";

const ProductsSection = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const products = [
    {
      id: 1,
      name: "Sandalwood Premium",
      image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&q=80",
      description: "Rich, woody fragrance with authentic sandalwood essence. Perfect for meditation.",
      packaging: "50 sticks per box",
      category: "Premium",
      gradient: "from-amber-500 to-orange-600",
      features: ["Long burning", "Natural ingredients", "Export quality"],
    },
    {
      id: 2,
      name: "Rose Garden",
      image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600&q=80",
      description: "Delicate rose fragrance that creates a romantic and peaceful atmosphere.",
      packaging: "50 sticks per box",
      category: "Floral",
      gradient: "from-pink-500 to-rose-600",
      features: ["Fresh fragrance", "Long lasting", "Handcrafted"],
    },
    {
      id: 3,
      name: "Jasmine Delight",
      image: "https://images.unsplash.com/photo-1595853035070-59a39fe84de9?w=600&q=80",
      description: "Sweet, enchanting jasmine scent that brings blooming gardens indoors.",
      packaging: "50 sticks per box",
      category: "Floral",
      gradient: "from-purple-500 to-pink-600",
      features: ["Natural essence", "Premium quality", "Smooth burn"],
    },
    {
      id: 4,
      name: "Lavender Dreams",
      image: "https://images.unsplash.com/photo-1611251186960-2e1e47a9e2a5?w=600&q=80",
      description: "Calming lavender fragrance perfect for relaxation and better sleep.",
      packaging: "50 sticks per box",
      category: "Wellness",
      gradient: "from-indigo-500 to-purple-600",
      features: ["Stress relief", "Sleep aid", "Natural herbs"],
    },
    {
      id: 5,
      name: "Mogra Special",
      image: "https://images.unsplash.com/photo-1604357209793-fca5dca89f97?w=600&q=80",
      description: "Traditional mogra fragrance capturing the essence of Indian festivals.",
      packaging: "50 sticks per box",
      category: "Traditional",
      gradient: "from-orange-500 to-red-600",
      features: ["Festival special", "Authentic fragrance", "Cultural essence"],
    },
    {
      id: 6,
      name: "Premium Mix",
      image: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=600&q=80",
      description: "Curated blend of bestselling fragrances for unique aromatic experience.",
      packaging: "60 sticks per box",
      category: "Special",
      gradient: "from-cyan-500 to-blue-600",
      features: ["Mixed varieties", "Best sellers", "Value pack"],
    },
  ];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Premium": return "💎";
      case "Floral": return "🌸";
      case "Wellness": return "🧘";
      case "Traditional": return "🪔";
      case "Special": return "⭐";
      default: return "✨";
    }
  };

  return (
    <section id="products" className="py-20 bg-gradient-to-b from-white via-orange-50/30 to-white overflow-hidden">
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Sparkles size={16} />
            <span>Premium Collection</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Our <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">Signature Fragrances</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Handcrafted with premium ingredients, each fragrance tells a unique story
          </p>
        </div>

        {/* Horizontal Scroll Container */}
        <div className="relative group">
          
          {/* Left Scroll Button */}
          <button
            onClick={() => scroll('left')}
            className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 w-14 h-14 bg-white shadow-2xl rounded-full items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 border border-gray-200 -ml-7"
          >
            <ChevronLeft className="text-gray-700" size={28} />
          </button>

          {/* Right Scroll Button */}
          <button
            onClick={() => scroll('right')}
            className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 w-14 h-14 bg-white shadow-2xl rounded-full items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 border border-gray-200 -mr-7"
          >
            <ChevronRight className="text-gray-700" size={28} />
          </button>

          {/* Scrollable Products */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4 px-2"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {products.map((product, index) => (
              <div
                key={product.id}
                className="group/card flex-shrink-0 w-[320px] md:w-[360px]"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                }}
              >
                {/* Card */}
                <div className="relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 h-full flex flex-col hover:-translate-y-2">
                  
                  {/* Image Section */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t ${product.gradient} opacity-20 group-hover/card:opacity-30 transition-opacity duration-500`}></div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-white/95 backdrop-blur-sm text-gray-900 border-0 shadow-lg px-3 py-1 text-sm font-semibold">
                        {getCategoryIcon(product.category)} {product.category}
                      </Badge>
                    </div>

                    {/* Star Rating */}
                    <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 shadow-lg">
                      <Star className="text-yellow-500 fill-yellow-500" size={16} />
                      <span className="text-sm font-bold text-gray-900">4.8</span>
                    </div>

                    {/* Quick View Badge */}
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
                      <div className={`bg-gradient-to-r ${product.gradient} text-white px-4 py-2 rounded-full text-sm font-semibold shadow-xl`}>
                        View Details →
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 flex-grow flex flex-col">
                    
                    {/* Product Name */}
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover/card:text-orange-600 transition-colors duration-300">
                      {product.name}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow">
                      {product.description}
                    </p>

                    {/* Packaging Info */}
                    <div className="flex items-center gap-2 mb-4 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg px-3 py-2">
                      <Package size={16} className="text-orange-600" />
                      <span>{product.packaging}</span>
                    </div>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {product.features.map((feature, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-orange-50 text-orange-700 px-3 py-1 rounded-full font-medium border border-orange-100"
                        >
                          ✓ {feature}
                        </span>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <Button
                      className={`w-full bg-gradient-to-r ${product.gradient} hover:shadow-xl text-white font-bold transition-all duration-300 group-hover/card:scale-105`}
                      onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                      Get Wholesale Price
                      <ArrowRight className="ml-2 group-hover/card:translate-x-1 transition-transform" size={18} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            {/* End Card - View All */}
            <div className="flex-shrink-0 w-[320px] md:w-[360px] flex items-center justify-center">
              <div className="bg-gradient-to-br from-orange-500 via-orange-600 to-amber-600 rounded-3xl p-10 text-center text-white shadow-2xl h-[600px] flex flex-col items-center justify-center hover:scale-105 transition-transform duration-300 cursor-pointer">
                <Sparkles size={64} className="mb-6 animate-pulse" />
                <h3 className="text-3xl font-bold mb-4">50+ More Varieties</h3>
                <p className="text-lg mb-6 opacity-90">Explore our complete collection</p>
                <Button
                  size="lg"
                  className="bg-white text-orange-600 hover:bg-orange-50 font-bold shadow-xl"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  View Full Catalog
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </div>
            </div>
          </div>

          {/* Scroll Hint - Mobile */}
          <div className="lg:hidden text-center mt-6">
            <p className="text-sm text-gray-500 font-medium">
              ← Swipe to see more products →
            </p>
          </div>
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-4xl font-bold text-white mb-4">
            Need Custom Fragrances or Packaging?
          </h3>
          <p className="text-gray-300 text-lg mb-6 max-w-2xl mx-auto">
            We offer customized solutions for bulk orders. Contact us for special pricing and personalized options.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              className="bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 text-white font-bold shadow-2xl"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Request Custom Quote
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-bold"
              onClick={() => window.location.href = 'tel:+917067449775'}
            >
              Call: +91 7067449775
            </Button>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default ProductsSection;   