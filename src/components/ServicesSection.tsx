import { useState } from 'react';
import { Wrench, Package, Headphones, TrendingUp, CheckCircle, Zap, Shield, Award, Download, Phone, MessageCircle, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

const MachinerySection = ({
  brandName = "Shree Shyam Agarbatti",
  primaryPhone = "+917067449775",
  whatsappLink = "https://wa.me/917067449775",
  location = "Khandwa, Madhya Pradesh",
  yearsInBusiness = "15+",
  brochureUrl = "#",
  machines = [],
  parts = [],
  services = []
}) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedGalleryImg, setSelectedGalleryImg] = useState(null);

  // Default data if not provided
  const defaultMachines = [
    {
      name: "Semi-Automatic Agarbatti Machine – Rocket Die",
      model: "RX-150",
      capacity: "10–15 kg/hr",
      speed: "100–150 strokes/min",
      power: "2 HP",
      voltage: "220 V",
      material: "Stainless Steel",
      automation: "Semi-Automatic",
      warranty: "12 months",
      leadTime: "7–10 days",
      priceNote: "Contact for latest wholesale pricing",
      badges: ["Low Power", "Easy Operation", "Durable SS"],
      images: [
        { src: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&q=80", alt: "RX-150 Agarbatti Making Machine" }
      ]
    },
    {
      name: "High-Speed Agarbatti Machine",
      model: "RX-250",
      capacity: "20–25 kg/hr",
      speed: "150–200 strokes/min",
      power: "3 HP",
      voltage: "220 V",
      material: "Stainless Steel",
      automation: "Semi-Automatic",
      warranty: "18 months",
      leadTime: "10–15 days",
      priceNote: "Best price for bulk orders",
      badges: ["High Speed", "Heavy Duty", "Premium Build"],
      images: [
        { src: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&q=80", alt: "RX-250 High Speed Machine" }
      ]
    },
    {
      name: "Compact Agarbatti Machine",
      model: "RX-100",
      capacity: "5–8 kg/hr",
      speed: "80–100 strokes/min",
      power: "1.5 HP",
      voltage: "220 V",
      material: "Stainless Steel",
      automation: "Semi-Automatic",
      warranty: "12 months",
      leadTime: "5–7 days",
      priceNote: "Ideal for home-based startups",
      badges: ["Compact", "Budget-Friendly", "Home Use"],
      images: [
        { src: "https://images.unsplash.com/photo-1581092583537-20d51876f86d?w=600&q=80", alt: "RX-100 Compact Machine" }
      ]
    }
  ];

  const defaultParts = [
    { name: "Rocket Die Set", compatibility: "RX series", image: "https://images.unsplash.com/photo-1581092583537-20d51876f86d?w=400&q=80", inStock: true, category: "Rocket Die" },
    { name: "Motor 2 HP", compatibility: "All models", image: "https://images.unsplash.com/photo-1581092918484-8313a1b1b5e1?w=400&q=80", inStock: true, category: "Motors" },
    { name: "Conveyor Belt", compatibility: "Custom sizes", image: "https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=400&q=80", inStock: false, category: "Conveyors" },
    { name: "Electrical Panel", compatibility: "RX-150, RX-250", image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&q=80", inStock: true, category: "Electrical" },
    { name: "Spare Gear Set", compatibility: "All models", image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&q=80", inStock: true, category: "Consumables" },
    { name: "Stainless Steel Frame", compatibility: "RX-150", image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=400&q=80", inStock: true, category: "Rocket Die" }
  ];

  const defaultServices = [
    { title: "On-Site Installation", description: "Expert technicians install and calibrate your machinery", icon: Wrench },
    { title: "Hands-On Training", description: "Comprehensive training for operators and maintenance staff", icon: TrendingUp },
    { title: "Lifetime Phone Support", description: "24/7 helpline for troubleshooting and technical queries", icon: Headphones },
    { title: "Video Training Library", description: "Access to detailed operation and maintenance videos", icon: Package },
    { title: "AMC Plans", description: "Annual maintenance contracts for hassle-free operations", icon: Shield },
    { title: "Quick Parts Delivery", description: "Fast dispatch of genuine spare parts across India", icon: Zap }
  ];

  const machinesData = machines.length > 0 ? machines : defaultMachines;
  const partsData = parts.length > 0 ? parts : defaultParts;
  const servicesData = services.length > 0 ? services : defaultServices;

  const filters = ['All', 'Rocket Die', 'Motors', 'Conveyors', 'Electrical', 'Consumables'];
  const filteredParts = activeFilter === 'All' 
    ? partsData 
    : partsData.filter(p => p.category === activeFilter);

  const galleryImages = [
    { src: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&q=80", alt: "Agarbatti manufacturing factory floor" },
    { src: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80", alt: "Semi-automatic rocket die machine in operation" },
    { src: "https://images.unsplash.com/photo-1581092583537-20d51876f86d?w=800&q=80", alt: "Machinery parts and spares inventory" },
    { src: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=800&q=80", alt: "Quality control inspection of machines" },
    { src: "https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=800&q=80", alt: "Packaging and dispatch facility" },
    { src: "https://images.unsplash.com/photo-1581092918484-8313a1b1b5e1?w=800&q=80", alt: "Customer training session" }
  ];

  const faqs = [
    {
      q: "What is the minimum order quantity for machines?",
      a: "We accept orders starting from just 5 machines, making it affordable for startups and small businesses to begin their agarbatti manufacturing journey."
    },
    {
      q: "Do you provide installation and training?",
      a: "Yes, we provide complete installation guidance (on-site or remote), hands-on operator training, and video tutorials. Lifetime phone support is included with every machine purchase."
    },
    {
      q: "What is the warranty period?",
      a: "Our machines come with 12-18 months warranty depending on the model. Extended AMC plans are available for continued support and maintenance."
    },
    {
      q: "How quickly can you deliver machines to Madhya Pradesh?",
      a: `We are based in ${location} and offer same-state delivery within 7-10 days. Pan-India delivery available with proper packaging and logistics support.`
    },
    {
      q: "Are spare parts readily available?",
      a: "Yes, we maintain stock of all critical spare parts including rocket die sets, motors, conveyors, and electrical components for immediate dispatch across India."
    },
    {
      q: "What power supply is required?",
      a: "Our machines run on standard 220V single-phase power supply, consuming 1.5 HP to 3 HP depending on the model. No special electrical setup needed."
    }
  ];

  return (
    <section id="machinery-services" className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Trust Badges Strip */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 pb-8 border-b border-gray-200">
          <Badge variant="outline" className="px-4 py-2 text-sm font-semibold border-green-500 text-green-700">
            <CheckCircle size={16} className="mr-2" /> {yearsInBusiness} Years in Business
          </Badge>
          <Badge variant="outline" className="px-4 py-2 text-sm font-semibold border-blue-500 text-blue-700">
            <Shield size={16} className="mr-2" /> Pan-India Delivery
          </Badge>
          <Badge variant="outline" className="px-4 py-2 text-sm font-semibold border-orange-500 text-orange-700">
            <Award size={16} className="mr-2" /> MOQ: Just 5 Pieces
          </Badge>
          <Badge variant="outline" className="px-4 py-2 text-sm font-semibold border-purple-500 text-purple-700">
            <Zap size={16} className="mr-2" /> Lifetime Support
          </Badge>
        </div>

        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold mb-4">
            Machinery • Parts • Services
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Complete Agarbatti Manufacturing Solutions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From semi-automatic machines to spare parts and expert support—everything you need to start and scale your agarbatti business in {location}
          </p>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="machines" className="mb-16">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 mb-8">
            <TabsTrigger value="machines" className="text-base font-semibold">
              <Wrench size={18} className="mr-2" /> Machines
            </TabsTrigger>
            <TabsTrigger value="parts" className="text-base font-semibold">
              <Package size={18} className="mr-2" /> Parts
            </TabsTrigger>
            <TabsTrigger value="services" className="text-base font-semibold">
              <Headphones size={18} className="mr-2" /> Services
            </TabsTrigger>
          </TabsList>

          {/* MACHINES TAB */}
          <TabsContent value="machines">
            <div className="mb-8">
              <h3 className="text-3xl font-bold text-gray-900 mb-3">Semi-Automatic Agarbatti Making Machines</h3>
              <p className="text-lg text-gray-600">High-capacity machines built with stainless steel. Perfect for startups and growing businesses across India.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {machinesData.map((machine, idx) => (
                <Card key={idx} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="relative" style={{ height: '240px' }}>
                    <img 
                      src={machine.images[0].src} 
                      alt={machine.images[0].alt}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3 flex flex-col gap-2">
                      {machine.badges.map((badge, i) => (
                        <Badge key={i} className="bg-green-500 text-white shadow-lg">{badge}</Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <h4 className="text-xl font-bold text-gray-900 mb-1">{machine.name}</h4>
                    <p className="text-sm text-gray-500 mb-4">Model: {machine.model}</p>
                    
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="bg-gray-50 rounded p-2">
                        <p className="text-xs text-gray-500">Capacity</p>
                        <p className="text-sm font-semibold text-gray-900">{machine.capacity}</p>
                      </div>
                      <div className="bg-gray-50 rounded p-2">
                        <p className="text-xs text-gray-500">Speed</p>
                        <p className="text-sm font-semibold text-gray-900">{machine.speed}</p>
                      </div>
                      <div className="bg-gray-50 rounded p-2">
                        <p className="text-xs text-gray-500">Power</p>
                        <p className="text-sm font-semibold text-gray-900">{machine.power}</p>
                      </div>
                      <div className="bg-gray-50 rounded p-2">
                        <p className="text-xs text-gray-500">Warranty</p>
                        <p className="text-sm font-semibold text-gray-900">{machine.warranty}</p>
                      </div>
                    </div>

                    <p className="text-sm text-orange-600 font-semibold mb-4">{machine.priceNote}</p>

                    <div className="flex gap-2">
                      <Button 
                        className="flex-1 bg-orange-500 hover:bg-orange-600"
                        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                      >
                        Get Quote
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => window.location.href = `tel:${primaryPhone}`}
                      >
                        <Phone size={16} />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Comparison Table */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Compare Models</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th scope="col" className="py-3 px-4 font-semibold text-gray-700">Specification</th>
                      {machinesData.slice(0, 3).map((m, i) => (
                        <th key={i} scope="col" className="py-3 px-4 font-semibold text-gray-700">{m.model}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <th scope="row" className="py-3 px-4 font-medium text-gray-600">Capacity</th>
                      {machinesData.slice(0, 3).map((m, i) => (
                        <td key={i} className="py-3 px-4">{m.capacity}</td>
                      ))}
                    </tr>
                    <tr className="border-b border-gray-100">
                      <th scope="row" className="py-3 px-4 font-medium text-gray-600">Speed</th>
                      {machinesData.slice(0, 3).map((m, i) => (
                        <td key={i} className="py-3 px-4">{m.speed}</td>
                      ))}
                    </tr>
                    <tr className="border-b border-gray-100">
                      <th scope="row" className="py-3 px-4 font-medium text-gray-600">Power</th>
                      {machinesData.slice(0, 3).map((m, i) => (
                        <td key={i} className="py-3 px-4">{m.power}</td>
                      ))}
                    </tr>
                    <tr className="border-b border-gray-100">
                      <th scope="row" className="py-3 px-4 font-medium text-gray-600">Automation</th>
                      {machinesData.slice(0, 3).map((m, i) => (
                        <td key={i} className="py-3 px-4">{m.automation}</td>
                      ))}
                    </tr>
                    <tr>
                      <th scope="row" className="py-3 px-4 font-medium text-gray-600">Warranty</th>
                      {machinesData.slice(0, 3).map((m, i) => (
                        <td key={i} className="py-3 px-4">{m.warranty}</td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          {/* PARTS TAB */}
          <TabsContent value="parts">
            <div className="mb-8">
              <h3 className="text-3xl font-bold text-gray-900 mb-3">Genuine Machinery Parts & Spares</h3>
              <p className="text-lg text-gray-600">Rocket die sets, motors, conveyors, and all spare parts. Quick delivery with quality guarantee.</p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2 mb-8">
              {filters.map(filter => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-full font-medium transition-all ${
                    activeFilter === filter 
                      ? 'bg-orange-500 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredParts.map((part, idx) => (
                <Card key={idx} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative" style={{ height: '180px' }}>
                    <img 
                      src={part.image} 
                      alt={`${part.name} for agarbatti machine`}
                      className="w-full h-full object-cover"
                    />
                    {part.inStock ? (
                      <Badge className="absolute top-2 right-2 bg-green-500">In Stock</Badge>
                    ) : (
                      <Badge className="absolute top-2 right-2 bg-red-500">Out of Stock</Badge>
                    )}
                  </div>
                  
                  <div className="p-4">
                    <h4 className="font-bold text-gray-900 mb-1">{part.name}</h4>
                    <p className="text-sm text-gray-500 mb-3">{part.compatibility}</p>
                    
                    <Button 
                      size="sm" 
                      className="w-full bg-orange-500 hover:bg-orange-600"
                      onClick={() => window.open(whatsappLink, '_blank')}
                      disabled={!part.inStock}
                    >
                      <MessageCircle size={14} className="mr-2" />
                      {part.inStock ? 'Order Part' : 'Notify Me'}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* SERVICES TAB */}
          <TabsContent value="services">
            <div className="mb-8">
              <h3 className="text-3xl font-bold text-gray-900 mb-3">Complete Installation & Training Support</h3>
              <p className="text-lg text-gray-600">From installation to AMC plans, we ensure your machinery runs smoothly with lifetime assistance.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {servicesData.map((service, idx) => {
                const Icon = service.icon;
                return (
                  <Card key={idx} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="text-orange-600" size={24} />
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">{service.title}</h4>
                    <p className="text-gray-600">{service.description}</p>
                  </Card>
                );
              })}
            </div>

            {/* Service Highlights Banner */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Why Choose Our Services?</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-green-300 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold mb-1">Free Installation Guidance</p>
                    <p className="text-sm text-blue-100">Step-by-step setup support via phone or on-site</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-green-300 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold mb-1">Operator Training Included</p>
                    <p className="text-sm text-blue-100">Hands-on training for your team members</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-green-300 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold mb-1">24/7 Technical Helpline</p>
                    <p className="text-sm text-blue-100">Call anytime for troubleshooting assistance</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-green-300 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold mb-1">Annual Maintenance Plans</p>
                    <p className="text-sm text-blue-100">Preventive maintenance contracts available</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Gallery Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Facility & Equipment</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((img, idx) => (
              <div 
                key={idx} 
                className="relative overflow-hidden rounded-lg cursor-pointer group"
                style={{ height: '220px' }}
                onClick={() => setSelectedGalleryImg(img)}
              >
                <img 
                  src={img.src} 
                  alt={img.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300" />
              </div>
            ))}
          </div>
        </div>

        {/* Gallery Lightbox */}
        {selectedGalleryImg && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedGalleryImg(null)}
          >
            <button 
              className="absolute top-4 right-4 text-white hover:text-gray-300"
              onClick={() => setSelectedGalleryImg(null)}
            >
              <X size={32} />
            </button>
            <img 
              src={selectedGalleryImg.src} 
              alt={selectedGalleryImg.alt}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        )}

        {/* FAQs */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h3>
          <Accordion type="single" collapsible className="max-w-3xl mx-auto">
            {faqs.map((faq, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`}>
                <AccordionTrigger className="text-left font-semibold">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* CTA Strip */}
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl p-8 text-center text-white mb-8">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Start Your Agarbatti Business?
          </h3>
          <p className="text-lg mb-6 max-w-2xl mx-auto text-orange-50">
            Get expert guidance on machinery selection, pricing, and business setup. Our team is ready to help.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              size="lg"
              className="bg-white text-orange-600 hover:bg-orange-50 font-bold shadow-xl"
              onClick={() => window.location.href = `tel:${primaryPhone}`}
            >
              <Phone size={20} className="mr-2" />
              Call {primaryPhone}
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-orange-600 font-bold"
              onClick={() => window.open(whatsappLink, '_blank')}
            >
              <MessageCircle size={20} className="mr-2" />
              WhatsApp Us
            </Button>
          </div>
        </div>

        {/* Brochure Download */}
        {brochureUrl && brochureUrl !== '#' && (
          <div className="text-center">
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-orange-500 text-orange-600 hover:bg-orange-50 font-semibold"
              onClick={() => window.open(brochureUrl, '_blank')}
            >
              <Download size={20} className="mr-2" />
              Download Complete Brochure
            </Button>
          </div>
        )}

        {/* Mobile Sticky CTA Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-orange-500 p-3 flex gap-2 shadow-2xl lg:hidden z-40">
          <Button 
            className="flex-1 bg-orange-500 hover:bg-orange-600 font-bold"
            onClick={() => window.location.href = `tel:${primaryPhone}`}
          >
            <Phone size={18} className="mr-2" />
            Call Now
          </Button>
          <Button 
            className="flex-1 bg-green-500 hover:bg-green-600 font-bold"
            onClick={() => window.open(whatsappLink, '_blank')}
          >
            <MessageCircle size={18} className="mr-2" />
            WhatsApp
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MachinerySection;