import { useEffect } from 'react';
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProductsSection from "@/components/ProductsSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ServicesSection from "@/components/ServicesSection";

const Index = () => {
  useEffect(() => {
    // Dynamic Page Title
    document.title = "Namami Enterprises - Premium Agarbatti Manufacturer & Wholesale Supplier in Indore | ISO Certified Since 2020";

    // Meta Description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Leading ISO certified agarbatti manufacturer in Indore, MP. Premium quality incense sticks, dhoop sticks & sambrani cups. Wholesale rates available. 1000+ satisfied dealers across India. Call: +91 7067449775');
    }

    // Open Graph Tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', 'Namami Enterprises - Premium Agarbatti Manufacturer in Indore | ISO Certified');
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', 'ISO certified agarbatti manufacturer. Premium quality incense sticks, wholesale & bulk orders available. 1000+ satisfied dealers. Contact: +91 7067449775');
    }

    // Twitter Card Tags
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', 'Namami Enterprises - Premium Agarbatti Manufacturer');
    }

    // Canonical URL
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', 'https://namamienterprises.in/');
    }

    // Add hreflang if not present
    if (!document.querySelector('link[rel="alternate"][hreflang="en"]')) {
      const hreflangEn = document.createElement('link');
      hreflangEn.rel = 'alternate';
      hreflangEn.hreflang = 'en';
      hreflangEn.href = 'https://namamienterprises.in/';
      document.head.appendChild(hreflangEn);
    }

    // Performance: Lazy loading images observer
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          img.src = img.dataset.src || '';
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));

    // Add structured data for WebSite (Search Box)
    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Namami Enterprises",
      "url": "https://namamienterprises.in",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://namamienterprises.in/search?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    };

    let websiteScript = document.querySelector('script[data-schema="website"]') as HTMLScriptElement;
    if (!websiteScript) {
      websiteScript = document.createElement('script');
      websiteScript.type = 'application/ld+json';
      websiteScript.setAttribute('data-schema', 'website');
      document.head.appendChild(websiteScript);
    }
    websiteScript.textContent = JSON.stringify(websiteSchema);

    // Add viewport height CSS variable for mobile
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    setVH();
    window.addEventListener('resize', setVH);

    // Cleanup
    return () => {
      window.removeEventListener('resize', setVH);
      imageObserver.disconnect();
    };
  }, []);

  /**
   * WhatsApp helper
   * - Uses international phone without '+' and non-digit chars for wa.me/web.whatsapp
   * - Prepares a default message (user can edit) and opens in new tab/window
   */
  const openWhatsApp = () => {
    // target phone in international format without plus or dashes: 917067449775
    const phone = "917067449775";
    const defaultMessage = "Hello Namami Enterprises! I would like to enquire about your agarbatti products and wholesale rates.";
    const encodedMessage = encodeURIComponent(defaultMessage);

    // wa.me works both on mobile and desktop (if desktop, opens web.whatsapp)
    const waUrl = `https://wa.me/${phone}?text=${encodedMessage}`;

    // open in new tab/window (user gesture)
    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Skip to main content for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:p-4 focus:bg-primary focus:text-white"
      >
        Skip to main content
      </a>

      <Header />
      
      <main id="main-content" role="main" aria-label="Main content">
        {/* Hero Section - Primary CTA */}
        <HeroSection />
        
        {/* About Section */}
        <AboutSection />
        
        {/* Products Section - Core offering */}
        <ProductsSection />
        
        {/* Services Section */}
        <ServicesSection />
        
        {/* Why Choose Us Section */}
        <WhyChooseUsSection />
        
        {/* Contact Section - Secondary CTA */}
        <ContactSection />
      </main>
      
      <Footer />
      
      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-4 right-4 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary/90 transition-all duration-300 z-40 hidden md:block"
        aria-label="Back to top"
        title="Back to top"
      >
        ↑
      </button>

      {/* WhatsApp Floating Button */}
      <button
        onClick={openWhatsApp}
        aria-label="Chat on WhatsApp with Namami Enterprises"
        title="Chat on WhatsApp"
        className="fixed bottom-20 right-4 md:right-6 bg-green-600 text-white p-3 rounded-full shadow-xl hover:scale-105 transform transition-all duration-200 z-50 flex items-center justify-center"
      >
        {/* WhatsApp SVG icon (accessible) */}
        <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" focusable="false" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.52 3.48A11.86 11.86 0 0012.03.25C6.13.25 1.5 4.88 1.5 10.78c0 1.93.5 3.76 1.45 5.37L.75 23.5l7.7-2.05c1.5.42 3.06.64 4.58.64 5.9 0 10.53-4.63 10.53-10.53 0-2.84-1.1-5.5-3.04-7.03z" fill="currentColor"/>
          <path d="M17.06 14.06c-.26-.13-1.54-.76-1.78-.84-.24-.08-.41-.13-.58.13-.17.26-.66.84-.81 1.01-.15.17-.3.19-.56.07-.26-.13-1.1-.41-2.09-1.29-.77-.69-1.29-1.54-1.44-1.8-.15-.26-.02-.4.11-.53.11-.11.26-.3.39-.45.13-.15.17-.26.26-.43.08-.17.04-.32-.02-.45-.07-.13-.58-1.4-.8-1.92-.21-.5-.43-.43-.59-.44-.15-.01-.32-.01-.49-.01-.17 0-.45.06-.69.32-.24.26-.92.9-.92 2.19 0 1.29.94 2.53 1.07 2.71.13.17 1.86 2.96 4.51 4.03 3.14 1.23 3.14.82 3.71.77.57-.05 1.86-.76 2.12-1.49.26-.73.26-1.36.18-1.49-.08-.13-.26-.17-.58-.3z" fill="#fff"/>
        </svg>
      </button>
    </div>
  );
};

export default Index;
