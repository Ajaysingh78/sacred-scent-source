import { Wrench, Package, Headphones, TrendingUp, CheckCircle, Zap, Shield, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

const ServicesSection = () => {
  const machineryFeatures = [
    { label: "Production Capacity", value: "10-15 kg/hr" },
    { label: "Machine Speed", value: "100-150 strokes/min" },
    { label: "Material", value: "Stainless Steel" },
    { label: "Automation", value: "Semi Automatic" },
    { label: "Power Required", value: "2 HP" },
    { label: "Input Voltage", value: "220 V" },
  ];

  const services = [
    {
      icon: Wrench,
      title: "Agarbatti Machinery",
      description: "High-quality semi-automatic agarbatti making machines with rocket die system. Perfect for startups & small businesses.",
      features: ["Stainless Steel Build", "Low Power Consumption", "Easy Operation"],
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Package,
      title: "Machinery Parts & Spares",
      description: "Genuine replacement parts for all machinery types. Quick delivery with quality assurance and competitive pricing.",
      features: ["Rocket Die Parts", "Motors & Conveyors", "All Spare Parts"],
      color: "from-green-500 to-green-600"
    },
    {
      icon: Headphones,
      title: "Installation & Support",
      description: "Complete installation service with hands-on training. Lifetime technical support for all your queries and issues.",
      features: ["Free Installation Guide", "24/7 Phone Support", "Video Training"],
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: TrendingUp,
      title: "Business Consultation",
      description: "Expert guidance for agarbatti business setup. From machinery selection to production strategy & market entry.",
      features: ["Startup Strategy", "Production Planning", "Market Insights"],
      color: "from-orange-500 to-orange-600"
    },
  ];

  const whyChooseMachinery = [
    { icon: Zap, text: "Low Investment - High Returns" },
    { icon: Shield, text: "Durable Stainless Steel Construction" },
    { icon: Award, text: "Minimum Order: Just 5 Pieces" },
    { icon: CheckCircle, text: "Perfect for Startups & MSMEs" },
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold mb-4">
            Our Services
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Complete Business Solutions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From premium agarbatti products to machinery & business support - your one-stop partner for success
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100 hover:scale-105 group"
            >
              <div className={`w-14 h-14 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {service.description}
              </p>
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm text-gray-700">
                    <CheckCircle size={16} className="text-green-500 mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Machinery Spotlight */}
        <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left Side - Image */}
            <div className="p-8 lg:p-12">
              <div className="bg-white rounded-2xl p-6 shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&q=80"
                  alt="Agarbatti Making Machine"
                  className="w-full h-64 object-cover rounded-xl"
                />
                <div className="mt-4 p-4 bg-orange-50 rounded-xl">
                  <p className="text-sm font-semibold text-orange-600 mb-2">⚡ LIMITED OFFER</p>
                  <p className="text-lg font-bold text-gray-900">
                    Minimum Order: Only 5 Pieces
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side - Details */}
            <div className="p-8 lg:p-12 text-white">
              <h3 className="text-3xl font-bold mb-4">
                Semi-Automatic Agarbatti Making Machine
              </h3>
              <p className="text-lg mb-6 text-orange-100">
                Start your agarbatti business with our reliable, easy-to-use machinery. Perfect for entrepreneurs and small-scale industries.
              </p>

              {/* Specifications */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {machineryFeatures.map((feature, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                    <p className="text-xs text-orange-100 mb-1">{feature.label}</p>
                    <p className="font-bold text-sm">{feature.value}</p>
                  </div>
                ))}
              </div>

              {/* Why Choose */}
              <div className="space-y-3 mb-6">
                {whyChooseMachinery.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <item.icon size={20} className="text-green-300" />
                    <span className="text-sm font-medium">{item.text}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <Button
                  size="lg"
                  className="bg-white text-orange-600 hover:bg-orange-50 font-bold shadow-xl hover:scale-105 transition-all duration-300"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Get Machine Quote
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-orange-600 font-bold transition-all duration-300"
                  onClick={() => window.location.href = 'tel:+917067449775'}
                >
                  Call for Details
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Business Strategy Banner */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-3">
            🚀 Perfect for Startups & New Business Owners
          </h3>
          <p className="text-lg text-blue-100 mb-6 max-w-3xl mx-auto">
            Low investment, high returns. Start your agarbatti manufacturing business with minimal capital. 
            We provide everything you need - machinery, training, and ongoing support!
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm font-semibold">
            <div className="flex items-center gap-2">
              <CheckCircle size={20} className="text-green-300" />
              <span>No Technical Knowledge Required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={20} className="text-green-300" />
              <span>Quick ROI in 6-8 Months</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={20} className="text-green-300" />
              <span>Scalable Business Model</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;