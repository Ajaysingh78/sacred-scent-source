import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Sparkles, Star, Package, ArrowRight } from "lucide-react";
import { useRef, useState } from "react";

// Image imports
import sandalwood from "@/assets/productimag1.png";
import rose from "@/assets/gulabimg.png";
import jasmine from "@/assets/mograimg.png";
import lavender from "@/assets/img11.png";
import mogra from "@/assets/img22.png";
import premiumMix from "@/assets/img33.png";
import gulab from "@/assets/img44.png";
import jasmine2 from "@/assets/img55.png";
import lavender2 from "@/assets/img66.png";
import mogra2 from "@/assets/img77.png";
import sandalwood2 from "@/assets/img99.png";
import rose2 from "@/assets/img21.png";
import jasmine3 from "@/assets/rose-incense.jpg";
import lavender3 from "@/assets/img22.png";
import mogra3 from "@/assets/img23.png";
import premiumMix3 from "@/assets/img24.png";
import sandalwood3 from "@/assets/img25.png";
import rose3 from "@/assets/img26.png";
import jasmine4 from "@/assets/img32.png";
import lavender4 from "@/assets/img34.png";
import mogra4 from "@/assets/img35.png";
import premiumMix4 from "@/assets/img36.png";
import sandalwood4 from "@/assets/img37.png";

type Product = {
  id: number;
  name: string;
  image: string;
  description: string;
  packaging: string;
  category: string;
  gradient: string;
  features: string[];
};

const ProductsSection = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [expandedView, setExpandedView] = useState(false);

  const products: Product[] = [
    {
      id: 1,
      name: "Chandan Classic",
      image: sandalwood,
      description: "Warm, creamy sandalwood crafted for calm — classic, meditative and timeless.",
      packaging: "50 sticks per box",
      category: "Premium",
      gradient: "from-amber-500 to-orange-600",
      features: ["Pure sandalwood", "Smooth burn", "Meditation grade"],
    },
    {
      id: 2,
      name: "Gulab Royale",
      image: rose,
      description: "Opulent rose bouquet with a velvety finish — romantic and refined for special spaces.",
      packaging: "50 sticks per box",
      category: "Floral",
      gradient: "from-pink-500 to-rose-600",
      features: ["Velvet rose accord", "Long-lasting", "Lux finish"],
    },
    {
      id: 3,
      name: "Mogra Heritage",
      image: jasmine,
      description: "Authentic mogra blossoms captured in a rich, traditional aroma for cultural moments.",
      packaging: "50 sticks per box",
      category: "Traditional",
      gradient: "from-orange-400 to-red-500",
      features: ["Festival favorite", "Real floral oils", "Heritage scent"],
    },
    {
      id: 4,
      name: "Signature Reserve",
      image: lavender,
      description: "House Signature refined — balanced, sophisticated and crafted for discerning tastes.",
      packaging: "60 sticks per box",
      category: "Special",
      gradient: "from-cyan-500 to-blue-600",
      features: ["Artisan blend", "Salon-grade", "Gift-worthy"],
    },
    {
      id: 5,
      name: "Utsav Fest",
      image: mogra,
      description: "Bright, celebratory notes made for gatherings — joyful, vibrant and memorable.",
      packaging: "50 sticks per box",
      category: "Traditional",
      gradient: "from-yellow-400 to-orange-500",
      features: ["Festive bouquet", "High sillage", "Cultural warmth"],
    },
    {
      id: 6,
      name: "DailyFresh",
      image: premiumMix,
      description: "Light, pleasant everyday aroma designed for continuous home use without overpowering.",
      packaging: "100 sticks per pack",
      category: "Daily Use",
      gradient: "from-green-400 to-teal-500",
      features: ["Economy pack", "Low intensity", "Daily comfort"],
    },
    {
      id: 7,
      name: "Magnet Aura",
      image: gulab,
      description: "An alluring, magnetic blend — warm top notes with a captivating heart that draws attention.",
      packaging: "50 sticks per box",
      category: "Special",
      gradient: "from-purple-500 to-pink-600",
      features: ["Attractive scent", "Long lasting", "Statement aroma"],
    },
    {
      id: 8,
      name: "Intimate Velvet",
      image: jasmine2,
      description: "Soft, sensual florals designed for cozy, romantic evenings — subtle and elegant.",
      packaging: "30 sticks per box",
      category: "Wellness",
      gradient: "from-rose-500 to-pink-500",
      features: ["Low smoke", "Subtle romance", "Cozy vibe"],
    },
    {
      id: 9,
      name: "Fantasia Premium",
      image: lavender2,
      description: "Exotic, multi-layered composition that transforms interiors into imaginative escapes.",
      packaging: "50 sticks per box",
      category: "Premium",
      gradient: "from-indigo-500 to-purple-600",
      features: ["Layered accords", "Complex profile", "Mood-lifting"],
    },
    {
      id: 10,
      name: "Utsav Primum Deluxe",
      image: mogra2,
      description: "Deluxe festival edition — richer base notes and premium longevity for special rituals.",
      packaging: "60 sticks per box",
      category: "Premium",
      gradient: "from-gold-400 to-amber-600",
      features: ["Deluxe blend", "Extended burn", "Premium packaging"],
    },
    {
      id: 11,
      name: "DailyFresh Eco",
      image: sandalwood2,
      description: "Eco-friendly daily aroma — gentle, natural and designed for sustained home use.",
      packaging: "100 sticks per pack",
      category: "Daily Use",
      gradient: "from-green-300 to-emerald-500",
      features: ["Eco materials", "Mild fragrance", "Value pack"],
    },
    {
      id: 12,
      name: "Signature Noir",
      image: rose2,
      description: "Dark, sophisticated signature with woody-amber undertones — bold yet refined.",
      packaging: "50 sticks per box",
      category: "Special",
      gradient: "from-slate-600 to-indigo-700",
      features: ["Bold profile", "Refined base", "Premium feel"],
    },
    {
      id: 13,
      name: "Jasmine Bliss",
      image: jasmine3,
      description: "Bright jasmine bloom with crisp top notes — fresh, joyful and uplifting.",
      packaging: "50 sticks per box",
      category: "Floral",
      gradient: "from-purple-400 to-pink-500",
      features: ["Pure jasmine oil", "Fresh top notes", "Garden-fresh"],
    },
    {
      id: 14,
      name: "Utsav Celebration",
      image: lavender3,
      description: "Celebratory medley tuned for joyous occasions — cheerful, aromatic and memorable.",
      packaging: "50 sticks per box",
      category: "Traditional",
      gradient: "from-amber-400 to-red-500",
      features: ["Party-ready", "Bright accords", "Memorable scent"],
    },
    {
      id: 15,
      name: "Intimate Whisper",
      image: mogra3,
      description: "Gentle intimate blend with whisper-soft florals — calming and evocative.",
      packaging: "30 sticks per box",
      category: "Wellness",
      gradient: "from-rose-400 to-pink-400",
      features: ["Subtle romance", "Soothing notes", "Low smoke"],
    },
    {
      id: 16,
      name: "Intimate Luxe",
      image: premiumMix3,
      description: "Luxury intimate blend with deeper floral heart and creamy base for long evenings.",
      packaging: "40 sticks per box",
      category: "Premium",
      gradient: "from-rose-600 to-maroon-500",
      features: ["Luxuriously smooth", "Creamy base", "Long lasting"],
    },
    {
      id: 17,
      name: "Fantasia Luxe",
      image: sandalwood3,
      description: "Luxe edition of Fantasia — richer textures and more pronounced exotic notes.",
      packaging: "50 sticks per box",
      category: "Special",
      gradient: "from-indigo-600 to-purple-700",
      features: ["Richer textures", "Exotic oils", "Premium experience"],
    },
    {
      id: 18,
      name: "Magnet Charisma",
      image: rose3,
      description: "Charismatic aroma with bold top notes and a warm, captivating base.",
      packaging: "50 sticks per box",
      category: "Special",
      gradient: "from-purple-500 to-fuchsia-600",
      features: ["Bold presence", "High sillage", "Memorable"],
    },
    {
      id: 19,
      name: "Chandan Royal",
      image: jasmine4,
      description: "Royal sandalwood with deeper resinous heart — rich, calming and premium-grade.",
      packaging: "50 sticks per box",
      category: "Premium",
      gradient: "from-amber-600 to-amber-700",
      features: ["Resinous heart", "Royal grade", "Meditative quality"],
    },
    {
      id: 20,
      name: "Mogra Temple",
      image: lavender4,
      description: "Temple-inspired mogra with spiritual depth and long-lasting floral reverence.",
      packaging: "50 sticks per box",
      category: "Traditional",
      gradient: "from-orange-400 to-red-600",
      features: ["Spiritual tone", "Long-lasting", "Ceremonial aroma"],
    },
    {
      id: 21,
      name: "Gulab Velvet",
      image: mogra4,
      description: "Velvety rose accord — soft, lush and elegantly finished for refined spaces.",
      packaging: "50 sticks per box",
      category: "Floral",
      gradient: "from-rose-500 to-pink-600",
      features: ["Velvet texture", "Elegant finish", "Soft sillage"],
    },
    {
      id: 22,
      name: "Kewda Exotic",
      image: premiumMix4,
      description: "Rare kewda flower essence — sweet, heady and unmistakably exotic.",
      packaging: "50 sticks per box",
      category: "Exotic",
      gradient: "from-yellow-400 to-amber-500",
      features: ["Distinctive kewda", "Heady aroma", "Exotic profile"],
    },
    {
      id: 23,
      name: "Champa Honey",
      image: sandalwood4,
      description: "Champa with honeyed florals and warm base — comforting, traditional and rich.",
      packaging: "50 sticks per box",
      category: "Traditional",
      gradient: "from-gold-400 to-amber-600",
      features: ["Honeyed florals", "Comforting base", "Cultural classic"],
    },
  ];

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: string } = {
      Premium: "💎",
      Floral: "🌸",
      Wellness: "🧘",
      Traditional: "🪔",
      Special: "⭐",
      "Daily Use": "🛒",
      Exotic: "🌺",
    };
    return icons[category] || "✨";
  };

  const handleWhatsAppRedirect = (productName: string) => {
    const message = encodeURIComponent(
      `Hello Team, I am interested in your ${productName} wholesale pricing.`
    );
    const whatsappUrl = `https://wa.me/917067449775?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  const ProductCard = ({ product, index }: { product: Product; index: number }) => (
    <div
      className="group/card flex-shrink-0 w-[320px] md:w-[360px]"
      style={{ animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both` }}
    >
      <div className="relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 h-full flex flex-col hover:-translate-y-2">
        {/* Image Section - Fixed Height with Object-Contain */}
        <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain p-4 transition-transform duration-700 group-hover/card:scale-110"
          />

          {/* Gradient Overlay */}
          <div
            className={`absolute inset-0 bg-gradient-to-t ${product.gradient} opacity-10 group-hover/card:opacity-20 transition-opacity duration-500`}
          />

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
          <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover/card:text-orange-600 transition-colors duration-300">
            {product.name}
          </h3>

          <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow">{product.description}</p>

          <div className="flex items-center gap-2 mb-4 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg px-3 py-2">
            <Package size={16} className="text-orange-600" />
            <span>{product.packaging}</span>
          </div>

          <div className="flex flex-wrap gap-2 mb-5">
            {product.features.map((feature, idx) => (
              <span key={idx} className="text-xs bg-orange-50 text-orange-700 px-3 py-1 rounded-full font-medium border border-orange-100">
                ✓ {feature}
              </span>
            ))}
          </div>

          <Button
            className={`w-full bg-gradient-to-r ${product.gradient} hover:shadow-xl text-white font-bold transition-all duration-300 group-hover/card:scale-105`}
            onClick={() => handleWhatsAppRedirect(product.name)}
          >
            Get Wholesale Price
            <ArrowRight className="ml-2 group-hover/card:translate-x-1 transition-transform" size={18} />
          </Button>
        </div>
      </div>
    </div>
  );

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
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Handcrafted with premium ingredients, each fragrance tells a unique story</p>
        </div>

        {/* Conditional Rendering: Carousel or Grid */}
        {!expandedView ? (
          <div className="relative group">
            {/* Left Scroll Button */}
            <button
              onClick={() => scroll("left")}
              className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 w-14 h-14 bg-white shadow-2xl rounded-full items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 border border-gray-200 -ml-7"
            >
              <ChevronLeft className="text-gray-700" size={28} />
            </button>

            {/* Right Scroll Button */}
            <button
              onClick={() => scroll("right")}
              className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 w-14 h-14 bg-white shadow-2xl rounded-full items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 border border-gray-200 -mr-7"
            >
              <ChevronRight className="text-gray-700" size={28} />
            </button>

            {/* Scrollable Products */}
            <div
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4 px-2"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {products.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
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
                    onClick={() => setExpandedView(true)}
                  >
                    View Full Catalog
                    <ArrowRight className="ml-2" size={20} />
                  </Button>
                </div>
              </div>
            </div>

            {/* Scroll Hint - Mobile */}
            <div className="lg:hidden text-center mt-6">
              <p className="text-sm text-gray-500 font-medium">← Swipe to see more products →</p>
            </div>
          </div>
        ) : (
          /* Grid View */
          <div>
            <div className="flex justify-center mb-8">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-orange-600 text-orange-600 hover:bg-orange-50 font-bold"
                onClick={() => setExpandedView(false)}
              >
                <ChevronLeft className="mr-2" size={20} />
                Back to Highlights
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </div>
        )}

        {/* Bottom CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-4xl font-bold text-white mb-4">Need Custom Fragrances or Packaging?</h3>
          <p className="text-gray-300 text-lg mb-6 max-w-2xl mx-auto">
            We offer customized solutions for bulk orders. Contact us for special pricing and personalized options.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              className="bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 text-white font-bold shadow-2xl"
              onClick={() => handleWhatsAppRedirect("Custom Order")}
            >
              Request Custom Quote
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-bold"
              onClick={() => window.open("tel:+917067449775", "_self")}
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
