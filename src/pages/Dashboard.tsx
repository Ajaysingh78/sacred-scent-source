// src/pages/Dashboard.tsx
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, User, Mail, Calendar, ShieldCheck, Home } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/logo.png";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logged Out",
        description: "You've been successfully logged out.",
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to logout. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
      {/* Header */}
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 via-orange-400 to-amber-400 rounded-xl flex items-center justify-center shadow-lg overflow-hidden">
                <img
                  src={logo}
                  alt="Logo"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <div>
                <h1 className="text-xl font-extrabold bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 bg-clip-text text-transparent">
                  Namami Enterprises
                </h1>
                <p className="text-xs text-gray-600 font-semibold">
                  User Dashboard
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => navigate("/")}
                className="border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white font-semibold transition-all duration-300"
              >
                <Home size={16} className="mr-2" />
                Home
              </Button>
              <Button
                onClick={handleLogout}
                className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 hover:from-orange-700 hover:to-amber-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <LogOut size={16} className="mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 rounded-2xl shadow-2xl p-8 mb-8 text-white">
          <div className="flex items-center gap-4 mb-4">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt="Profile"
                className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
              />
            ) : (
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                <User size={32} className="text-white" />
              </div>
            )}
            <div>
              <h2 className="text-3xl font-bold">
                Welcome back, {user?.displayName || "User"}! 👋
              </h2>
              <p className="text-white/90 mt-1 font-medium">
                Great to see you again!
              </p>
            </div>
          </div>
        </div>

        {/* User Info Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Email Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Mail size={24} className="text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-semibold">
                  Email Address
                </p>
                <p className="text-gray-900 font-bold mt-1">
                  {user?.email}
                </p>
              </div>
            </div>
          </div>

          {/* Account Type Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <ShieldCheck size={24} className="text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-semibold">
                  Account Type
                </p>
                <p className="text-gray-900 font-bold mt-1">Standard User</p>
              </div>
            </div>
          </div>

          {/* Member Since Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar size={24} className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-semibold">
                  Member Since
                </p>
                <p className="text-gray-900 font-bold mt-1">
                  {user?.metadata.creationTime
                    ? new Date(user.metadata.creationTime).toLocaleDateString(
                        "en-US",
                        { month: "short", year: "numeric" }
                      )
                    : "Recently"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Quick Actions
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Button
              onClick={() => navigate("/#products")}
              variant="outline"
              className="h-20 border-2 border-orange-300 hover:border-orange-600 hover:bg-orange-50 font-semibold text-lg transition-all duration-300"
            >
              Browse Products
            </Button>
            <Button
              onClick={() => navigate("/#contact")}
              variant="outline"
              className="h-20 border-2 border-green-300 hover:border-green-600 hover:bg-green-50 font-semibold text-lg transition-all duration-300"
            >
              Contact Support
            </Button>
            <Button
              onClick={() => navigate("/#services")}
              variant="outline"
              className="h-20 border-2 border-blue-300 hover:border-blue-600 hover:bg-blue-50 font-semibold text-lg transition-all duration-300"
            >
              View Services
            </Button>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-gradient-to-r from-orange-100 to-amber-100 rounded-xl p-6 border-l-4 border-orange-600">
          <h4 className="font-bold text-gray-900 mb-2 text-lg">
            🎉 Welcome to Namami Enterprises!
          </h4>
          <p className="text-gray-700">
            Your account is now active. You can browse our premium quality
            products, request quotes, and contact our team directly. We're here
            to provide you with the best agarbatti and dhoop solutions.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;