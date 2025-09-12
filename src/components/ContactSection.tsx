import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Send
} from "lucide-react";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.phone || !formData.message) {
      toast({
        title: "Please fill required fields",
        description: "Name, phone, and message are required fields.",
        variant: "destructive",
      });
      return;
    }

    // Simulate form submission
    toast({
      title: "Inquiry Submitted Successfully!",
      description: "We'll contact you within 24 hours for bulk order details.",
    });

    // Reset form
    setFormData({ name: "", phone: "", email: "", message: "" });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Get in <span className="text-primary">Touch</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Ready to start your wholesale partnership? Contact us for bulk orders, pricing, and custom requirements
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Contact Information
              </h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Reach out to us for wholesale inquiries, bulk orders, or any questions about our products. 
                Our team is ready to assist you with the best deals and service.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 primary-gradient rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="text-primary-foreground" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Phone Numbers</h4>
                  <p className="text-muted-foreground">+91 98765 43210</p>
                  <p className="text-muted-foreground">+91 87654 32109</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 primary-gradient rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="text-primary-foreground" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Email Address</h4>
                  <p className="text-muted-foreground">sales@agarwoodcreations.com</p>
                  <p className="text-muted-foreground">info@agarwoodcreations.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 primary-gradient rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-primary-foreground" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Factory Address</h4>
                  <p className="text-muted-foreground">
                    Plot No. 45, Industrial Area Phase-II<br />
                    Chandigarh, Punjab - 160002, India
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 primary-gradient rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="text-primary-foreground" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Business Hours</h4>
                  <p className="text-muted-foreground">Monday - Saturday: 9:00 AM - 6:00 PM</p>
                  <p className="text-muted-foreground">Sunday: 10:00 AM - 4:00 PM</p>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <Card className="card-gradient border-green-200 shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <MessageCircle className="text-white" size={20} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground mb-1">Quick WhatsApp Support</h4>
                    <p className="text-muted-foreground text-sm">Get instant responses to your queries</p>
                  </div>
                  <Button 
                    variant="whatsapp" 
                    onClick={() => window.open("https://wa.me/+919876543210", "_blank")}
                  >
                    Chat Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="card-gradient border-0 shadow-warm">
            <CardHeader>
              <CardTitle className="text-2xl text-foreground">Send us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-foreground">
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      required
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-foreground">
                      Phone Number *
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                      required
                      className="mt-2"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" className="text-foreground">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="text-foreground">
                    Message *
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your requirements, quantities, preferred fragrances, etc."
                    rows={5}
                    required
                    className="mt-2"
                  />
                </div>

                <Button type="submit" variant="cta" size="lg" className="w-full">
                  <Send className="mr-2" size={20} />
                  Send Inquiry
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Map Placeholder */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
            Visit Our Factory
          </h3>
          <div className="bg-muted rounded-2xl p-8 text-center shadow-card">
            <MapPin className="mx-auto mb-4 text-muted-foreground" size={48} />
            <p className="text-muted-foreground mb-4">
              Interactive map will be embedded here showing our factory location
            </p>
            <p className="text-sm text-muted-foreground">
              Factory visits welcome by appointment only
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;