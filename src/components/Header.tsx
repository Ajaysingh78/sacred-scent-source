import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Mail, MapPin } from "lucide-react";
import logo from "../assets/logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll effect for header shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigationItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Products", href: "#products" },
    { label: "Why Choose Us", href: "#why-choose-us" },
    { label: "Contact", href: "#contact" },
  ];

  const contactInfo = [
    { icon: Phone, text: "+91 7067449775", href: "tel:+917067449775" },
    { icon: Mail, text: "namamiagarbati01@gmail.com", href: "mailto:namamiagarbati01@gmail.com" },
    { icon: MapPin, text: "Indore, Madhya Pradesh", href: "#contact" }
  ];

  return (
    <>
      {/* Top Bar - Desktop Only */}
      <div className="hidden lg:block bg-gradient-to-r from-orange-600 to-orange-500 text-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-10 text-sm">
            <div className="flex items-center gap-6">
              {contactInfo.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="flex items-center gap-2 hover:text-orange-100 transition-colors"
                >
                  <item.icon size={14} />
                  <span>{item.text}</span>
                </a>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <span className="text-orange-100">Wholesale & Bulk Orders Available</span>
              <div className="h-4 w-px bg-orange-300"></div>
              <span className="text-orange-100">ISO Certified Manufacturing</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${isScrolled ? "shadow-lg" : "shadow-md"
          }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo - Enhanced */}
            <a href="#home" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="flex items-center">
                  <img
                    src={logo}
                    alt="Website Logo"
                    className="h-12 w-auto" // adjust height as needed (h-8, h-10, h-16, etc.)
                  />
                </div>

                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                  Namami Enterprises
                </h1>
                <p className="text-xs text-gray-600 font-medium">Pure Fragrance Since 2005 • Premium Quality</p>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navigationItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="px-4 py-2 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all duration-200 font-medium relative group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-orange-600 group-hover:w-3/4 group-hover:left-1/8 transition-all duration-300"></span>
                </a>
              ))}
            </nav>

            {/* CTA Buttons - Desktop */}
            <div className="hidden lg:flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                className="border-orange-600 text-orange-600 hover:bg-orange-50"
                onClick={() => window.location.href = 'tel:+919876543210'}
              >
                <Phone size={16} className="mr-2" />
                Call Now
              </Button>
              <Button
                className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Get Quote
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden py-4 border-t border-gray-200 animate-in slide-in-from-top duration-300">
              <nav className="flex flex-col space-y-2">
                {navigationItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="px-4 py-3 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
                <div className="pt-4 space-y-2 px-4">
                  <Button
                    variant="outline"
                    className="w-full border-orange-600 text-orange-600 hover:bg-orange-50"
                    onClick={() => {
                      window.location.href = 'tel:+919876543210';
                      setIsMenuOpen(false);
                    }}
                  >
                    <Phone size={16} className="mr-2" />
                    Call Now
                  </Button>
                  <Button
                    className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white"
                    onClick={() => {
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                      setIsMenuOpen(false);
                    }}
                  >
                    Get Quote
                  </Button>
                </div>
                {/* Mobile Contact Info */}
                <div className="pt-4 mt-4 border-t border-gray-200 space-y-2 px-4">
                  {contactInfo.map((item, index) => (
                    <a
                      key={index}
                      href={item.href}
                      className="flex items-center gap-3 text-gray-600 hover:text-orange-600 py-2"
                    >
                      <item.icon size={18} />
                      <span className="text-sm">{item.text}</span>
                    </a>
                  ))}
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;