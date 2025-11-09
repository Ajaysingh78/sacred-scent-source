import { Wrench, Package, Headphones, Shield, Award, Zap, MessageCircle, CheckCircle, icons } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import React from "react";

import type { LucideProps } from "lucide-react"; // <-- use LucideProps


// Import machine images from assets
import machine1 from "@/assets/mimg1.jpeg";
import machine2 from "@/assets/mimg2.jpeg";
import machine3 from "@/assets/mimg3.jpeg";


// Import parts images from assets
import part1 from "@/assets/img44.png";
import part2 from "@/assets/img55.png";
import part3 from "@/assets/img66.png";
import part4 from "@/assets/img77.png";
import part5 from "@/assets/img99.png";
import part6 from "@/assets/img21.png";

type Machine = {
  id: number;
  name: string;
  image: string;
  description: string;
  specs: string[];
  gradient: string;
};

type Part = {
  id: number;
  name: string;
  image: string;
  material: string;
  compatibility: string;
  gradient: string;
};

type Service = {
  title: string;
  description: string;
  // icon accepts LucideProps (size, className, etc.)
  icon: React.ComponentType<LucideProps>;
};

const MachinerySection = () => {
  const whatsappNumber = "917067449775";

  const machines: Machine[] = [
    {
      id: 1,
      name: "Automatic Stick Machine",
      image: machine1,
      description: "High-speed automatic agarbatti making machine with precision control and consistent output.",
      specs: ["10-15 kg/hr", "2 HP Motor", "Stainless Steel"],
      gradient: "from-blue-500 to-cyan-600",
    },
    {
      id: 2,
      name: "Powder Mixing Machine",
      image: machine2,
      description: "Industrial-grade powder mixer for consistent agarbatti paste preparation and blending.",
      specs: ["50 kg capacity", "3 HP Motor", "SS Construction"],
      gradient: "from-purple-500 to-pink-600",
    },
    {
      id: 3,
      name: "Drying Chamber Unit",
      image: machine3,
      description: "Energy-efficient drying chamber with temperature control for perfect agarbatti finishing.",
      specs: ["500 sticks/batch", "Temperature Control", "Auto Timer"],
      gradient: "from-orange-500 to-red-600",
    },
   
  ];

  const parts: Part[] = [
    {
      id: 1,
      name: "Rocket Die Set",
      image: part1,
      material: "Stainless Steel 304",
      compatibility: "Compatible with all RX series machines",
      gradient: "from-blue-500 to-cyan-600",
    },
    {
      id: 2,
      name: "Motor Assembly",
      image: part2,
      material: "Industrial Grade",
      compatibility: "2 HP & 3 HP variants available",
      gradient: "from-purple-500 to-pink-600",
    },
    {
      id: 3,
      name: "Conveyor Belt",
      image: part3,
      material: "Heat Resistant",
      compatibility: "Custom sizes for all models",
      gradient: "from-orange-500 to-red-600",
    },
    {
      id: 4,
      name: "Control Panel",
      image: part4,
      material: "Digital Controller",
      compatibility: "Universal mounting system",
      gradient: "from-green-500 to-teal-600",
    },
    {
      id: 5,
      name: "Gear & Bearing Set",
      image: part5,
      material: "Chrome Steel",
      compatibility: "Precision engineered for smooth operation",
      gradient: "from-indigo-500 to-blue-600",
    },
    {
      id: 6,
      name: "Heating Element",
      image: part6,
      material: "Ceramic Core",
      compatibility: "For drying chambers and dryers",
      gradient: "from-amber-500 to-orange-600",
    },
  ];

  const services: Service[] = [
    {
      title: "On-Site Installation",
      description: "Expert technicians install and calibrate your machinery for optimal performance.",
      icon: Wrench,
    },
    {
      title: "Hands-On Training",
      description: "Comprehensive operator training for safe and efficient machine operation.",
      icon: Package,
    },
    {
      title: "24/7 Technical Support",
      description: "Round-the-clock helpline for troubleshooting and technical assistance.",
      icon: Headphones,
    },
    {
      title: "Quality Assurance",
      description: "All products undergo rigorous testing before delivery to ensure reliability.",
      icon: Shield,
    },
    {
      title: "Warranty & AMC",
      description: "Extended warranty options and annual maintenance contracts available.",
      icon: Award,
    },
    {
      title: "Fast Parts Delivery",
      description: "Quick dispatch of genuine spare parts across India with tracking.",
      icon: Zap,
    },
  ];

  const handleWhatsAppEnquiry = (productName: string, type: string = "machine") => {
    const message = encodeURIComponent(
      `Hello Team, I'm interested in the ${productName} ${type === "machine" ? "" : "spare part"}.`
    );
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  const ProductCard = ({ 
    image, 
    title, 
    description, 
    details, 
    gradient, 
    onEnquire 
  }: { 
    image: string; 
    title: string; 
    description: string; 
    details: string[]; 
    gradient: string; 
    onEnquire: () => void;
  }) => (
    <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-500 h-full flex flex-col">
      <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-contain p-4 transition-transform duration-700 group-hover:scale-110"
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-500`} />
      </div>

      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
          {title}
        </h3>
        
        <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow">
          {description}
        </p>

        <div className="space-y-2 mb-5">
          {details.map((detail, idx) => (
            <div key={idx} className="flex items-center gap-2 text-sm">
              <CheckCircle size={16} className="text-green-600 flex-shrink-0" />
              <span className="text-gray-700">{detail}</span>
            </div>
          ))}
        </div>

        <Button
          className={`w-full bg-gradient-to-r ${gradient} hover:shadow-xl text-white font-semibold transition-all duration-300 group-hover:scale-105`}
          onClick={onEnquire}
        >
          <MessageCircle size={18} className="mr-2" />
          Enquire on WhatsApp
        </Button>
      </div>
    </Card>
  );

  return (
    <section id="machinery-services" className="py-20 bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <Badge variant="outline" className="px-5 py-2.5 text-sm font-semibold border-2 border-blue-500 text-blue-700 bg-blue-50">
            <Shield size={18} className="mr-2" /> Pan-India Delivery
          </Badge>
          <Badge variant="outline" className="px-5 py-2.5 text-sm font-semibold border-2 border-orange-500 text-orange-700 bg-orange-50">
            <Award size={18} className="mr-2" /> MOQ: Just 5 Units
          </Badge>
          <Badge variant="outline" className="px-5 py-2.5 text-sm font-semibold border-2 border-purple-500 text-purple-700 bg-purple-50">
            <Zap size={18} className="mr-2" /> Lifetime Support
          </Badge>
        </div>

        {/* Main Header */}
        <div className="text-center mb-20">
          <div className="inline-block px-5 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold mb-4">
            Complete Manufacturing Solutions
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Machinery, Parts & <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">Expert Support</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to start and scale your agarbatti manufacturing business
          </p>
        </div>

        {/* MACHINES SECTION */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Wrench size={16} />
              <span>Machines We Offer</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Premium Agarbatti Manufacturing Machines
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              High-performance machines built with quality materials for consistent production
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {machines.map((machine) => (
              <ProductCard
                key={machine.id}
                image={machine.image}
                title={machine.name}
                description={machine.description}
                details={machine.specs}
                gradient={machine.gradient}
                onEnquire={() => handleWhatsAppEnquiry(machine.name, "machine")}
              />
            ))}
          </div>
        </div>

        {/* PARTS SECTION */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Package size={16} />
              <span>Spare Parts Available</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Genuine Spare Parts & Components
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              High-quality replacement parts for uninterrupted production
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {parts.map((part) => (
              <ProductCard
                key={part.id}
                image={part.image}
                title={part.name}
                description={part.compatibility}
                details={[part.material, "In Stock", "Fast Delivery"]}
                gradient={part.gradient}
                onEnquire={() => handleWhatsAppEnquiry(part.name, "part")}
              />
            ))}
          </div>
        </div>

        {/* SERVICES SECTION */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Headphones size={16} />
              <span>Our Services</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Complete Installation & Support
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From installation to maintenance, we ensure your success every step of the way
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {services.map((service, idx) => {
              const Icon = service.icon;
              return (
                <Card key={idx} className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="w-14 h-14 bg-gradient-to-br from-orange-100 to-amber-100 rounded-xl flex items-center justify-center mb-5">
                    <Icon className="text-orange-600" size={28} />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                </Card>
              );
            })}
          </div>

          {/* Service Highlights Banner */}
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-10 text-white shadow-2xl">
            <div className="text-center mb-8">
              <h4 className="text-2xl md:text-3xl font-bold mb-3">Why Choose Our Services?</h4>
              <p className="text-blue-100 text-lg">Comprehensive support that ensures your business runs smoothly</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <CheckCircle size={24} className="text-green-300 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-lg mb-2">Free Installation Guidance</p>
                  <p className="text-sm text-blue-100">Expert setup support via phone or on-site visit</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <CheckCircle size={24} className="text-green-300 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-lg mb-2">Operator Training Included</p>
                  <p className="text-sm text-blue-100">Comprehensive training for your team members</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <CheckCircle size={24} className="text-green-300 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-lg mb-2">24/7 Technical Helpline</p>
                  <p className="text-sm text-blue-100">Always available for troubleshooting assistance</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <CheckCircle size={24} className="text-green-300 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-lg mb-2">Annual Maintenance Plans</p>
                  <p className="text-sm text-blue-100">Preventive maintenance contracts available</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 rounded-3xl p-10 md:p-14 text-center text-white shadow-2xl">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Manufacturing Journey?
          </h3>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-orange-50">
            Get expert guidance on machinery selection, installation, and business setup
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              className="bg-white text-orange-600 hover:bg-orange-50 font-bold shadow-xl text-lg px-8 py-6"
              onClick={() => window.open(`https://wa.me/${whatsappNumber}`, "_blank")}
            >
              <MessageCircle size={22} className="mr-2" />
              WhatsApp Us Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-3 border-white text-white hover:bg-white hover:text-orange-600 font-bold text-lg px-8 py-6"
              onClick={() => window.open(`tel:+${whatsappNumber}`, "_self")}
            >
              Call: +91 7067449775
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MachinerySection;