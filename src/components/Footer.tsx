import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
import {
  Phone,
  Mail,
  MapPin,
  Instagram,
  MessageCircle,
  ShoppingBag
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

  // ✅ Only two links as per your request
  const socialLinks = [
    { icon: Instagram, href: "https://www.instagram.com/namamienterprises?igsh=MXBoMnFoMWxhNTNtaA==", label: "Instagram" },
    { icon: ShoppingBag, href: "https://IndiaMART.in/aZowVKpm", label: "IndiaMART" },
  ];

  return (
    <footer className="bg-brown-dark text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6 group">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 via-orange-400 to-amber-400 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300 rotate-6 group-hover:rotate-0 overflow-hidden">
                  <img
                    src={logo}
                    alt="Namami Enterprises logo"
                    className="w-full h-full object-cover rounded-2xl"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div
                  className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white shadow-md animate-pulse"
                  aria-hidden="true"
                />
              </div>
              <div>
                <h1 className="text-2xl font-extrabold bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 bg-clip-text text-transparent group-hover:from-orange-700 group-hover:to-amber-600 transition-all duration-300">
                  Namami Enterprises
                </h1>
                {/* 'Since' removed as requested */}
                <p className="text-sm text-brown-light">Pure Fragrance • Wholesale</p>
              </div>
            </div>

            <p className="text-brown-light mb-6 leading-relaxed">
              India&apos;s trusted manufacturer of premium incense sticks, serving wholesalers
              and distributors across the country with authentic fragrances and unmatched quality.
            </p>

            {/* ✅ Only Instagram and IndiaMART */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-brown/50 rounded-full flex items-center justify-center hover:bg-primary transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={social.label}
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
                  <p className="text-brown-light">+91 7067449775</p>
                  <p className="text-brown-light">+91 7089899828</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Mail className="text-primary mt-1" size={18} />
                <div>
                  <p className="text-brown-light">namamiagarbati01@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="text-primary mt-1" size={18} />
                <div>
                  <p className="text-brown-light">
                    95A, Ved Mata Gayatri Nagar<br />
                    SDA Compound, Indore (M.P.), India
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
