import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle, 
  Clock,
  Send,
  Building2,
  CheckCircle2
} from "lucide-react";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.message) {
      toast({
        title: "Please fill required fields",
        description: "Name, phone, and message are required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    setTimeout(() => {
      toast({
        title: "✅ Inquiry Submitted Successfully!",
        description: "Our team will contact you within 24 hours for bulk order details.",
      });
      
      setFormData({ name: "", phone: "", email: "", message: "" });
      setIsSubmitting(false);
    }, 1000);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactDetails = [
    {
      icon: Phone,
      title: "Phone Numbers",
      items: ["+91 7067449775", "+91 7089899828"],
      action: "tel:+917067449775",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      icon: Mail,
      title: "Email Address",
      items: ["namamiagarbati01@gmail.com"],
      action: "mailto:namamiagarbati01@gmail.com",
      gradient: "from-orange-500 to-orange-600"
    },
    {
      icon: MapPin,
      title: "Factory Address",
      items: ["95A, Ved Mata Gayatri Nagar, SDA Compound, Indore (M.P.)-452010, India"],
      action: "https://maps.app.goo.gl/rvPwYmVFMWhzwXyT9",
      gradient: "from-red-500 to-red-600"
    },
    {
      icon: Clock,
      title: "Business Hours",
      items: ["Monday - Saturday: 9:00 AM - 6:00 PM", "Sunday: 10:00 AM - 4:00 PM"],
      gradient: "from-green-500 to-green-600"
    }
  ];

  return (
    <section id="contact" className="relative py-24 bg-gradient-to-b from-orange-50 via-white to-orange-50 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-400 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-orange-100 px-4 py-2 rounded-full mb-6">
            <MessageCircle className="text-orange-600" size={18} />
            <span className="text-sm font-semibold text-orange-600">Let's Connect</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              Get in Touch
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Ready to start your wholesale partnership? Contact us for bulk orders, competitive pricing, and custom requirements
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-orange-100">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                <Building2 className="text-orange-600" size={28} />
                Why Choose Us?
              </h3>
              <div className="space-y-3">
                {[
                  "Direct manufacturer - Best wholesale prices",
                  "Bulk orders: 5 tons, 10 tons, 20 tons available",
                  "Pan-India and international delivery",
                  "Quality guaranteed on every batch",
                  "Quick response within 24 hours"
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="text-green-500 flex-shrink-0 mt-1" size={20} />
                    <p className="text-gray-600">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {contactDetails.map((detail, index) => (
                <Card 
                  key={index}
                  className="bg-white hover:shadow-xl transition-all duration-300 border-l-4 border-orange-500 group cursor-pointer"
                  onClick={() => detail.action && window.open(detail.action, detail.action.startsWith('http') ? '_blank' : '_self')}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`w-14 h-14 bg-gradient-to-br ${detail.gradient} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        <detail.icon className="text-white" size={24} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-800 mb-2 text-lg">{detail.title}</h4>
                        {detail.items.map((item, idx) => (
                          <p key={idx} className="text-gray-600 leading-relaxed">
                            {item}
                          </p>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white shadow-2xl shadow-green-500/50 border-0">
              <CardContent className="p-8">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center flex-shrink-0">
                    <MessageCircle size={32} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-xl mb-2">Quick WhatsApp Support</h4>
                    <p className="text-green-50 text-sm mb-4">
                      Get instant responses to your queries. We're online and ready to help!
                    </p>
                    <Button 
                      className="bg-white text-green-600 hover:bg-green-50 font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                      onClick={() => window.open("https://wa.me/+917089899828", "_blank")}
                    >
                      <MessageCircle className="mr-2" size={18} />
                      Chat on WhatsApp
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-white shadow-2xl border-0 rounded-3xl overflow-hidden">
            <div className="bg-gradient-to-r from-orange-600 to-amber-600 p-8 text-white">
              <h3 className="text-3xl font-bold mb-2">Send Us a Message</h3>
              <p className="text-orange-50">Fill out the form and we'll get back to you within 24 hours</p>
            </div>
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-gray-700 font-semibold mb-2 block">
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className="h-12 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-gray-700 font-semibold mb-2 block">
                      Phone Number *
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 XXXXX XXXXX"
                      className="h-12 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" className="text-gray-700 font-semibold mb-2 block">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    className="h-12 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="text-gray-700 font-semibold mb-2 block">
                    Your Requirements *
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your requirements: quantities needed, preferred fragrances, delivery location, timeline, etc."
                    rows={6}
                    className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 resize-none"
                  />
                </div>

                <Button 
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full h-14 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2" size={20} />
                      Send Inquiry Now
                    </>
                  )}
                </Button>

                <p className="text-center text-sm text-gray-500">
                  By submitting, you agree to receive communications from Namami Enterprises
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-200">
          <div className="bg-gradient-to-r from-orange-600 to-amber-600 p-6 text-white">
            <h3 className="text-2xl font-bold mb-2 flex items-center gap-3">
              <MapPin size={28} />
              Visit Our Factory
            </h3>
            <p className="text-orange-50">Factory visits welcome by prior appointment</p>
          </div>
          
          <div className="relative w-full h-[500px]">
            <iframe
              src="https://www.google.com/maps?q=95A%2C%20Ved%20Mata%20Gayatri%20Nagar%2C%20SDA%20Compound%2C%20Indore%2C%20Madhya%20Pradesh%20452010&z=19&hl=en&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Namami Enterprises Factory Location"
            ></iframe>
          </div>

          <div className="p-6 bg-gray-50 border-t border-gray-200">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-center md:text-left">
                <p className="font-semibold text-gray-800 mb-1">📍 Factory Address</p>
                <p className="text-gray-600">95A, Ved Mata Gayatri Nagar, SDA Compound, Indore (M.P.)-452010, India</p>
              </div>
              <Button
                variant="outline"
                className="border-orange-600 text-orange-600 hover:bg-orange-50 font-semibold"
                onClick={() => window.open("https://maps.app.goo.gl/rvPwYmVFMWhzwXyT9", "_blank")}
              >
                <MapPin className="mr-2" size={18} />
                Open in Google Maps
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
