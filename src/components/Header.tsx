// src/components/Header.tsx
import React, { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Mail, MapPin, LogOut, ShoppingCart } from "lucide-react";
import logo from "@/assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, logout } = useAuth() as any;
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node | null;
      if (showUserMenu && target && !(target as HTMLElement).closest(".user-menu-container")) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showUserMenu]);

  const navigationItems = [
    { label: "Home", href: "#home", ariaLabel: "Navigate to homepage" },
    { label: "About", href: "#about", ariaLabel: "Learn about Namami Enterprises" },
    { label: "Products", href: "#products", ariaLabel: "View agarbatti products" },
    { label: "Services", href: "#services", ariaLabel: "Our manufacturing services" },
    { label: "Why Choose Us", href: "#why-choose-us", ariaLabel: "Why choose Namami Enterprises" },
    { label: "Contact", href: "#contact", ariaLabel: "Contact us for orders" },
  ];

  const contactInfo = [
    {
      icon: Phone,
      text: "+91 7067449775",
      href: "tel:+917067449775",
      ariaLabel: "Call Namami Enterprises at +91 7067449775",
    },
    {
      icon: Mail,
      text: "namamiagarbati01@gmail.com",
      href: "mailto:namamiagarbati01@gmail.com",
      ariaLabel: "Email Namami Enterprises",
    },
    {
      icon: MapPin,
      text: "Indore, Madhya Pradesh",
      href: "#contact",
      ariaLabel: "View location in Indore, Madhya Pradesh",
    },
  ];

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error("Logout failed:", err);
    }
    setShowUserMenu(false);
    navigate("/");
  };

  const getUserDisplayName = () => {
    if (!user) return "";
    return user.name?.split(" ")[0] || user.email?.split("@")[0] || "User";
  };

  const getUserInitial = () => {
    if (!user) return "";
    return (user.name?.[0] || user.email?.[0] || "U").toUpperCase();
  };

  // alias map: common fragment -> actual id on page
  const fragmentAliasMap: Record<string, string> = {
    services: "machinery-services", // fallback if your page uses a different id
    machinery: "machinery-services",
    products: "products",
    home: "home",
    about: "about",
    contact: "contact",
    "why-choose-us": "why-choose-us",
  };

  /**
   * scrollToHash
   * - robustly finds target by id / name / data attributes / aria-label / class fallback
   * - always performs a scroll (even if the hash is already the same)
   * - optional closeMenu to close mobile menu after clicking
   */
  const scrollToHash = useCallback((hash: string, closeMenu = false) => {
    const idRaw = hash.replace(/^#/, "");
    const triedIds = new Set<string>();
    triedIds.add(idRaw);

    // alias fallback (if page uses different id)
    if (fragmentAliasMap[idRaw] && fragmentAliasMap[idRaw] !== idRaw) {
      triedIds.add(fragmentAliasMap[idRaw]);
    }

    // try a few normalized variants
    triedIds.add(idRaw.toLowerCase());
    triedIds.add(idRaw.replace(/\s+/g, "-").toLowerCase());

    let target: Element | null = null;

    // 1) exact id or name
    for (const id of Array.from(triedIds)) {
      target = document.getElementById(id) || document.querySelector(`[name="${id}"]`);
      if (target) break;
    }

    // 2) try data-section / data-anchor attributes (common patterns)
    if (!target) {
      for (const id of Array.from(triedIds)) {
        target = document.querySelector(`[data-section="${id}"], [data-anchor="${id}"]`);
        if (target) break;
      }
    }

    // 3) try aria-labelledby or aria-label match (less reliable)
    if (!target) {
      for (const id of Array.from(triedIds)) {
        target = document.querySelector(`[aria-labelledby="${id}"], [aria-label="${id}"]`);
        if (target) break;
      }
    }

    // 4) try elements with class that contains the id (e.g., .section-services)
    if (!target) {
      for (const id of Array.from(triedIds)) {
        const maybe = document.querySelector(`[class*="${id}"]`);
        if (maybe) {
          target = maybe;
          break;
        }
      }
    }

    // If still not found: warn and just set hash (so user can copy link) and close menu
    if (!target) {
      console.warn(`Header: target not found for hash '#${idRaw}'. Tried: ${Array.from(triedIds).join(", ")}`);
      try {
        if (history && history.pushState) {
          history.pushState(null, "", `#${idRaw}`);
        } else {
          window.location.hash = `#${idRaw}`;
        }
      } catch (e) {
        // ignore
      }
      if (closeMenu) setIsMenuOpen(false);
      return;
    }

    // Compute offset to account for sticky header
    const headerEl = document.querySelector('header[role="banner"]') as HTMLElement | null;
    const headerHeight = headerEl ? headerEl.getBoundingClientRect().height : 0;
    const extraOffset = 12; // extra spacing

    const targetRect = (target as HTMLElement).getBoundingClientRect();
    const absoluteTop = window.scrollY + targetRect.top - headerHeight - extraOffset;
    const finalTop = Math.max(0, Math.floor(absoluteTop));

    // Always perform scroll, even if current hash equals target hash.
    window.scrollTo({ top: finalTop, behavior: "smooth" });

    // Update URL hash cleanly (so links are shareable)
    try {
      const newHash = `#${(target as HTMLElement).id || idRaw}`;
      if (history && history.pushState) {
        history.pushState(null, "", newHash);
      } else {
        // this may not trigger a hashchange if same, but we already scrolled above
        window.location.hash = newHash;
      }
    } catch (e) {
      // ignore
    }

    if (closeMenu) setIsMenuOpen(false);
  }, []);

  const handleNavClick = (e: React.MouseEvent, href: string, closeMenu = false) => {
    e.preventDefault();
    scrollToHash(href, closeMenu);
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // close any open menus
    setIsMenuOpen(false);
    setShowUserMenu(false);

    // scroll to top and set #home
    window.scrollTo({ top: 0, behavior: "smooth" });
    try {
      if (history && history.pushState) history.pushState(null, "", "#home");
      else window.location.hash = "#home";
    } catch (err) {
      // ignore
    }
  };

  return (
    <>
      {/* Top Bar - Desktop Only */}
      <div className="hidden lg:block bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 text-white" role="complementary">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-10 text-sm">
            <address className="flex items-center gap-6 not-italic">
              {contactInfo.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="flex items-center gap-2 hover:text-white hover:scale-105 transition-all duration-200"
                  aria-label={item.ariaLabel}
                  itemProp="contactPoint"
                  itemScope
                  itemType="https://schema.org/ContactPoint"
                >
                  <item.icon size={14} aria-hidden="true" />
                  <span className="font-medium" itemProp="contactType">{item.text}</span>
                </a>
              ))}
            </address>
            <div className="flex items-center gap-4">
              <span className="font-semibold">🎁 Wholesale & Bulk Orders Available</span>
              <div className="h-4 w-px bg-orange-300" aria-hidden="true" />
              <span className="font-semibold">Certified Manufacturing</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${isScrolled ? "shadow-xl" : "shadow-md"}`}
        role="banner"
        itemScope
        itemType="https://schema.org/WPHeader"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <a
              href="#home"
              onClick={handleLogoClick}
              className="flex items-center space-x-3 group"
              aria-label="Namami Enterprises - Premium Agarbatti Manufacturer"
              itemScope
              itemType="https://schema.org/Organization"
            >
              <link itemProp="url" href="https://namamienterprises.netlify.app" />
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 via-orange-400 to-amber-400 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300 rotate-6 group-hover:rotate-0 overflow-hidden">
                  <img
                    src={logo}
                    alt="Namami Enterprises - Leading Agarbatti Manufacturer in Indore"
                    className="w-full h-full object-cover rounded-2xl"
                    loading="eager"
                    decoding="async"
                    itemProp="logo"
                    width="56"
                    height="56"
                  />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-extrabold bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 bg-clip-text text-transparent group-hover:from-orange-700 group-hover:to-amber-600 transition-all duration-300" itemProp="name">
                  Namami Enterprises
                </h1>
                <p className="text-xs text-gray-600 font-semibold tracking-wide" itemProp="slogan">
                  Premium Quality • Trusted Partner
                </p>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1" role="navigation" aria-label="Main navigation" itemScope itemType="https://schema.org/SiteNavigationElement">
              {navigationItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="px-4 py-2 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all duration-200 font-semibold relative group"
                  aria-label={item.ariaLabel}
                  itemProp="url"
                >
                  <span itemProp="name">{item.label}</span>
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-orange-600 to-amber-500 group-hover:w-3/4 transition-all duration-300" aria-hidden="true" />
                </a>
              ))}
            </nav>

            {/* CTA Buttons - Desktop */}
            <div className="hidden lg:flex items-center gap-3">
              {user ? (
                <div className="relative user-menu-container">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowUserMenu(!showUserMenu);
                    }}
                    className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-orange-50 transition-all duration-300 group border-2 border-transparent hover:border-orange-200"
                    aria-label="User account menu"
                    aria-expanded={showUserMenu}
                    aria-haspopup="true"
                  >
                    <div className="relative">
                      {user.photoURL ? (
                        <img src={user.photoURL} alt={`${getUserDisplayName()}'s profile picture`} className="w-9 h-9 rounded-full object-cover ring-2 ring-orange-500 group-hover:ring-orange-600 transition-all duration-300" width={36} height={36} />
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white font-bold text-sm ring-2 ring-orange-500 group-hover:ring-orange-600 transition-all duration-300">
                          {getUserInitial()}
                        </div>
                      )}
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white" aria-hidden="true" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-bold text-gray-900 group-hover:text-orange-600 transition-colors">{getUserDisplayName()}</p>
                      <p className="text-xs text-gray-500">My Account</p>
                    </div>
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 animate-in slide-in-from-top-5 duration-200 z-50" role="menu" aria-label="User menu">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                          {user.photoURL ? (
                            <img src={user.photoURL} alt="Profile" className="w-12 h-12 rounded-full object-cover ring-2 ring-orange-500" width={48} height={48} />
                          ) : (
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white font-bold text-lg ring-2 ring-orange-500">
                              {getUserInitial()}
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-gray-900 truncate">{user.name || "User"}</p>
                            <p className="text-xs text-gray-500 truncate">{user.email}</p>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-gray-100 pt-2">
                        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors group" role="menuitem" aria-label="Logout from account">
                          <LogOut size={18} aria-hidden="true" />
                          <span className="font-medium">Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Button variant="outline" size="sm" className="border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white font-semibold transition-all duration-300" onClick={() => (window.location.href = "tel:+917067449775")} aria-label="Call now at +91 7067449775">
                    <Phone size={16} className="mr-2" aria-hidden="true" />
                    Call Now
                  </Button>
                  <Button className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 hover:from-orange-700 hover:to-amber-600 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300" onClick={() => navigate("/auth")} aria-label="Login or Sign up">
                    Login / Sign Up
                  </Button>
                </>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={isMenuOpen} aria-controls="mobile-menu" className="lg:hidden p-2 rounded-md border border-gray-200 text-gray-700 hover:bg-orange-50 hover:text-orange-700 transition-colors" onClick={() => setIsMenuOpen((s) => !s)}>
              {isMenuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div id="mobile-menu" className="lg:hidden py-4 border-t border-gray-200 animate-in slide-in-from-top duration-300" role="navigation" aria-label="Mobile navigation">
              {user && (
                <div className="px-4 py-3 mb-3 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border border-orange-100">
                  <div className="flex items-center gap-3">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt="Profile" className="w-12 h-12 rounded-full object-cover ring-2 ring-orange-500" width={48} height={48} />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white font-bold text-lg ring-2 ring-orange-500">
                        {getUserInitial()}
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="text-sm font-bold text-gray-900">Welcome, {getUserDisplayName()}!</p>
                      <p className="text-xs text-gray-600">{user.email}</p>
                    </div>
                  </div>
                </div>
              )}

              <nav className="flex flex-col space-y-2 px-4">
                {navigationItems.map((item) => (
                  <a key={item.label} href={item.href} onClick={(e) => handleNavClick(e, item.href, true)} className="px-4 py-3 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors font-semibold" aria-label={item.ariaLabel}>
                    {item.label}
                  </a>
                ))}

                <div className="pt-4 space-y-2">
                  {user ? (
                    <>
                      <Button variant="outline" className="w-full border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white font-semibold" onClick={() => { navigate("/cart"); setIsMenuOpen(false); }} aria-label="View shopping cart">
                        <ShoppingCart size={16} className="mr-2" aria-hidden="true" />
                        My Cart (0)
                      </Button>
                      <Button variant="outline" className="w-full border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white font-semibold" onClick={() => { handleLogout(); setIsMenuOpen(false); }} aria-label="Logout from account">
                        <LogOut size={16} className="mr-2" aria-hidden="true" />
                        Logout
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="outline" className="w-full border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white font-semibold" onClick={() => { window.location.href = "tel:+917067449775"; setIsMenuOpen(false); }} aria-label="Call now at +91 7067449775">
                        <Phone size={16} className="mr-2" aria-hidden="true" />
                        Call Now
                      </Button>
                      <Button className="w-full bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 text-white font-semibold shadow-lg" onClick={() => { navigate("/auth"); setIsMenuOpen(false); }} aria-label="Login or Sign up">
                        Login / Sign Up
                      </Button>
                    </>
                  )}
                </div>

                <address className="pt-4 mt-4 border-t border-gray-200 space-y-3 px-4 not-italic">
                  {contactInfo.map((item, index) => (
                    <a key={index} href={item.href} className="flex items-center gap-3 text-gray-600 hover:text-orange-600 py-2 transition-colors" aria-label={item.ariaLabel}>
                      <item.icon size={18} className="text-orange-500" aria-hidden="true" />
                      <span className="text-sm font-medium">{item.text}</span>
                    </a>
                  ))}
                </address>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
