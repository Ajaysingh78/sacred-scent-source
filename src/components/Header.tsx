import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Mail, MapPin, User, LogOut, ShoppingCart, Heart, Settings, Package } from "lucide-react";
import logo from "@/assets/logo.png";
import { useNavigate } from "react-router-dom";

// Mock Auth Hook - Replace with your actual useAuth hook
const useAuth = () => {
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("mockUser");
    if (storedUser) setCurrentUser(JSON.parse(storedUser));
  }, []);

  const logout = () => {
    localStorage.removeItem("mockUser");
    setCurrentUser(null);
  };

  return { currentUser, logout };
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close user menu when clicking outside
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
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Products", href: "#products" },
    { label: "Services", href: "#services" },
    { label: "Why Choose Us", href: "#why-choose-us" },
    { label: "Contact", href: "#contact" },
  ];

  const contactInfo = [
    { icon: Phone, text: "+91 7067449775", href: "tel:+917067449775" },
    { icon: Mail, text: "namamiagarbati01@gmail.com", href: "mailto:namamiagarbati01@gmail.com" },
    { icon: MapPin, text: "Indore, Madhya Pradesh", href: "#contact" },
  ];

  // Use navigate() for internal app routes
  const userMenuItems = [
    { icon: User, label: "My Profile", action: () => navigate("/dashboard") },
    { icon: Package, label: "My Orders", action: () => navigate("/orders") },
    { icon: Heart, label: "Wishlist", action: () => navigate("/wishlist") },
    { icon: Settings, label: "Settings", action: () => navigate("/settings") },
  ];

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate("/"); // SPA redirect
  };

  const getUserDisplayName = () => {
    if (!currentUser) return "";
    return currentUser.displayName?.split(" ")[0] || currentUser.email?.split("@")[0] || "User";
    };
  const getUserInitial = () => {
    if (!currentUser) return "";
    return (currentUser.displayName?.[0] || currentUser.email?.[0] || "U").toUpperCase();
  };

  // Demo login button - Remove in production
  const handleDemoLogin = () => {
    const demoUser = { displayName: "Rahul Kumar", email: "rahul@example.com", photoURL: null };
    localStorage.setItem("mockUser", JSON.stringify(demoUser));
    // SPA-friendly fake reload: just navigate to keep state predictable
    navigate(0 as any); // vite/react-router way to reload; or window.location.reload() if you prefer
  };

  return (
    <>
      {/* Top Bar - Desktop Only */}
      <div className="hidden lg:block bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 text-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-10 text-sm">
            <div className="flex items-center gap-6">
              {contactInfo.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="flex items-center gap-2 hover:text-white hover:scale-105 transition-all duration-200"
                >
                  <item.icon size={14} />
                  <span className="font-medium">{item.text}</span>
                </a>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <span className="font-semibold"> Wholesale & Bulk Orders Available</span>
              <div className="h-4 w-px bg-orange-300" />
              <span className="font-semibold">✅ ISO Certified Manufacturing</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${
          isScrolled ? "shadow-xl" : "shadow-md"
        }`}
      >
        <div className="container mx-auto px-4">
          {/* Header Row */}
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="#home" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 via-orange-400 to-amber-400 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300 rotate-6 group-hover:rotate-0 overflow-hidden">
                  <img
                    src={logo}
                    alt="Namami Enterprises logo"
                    className="w-full h-full object-cover rounded-2xl"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-extrabold bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 bg-clip-text text-transparent group-hover:from-orange-700 group-hover:to-amber-600 transition-all duration-300">
                  Namami Enterprises
                </h1>
                <p className="text-xs text-gray-600 font-semibold tracking-wide">
                  Premium Quality • Trusted Partner
                </p>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navigationItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="px-4 py-2 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all duration-200 font-semibold relative group"
                >
                  {item.label}
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-orange-600 to-amber-500 group-hover:w-3/4 transition-all duration-300" />
                </a>
              ))}
            </nav>

            {/* CTA Buttons - Desktop */}
            <div className="hidden lg:flex items-center gap-3">
              {currentUser ? (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-700 hover:text-orange-600 hover:bg-orange-50 relative"
                    onClick={() => navigate("/cart")}
                  >
                    <ShoppingCart size={20} />
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-orange-600 text-white text-xs rounded-full flex items-center justify-center font-bold">
                      0
                    </span>
                  </Button>

                  <div className="relative user-menu-container">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowUserMenu(!showUserMenu);
                      }}
                      className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-orange-50 transition-all duration-300 group border-2 border-transparent hover:border-orange-200"
                    >
                      <div className="relative">
                        {currentUser.photoURL ? (
                          <img
                            src={currentUser.photoURL}
                            alt="Profile"
                            className="w-9 h-9 rounded-full object-cover ring-2 ring-orange-500 group-hover:ring-orange-600 transition-all duration-300"
                          />
                        ) : (
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white font-bold text-sm ring-2 ring-orange-500 group-hover:ring-orange-600 transition-all duration-300">
                            {getUserInitial()}
                          </div>
                        )}
                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                          {getUserDisplayName()}
                        </p>
                        <p className="text-xs text-gray-500">My Account</p>
                      </div>
                    </button>

                    {/* User Dropdown Menu */}
                    {showUserMenu && (
                      <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 animate-in slide-in-from-top-5 duration-200 z-50">
                        {/* User Info Header */}
                        <div className="px-4 py-3 border-b border-gray-100">
                          <div className="flex items-center gap-3">
                            {currentUser.photoURL ? (
                              <img
                                src={currentUser.photoURL}
                                alt="Profile"
                                className="w-12 h-12 rounded-full object-cover ring-2 ring-orange-500"
                              />
                            ) : (
                              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white font-bold text-lg ring-2 ring-orange-500">
                                {getUserInitial()}
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-bold text-gray-900 truncate">
                                {currentUser.displayName || "User"}
                              </p>
                              <p className="text-xs text-gray-500 truncate">
                                {currentUser.email}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Menu Items */}
                        <div className="py-2">
                          {userMenuItems.map((item, index) => (
                            <button
                              key={index}
                              onClick={() => {
                                item.action();
                                setShowUserMenu(false);
                              }}
                              className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors group"
                            >
                              <item.icon size={18} className="text-gray-400 group-hover:text-orange-600" />
                              <span className="font-medium">{item.label}</span>
                            </button>
                          ))}
                        </div>

                        {/* Logout Button */}
                        <div className="border-t border-gray-100 pt-2">
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors group"
                          >
                            <LogOut size={18} />
                            <span className="font-medium">Logout</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white font-semibold transition-all duration-300"
                    onClick={() => (window.location.href = "tel:+917067449775")}
                  >
                    <Phone size={16} className="mr-2" />
                    Call Now
                  </Button>
                  <Button
                    className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 hover:from-orange-700 hover:to-amber-600 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                    onClick={() => navigate("/auth")}
                  >
                    Login / Sign Up
                  </Button>
                </>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              aria-label="Toggle menu"
              className="lg:hidden p-2 rounded-md border border-gray-200 text-gray-700 hover:bg-orange-50 hover:text-orange-700 transition-colors"
              onClick={() => setIsMenuOpen((s) => !s)}
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden py-4 border-t border-gray-200 animate-in slide-in-from-top duration-300">
              {/* Mobile User Info (if logged in) */}
              {currentUser && (
                <div className="px-4 py-3 mb-3 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border border-orange-100">
                  <div className="flex items-center gap-3">
                    {currentUser.photoURL ? (
                      <img
                        src={currentUser.photoURL}
                        alt="Profile"
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-orange-500"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white font-bold text-lg ring-2 ring-orange-500">
                        {getUserInitial()}
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="text-sm font-bold text-gray-900">
                        Welcome, {getUserDisplayName()}!
                      </p>
                      <p className="text-xs text-gray-600">{currentUser.email}</p>
                    </div>
                  </div>
                </div>
              )}

              <nav className="flex flex-col space-y-2">
                {navigationItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="px-4 py-3 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors font-semibold"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}

                {/* Mobile User Menu Items (if logged in) */}
                {currentUser && (
                  <>
                    <div className="h-px bg-gray-200 my-2" />
                    {userMenuItems.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          item.action();
                          setIsMenuOpen(false);
                        }}
                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors font-semibold text-left"
                      >
                        <item.icon size={18} />
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </>
                )}

                {/* Mobile CTAs */}
                <div className="pt-4 space-y-2 px-4">
                  {currentUser ? (
                    <>
                      <Button
                        variant="outline"
                        className="w-full border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white font-semibold"
                        onClick={() => {
                          navigate("/cart");
                          setIsMenuOpen(false);
                        }}
                      >
                        <ShoppingCart size={16} className="mr-2" />
                        My Cart (0)
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white font-semibold"
                        onClick={() => {
                          handleLogout();
                          setIsMenuOpen(false);
                        }}
                      >
                        <LogOut size={16} className="mr-2" />
                        Logout
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="outline"
                        className="w-full border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white font-semibold"
                        onClick={() => {
                          window.location.href = "tel:+917067449775";
                          setIsMenuOpen(false);
                        }}
                      >
                        <Phone size={16} className="mr-2" />
                        Call Now
                      </Button>
                      <Button
                        className="w-full bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 text-white font-semibold shadow-lg"
                        onClick={() => {
                          navigate("/auth");
                          setIsMenuOpen(false);
                        }}
                      >
                        Login / Sign Up
                      </Button>
                    </>
                  )}
                </div>

                {/* Mobile Contact Info */}
                <div className="pt-4 mt-4 border-t border-gray-200 space-y-3 px-4">
                  {contactInfo.map((item, index) => (
                    <a
                      key={index}
                      href={item.href}
                      className="flex items-center gap-3 text-gray-600 hover:text-orange-600 py-2 transition-colors"
                    >
                      <item.icon size={18} className="text-orange-500" />
                      <span className="text-sm font-medium">{item.text}</span>
                    </a>
                  ))}
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Demo Button - Remove in Production */}
      {!currentUser && (
        <div className="fixed bottom-4 right-4 z-50">
          <Button onClick={handleDemoLogin} className="bg-green-600 hover:bg-green-700 text-white font-semibold shadow-2xl">
            Demo Login (Click to Test)
          </Button>
        </div>
      )}
    </>
  );
};

export default Header;
