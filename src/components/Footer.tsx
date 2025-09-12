import { Button } from "@/components/ui/button";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Instagram, 
  Twitter, 
  Linkedin,
  MessageCircle
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: "Home", href: "#home" },
    { label: "About Us", href: "#about" },
    { label: "Products", href: "#products" },
    { label: "Why Choose Us", href: "#why-choose-us" },
    { label: "Contact", href: "#contact" },
  ];

  const productCategories = [
    "Sandalwood Incense",
    "Floral Fragrances", 
    "Traditional Agarbatti",
    "Wellness Collection",
    "Premium Range",
    "Custom Fragrances",
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  return (
    <footer className="bg-brown-dark text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 primary-gradient rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">A</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Namami Enterprises</h3>
                <p className="text-sm text-brown-light">Pure Fragrance Since 2005</p>
              </div>
            </div>
            
            <p className="text-brown-light mb-6 leading-relaxed">
              India's trusted manufacturer of premium incense sticks, serving wholesalers 
              and distributors across the country with authentic fragrances and unmatched quality.
            </p>

            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-brown/50 rounded-full flex items-center justify-center hover:bg-primary transition-smooth"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-brown-light hover:text-white transition-smooth"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Product Categories */}
          <div>
            <h4 className="text-lg font-bold mb-6">Our Products</h4>
            <ul className="space-y-3">
              {productCategories.map((category) => (
                <li key={category}>
                  <span className="text-brown-light hover:text-white transition-smooth cursor-pointer">
                    {category}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Phone className="text-primary mt-1" size={18} />
                <div>
                  <p className="text-brown-light">+91 7089899828</p>
                  <p className="text-brown-light">+91 7089899828</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Mail className="text-primary mt-1" size={18} />
                <div>
                  <p className="text-brown-light">pawangurjar@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="text-primary mt-1" size={18} />
                <div>
                  <p className="text-brown-light">
                    Plot No. 45, Industrial Area<br />
                    Indore, Madhya Pradesh - 160002
                  </p>
                </div>
              </div>
            </div>

            <Button 
              variant="whatsapp" 
              size="sm" 
              className="mt-6"
              onClick={() => window.open("https://wa.me/+917089899828", "_blank")}
            >
              <MessageCircle className="mr-2" size={16} />
              WhatsApp Us
            </Button>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-brown/30 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-brown-light text-sm mb-4 md:mb-0">
              <p>© {currentYear} Namami enterprises. All rights reserved.</p>
            </div>
            
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-brown-light hover:text-white transition-smooth">
                Privacy Policy
              </a>
              <a href="#" className="text-brown-light hover:text-white transition-smooth">
                Terms of Service
              </a>
              <a href="#" className="text-brown-light hover:text-white transition-smooth">
                Wholesale Terms
              </a>
            </div>
          </div>

          <div className="text-center mt-6 pt-6 border-t border-brown/20">
            <p className="text-brown-light text-sm">
              🏭 Made in India with Pride | 🌿 100% Natural Ingredients | 🚚 Pan India Delivery
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;