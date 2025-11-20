// src/components/auth/AuthPage.tsx
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  LogIn,
  UserPlus,
  ArrowRight,
  Sparkles,
  Shield,
  Zap,
  CheckCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/logo.png";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState("");
  const [imageError, setImageError] = useState(false);
  const { toast } = useToast();
  const { signup, login, loginWithGoogle, user } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        await login(formData.email, formData.password);
        toast({
          title: "Welcome Back! 🎉",
          description: "Successfully logged into your account.",
        });
      } else {
        if (!formData.name.trim()) {
          toast({
            title: "Name Required",
            description: "Please enter your full name to continue.",
            variant: "destructive",
          });
          setLoading(false);
          return;
        }
        await signup(formData.email, formData.password, formData.name);
        toast({
          title: "Account Created! 🎉",
          description: "Welcome to Namami Enterprises family.",
        });
      }
      
      setFormData({ name: "", email: "", password: "" });
      
    } catch (error: any) {
      console.error("Auth error:", error);
      let errorMessage = error.message || "Something went wrong. Please try again.";
      
      if (error.code) {
        switch (error.code) {
          case "auth/email-already-in-use":
            errorMessage = "Email already registered. Try logging in instead.";
            break;
          case "auth/wrong-password":
          case "auth/invalid-credential":
            errorMessage = "Incorrect password. Please try again.";
            break;
          case "auth/user-not-found":
            errorMessage = "No account found with this email. Please sign up.";
            break;
          case "auth/weak-password":
            errorMessage = "Password should be at least 6 characters long.";
            break;
          case "auth/invalid-email":
            errorMessage = "Please enter a valid email address.";
            break;
          case "auth/too-many-requests":
            errorMessage = "Too many attempts. Please try again later.";
            break;
          default:
            errorMessage = error.message;
        }
      }
      
      toast({ 
        title: "Error", 
        description: errorMessage, 
        variant: "destructive" 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await loginWithGoogle();
      toast({ 
        title: "Success! 🎉", 
        description: "Successfully signed in with Google." 
      });
    } catch (error: any) {
      console.error("Google sign-in error:", error);
      toast({
        title: "Authentication Failed",
        description: error.message || "Unable to sign in with Google. Please try again.",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  const toggleAuthMode = (loginMode: boolean) => {
    setIsLogin(loginMode);
    setFormData({ name: "", email: "", password: "" });
    setShowPassword(false);
  };

  // Get user initials
  const getUserInitials = () => {
    if (user?.name) {
      const names = user.name.split(' ');
      if (names.length >= 2) {
        return names[0][0] + names[1][0];
      }
      return user.name.substring(0, 2);
    }
    if (user?.email) {
      return user.email[0];
    }
    return 'U';
  };

  // If user is already logged in
  if (user) {
    return (
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50/30 to-orange-100/40 flex items-center justify-center p-4">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-400/20 to-amber-400/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-orange-300/20 to-amber-300/20 rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="relative max-w-md w-full bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50 text-center animate-in zoom-in duration-500">
          {/* Profile Photo or Initials */}
          <div className="flex justify-center mb-6">
            {user.photoURL && !imageError ? (
              <img
                src={user.photoURL}
                alt={user.name || 'User'}
                className="w-20 h-20 rounded-full object-cover border-4 border-green-500 shadow-xl animate-bounce"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-400 flex items-center justify-center border-4 border-green-500 shadow-xl animate-bounce">
                <span className="text-white font-bold text-2xl uppercase">
                  {getUserInitials()}
                </span>
              </div>
            )}
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">You're All Set! ✨</h2>
          <p className="text-gray-600 mb-6">
            You're currently signed in as <span className="font-semibold text-orange-600">{user.name || user.email}</span>
          </p>
          <div className="space-y-3">
            <Button
              onClick={() => window.history.back()}
              className="w-full h-12 bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <ArrowRight className="mr-2 rotate-180" size={18} />
              Go Back to Home
            </Button>
            <p className="text-sm text-gray-500 mt-4">
              Use the profile menu in the navbar to manage your account
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50/30 to-orange-100/40">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-400/20 to-amber-400/20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-orange-300/20 to-amber-300/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '1s' }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-orange-200/10 to-amber-200/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '2s' }}
        />
      </div>

      <div className="relative min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">

          {/* Left Side - Branding & Features */}
          <div className="hidden lg:block space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 via-orange-400 to-amber-400 rounded-2xl flex items-center justify-center shadow-2xl transform hover:scale-110 hover:rotate-3 transition-all duration-300 overflow-hidden">
                  <img
                    src={logo}
                    alt="Namami Logo"
                    className="w-full h-full object-cover rounded-2xl"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement!.innerHTML =
                        '<div class="w-8 h-8 text-white flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.25-2 5-2 5s3.75-.5 5-2c.625-.625 1-1.375 1-2.125v-1.25L4 12"/><path d="m9.5 17.5 3.5 3.5"/><path d="m16 10 3 3"/><path d="M8.5 10a5 5 0 1 1 7.071 7.071"/></svg></div>';
                    }}
                  />
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 bg-clip-text text-transparent">
                    Namami Enterprises
                  </h1>
                  <p className="text-gray-600 font-medium mt-1">Premium Quality • Trusted Partner</p>
                </div>
              </div>
            </div>

            <div className="space-y-4 mt-12">
              <div className="group bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-orange-100/50 hover:bg-white/80 hover:border-orange-200 transition-all duration-300 hover:shadow-xl hover:translate-x-2 cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-400 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-1">Secure & Reliable</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">Enterprise-grade security with end-to-end encryption protecting your data 24/7</p>
                  </div>
                </div>
              </div>

              <div className="group bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-orange-100/50 hover:bg-white/80 hover:border-orange-200 transition-all duration-300 hover:shadow-xl hover:translate-x-2 cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-400 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-1">Lightning Fast</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">Optimized performance for seamless experience and instant access to your account</p>
                  </div>
                </div>
              </div>

              <div className="group bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-orange-100/50 hover:bg-white/80 hover:border-orange-200 transition-all duration-300 hover:shadow-xl hover:translate-x-2 cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-400 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-1">Premium Experience</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">Intuitive interface designed for efficiency with world-class user experience</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-orange-100">
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">5K+</div>
                <div className="text-sm text-gray-600 font-medium mt-1">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">99.9%</div>
                <div className="text-sm text-gray-600 font-medium mt-1">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">24/7</div>
                <div className="text-sm text-gray-600 font-medium mt-1">Support</div>
              </div>
            </div>
          </div>

          {/* Right Side - Auth Form */}
          <div className="w-full max-w-md mx-auto lg:mx-0">
            <div className="lg:hidden text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 via-orange-400 to-amber-400 rounded-2xl flex items-center justify-center shadow-2xl overflow-hidden">
                  <img
                    src={logo}
                    alt="Namami Logo"
                    className="w-full h-full object-cover rounded-2xl"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement!.innerHTML =
                        '<svg class="w-8 h-8 text-white" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.25-2 5-2 5s3.75-.5 5-2c.625-.625 1-1.375 1-2.125v-1.25L4 12"/><path d="m9.5 17.5 3.5 3.5"/><path d="m16 10 3 3"/><path d="M8.5 10a5 5 0 1 1 7.071 7.071"/></svg>';
                    }}
                  />
                </div>
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 bg-clip-text text-transparent">
                Namami Enterprises
              </h1>
              <p className="text-gray-600 mt-2 font-medium">Premium Quality • Trusted Partner</p>
            </div>

            <div className="bg-white backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {isLogin ? "Welcome Back! 👋" : "Create Your Account"}
                </h2>
                <p className="text-gray-600">
                  {isLogin ? "Login to access your account" : "Join us to get started today"}
                </p>
              </div>

              <div className="flex gap-2 mb-8 bg-gray-100/80 backdrop-blur-sm rounded-xl p-1.5">
                <Button
                  type="button"
                  onClick={() => toggleAuthMode(true)}
                  className={`flex-1 h-12 rounded-lg font-semibold transition-all duration-300 ${isLogin
                      ? "bg-gradient-to-r from-orange-600 to-amber-500 text-white shadow-lg shadow-orange-500/30 scale-105 hover:from-orange-700 hover:to-amber-600"
                      : "bg-transparent text-gray-600 hover:text-orange-600 hover:bg-transparent shadow-none"
                    }`}
                >
                  <LogIn size={18} className="mr-2" />
                  Login
                </Button>
                <Button
                  type="button"
                  onClick={() => toggleAuthMode(false)}
                  className={`flex-1 h-12 rounded-lg font-semibold transition-all duration-300 ${!isLogin
                      ? "bg-gradient-to-r from-orange-600 to-amber-500 text-white shadow-lg shadow-orange-500/30 scale-105 hover:from-orange-700 hover:to-amber-600"
                      : "bg-transparent text-gray-600 hover:text-orange-600 hover:bg-transparent shadow-none"
                    }`}
                >
                  <UserPlus size={18} className="mr-2" />
                  Sign Up
                </Button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-semibold text-gray-700">
                      Full Name
                    </Label>
                    <div className={`relative transition-all duration-300 ${focusedField === 'name' ? 'scale-[1.02]' : ''}`}>
                      <User
                        size={18}
                        className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${focusedField === 'name' ? 'text-orange-500' : 'text-gray-400'
                          }`}
                      />
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField('')}
                        className="pl-12 h-12 bg-white border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all duration-300 font-medium"
                        required={!isLogin}
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                    Email Address
                  </Label>
                  <div className={`relative transition-all duration-300 ${focusedField === 'email' ? 'scale-[1.02]' : ''}`}>
                    <Mail
                      size={18}
                      className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${focusedField === 'email' ? 'text-orange-500' : 'text-gray-400'
                        }`}
                    />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField('')}
                      className="pl-12 h-12 bg-white border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all duration-300 font-medium"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="password" className="text-sm font-semibold text-gray-700">
                      Password
                    </Label>
                    {isLogin && (
                      <button
                        type="button"
                        className="text-xs font-semibold text-orange-600 hover:text-orange-700 transition-colors"
                      >
                        Forgot?
                      </button>
                    )}
                  </div>
                  <div className={`relative transition-all duration-300 ${focusedField === 'password' ? 'scale-[1.02]' : ''}`}>
                    <Lock
                      size={18}
                      className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${focusedField === 'password' ? 'text-orange-500' : 'text-gray-400'
                        }`}
                    />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('password')}
                      onBlur={() => setFocusedField('')}
                      className="pl-12 pr-12 h-12 bg-white border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all duration-300 font-medium"
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-600 transition-colors duration-300"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="group w-full h-13 bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 hover:from-orange-700 hover:to-amber-600 text-white font-bold rounded-xl shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-95 mt-6"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Processing...</span>
                    </div>
                  ) : (
                    <>
                      <span>{isLogin ? "Login to Account" : "Create Account"}</span>
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                </Button>
              </form>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t-2 border-gray-200"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="px-4 bg-white/80 backdrop-blur-sm text-sm font-semibold text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="group w-full h-13 bg-white border-2 border-gray-200 hover:border-orange-500 hover:bg-orange-50/50 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                <span className="text-gray-700 group-hover:text-gray-900">Continue with Google</span>
              </Button>
            </div>

            <p className="text-center text-sm text-gray-600 mt-6">
              By continuing, you agree to our{" "}
              <button
                type="button"
                onClick={() => {/* Handle navigation */ }}
                className="text-orange-600 hover:text-orange-700 font-semibold hover:underline transition-colors"
              >
                Terms of Service
              </button>
              {" "}and{" "}
              <button
                type="button"
                onClick={() => {/* Handle navigation */ }}
                className="text-orange-600 hover:text-orange-700 font-semibold hover:underline transition-colors"
              >
                Privacy Policy
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;