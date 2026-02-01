// src/App.tsx
import { Suspense, lazy, Component, ErrorInfo, ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Index from "./pages/Index";


// 🔥 Lazy load pages
const NotFound = lazy(() => import("./pages/NotFound"));
const AuthPage = lazy(() => import("./components/auth/AuthPage"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));

// Blog Pages
// Note: Ensure you have created src/pages/BlogPost.tsx as per the previous step
const BlogPost = lazy(() => import("./pages/BlogPost")); 
// If you create a separate "All Blogs" page later, uncomment the line below:
// const BlogList = lazy(() => import("./pages/BlogList"));

// Initialize React Query Client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// 🔥 Error Boundary Component
interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<
  { children: ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error Boundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-amber-50/30 to-orange-100/40 p-4">
          <div className="text-center max-w-md">
            <div className="text-6xl mb-4">⚠️</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Oops! Something went wrong
            </h1>
            <p className="text-gray-600 mb-6">
              We're sorry for the inconvenience. Please try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Loading Component
const LoadingScreen = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-amber-50/30 to-orange-100/40">
    <div className="text-center">
      <div className="relative">
        <div className="w-20 h-20 border-4 border-orange-200 rounded-full"></div>
        <div className="w-20 h-20 border-4 border-orange-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
      </div>
      <p className="text-gray-700 font-semibold mt-6 text-lg">
        Loading your experience...
      </p>
      <p className="text-gray-500 text-sm mt-2">Please wait a moment</p>
    </div>
  </div>
);

// Protected Route Component
const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) return <LoadingScreen />;
  if (!user) return <Navigate to="/auth" replace />;

  return <>{children}</>;
};

// Public Route Component
const PublicRoute = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) return <LoadingScreen />;
  if (user) return <Navigate to="/" replace />;

  return <>{children}</>;
};

// 🔥 SEO Component
const SEO = () => {
  const location = useLocation();

  // Default SEO data
  const defaultSEO = {
    title: "Namami Enterprises - Premium Agarbatti Manufacturer & Wholesale Supplier in Indore | ISO Certified",
    description: "Leading ISO certified agarbatti manufacturer in Indore, MP. Premium quality incense sticks, dhoop sticks & sambrani cups. Wholesale rates available. 1000+ satisfied dealers across India.",
    keywords: "agarbatti manufacturer Indore, incense stick supplier, agarbatti wholesale MP, bulk agarbatti order India",
    image: "https://namamienterprises.in/og-image.jpg",
    url: "https://namamienterprises.in",
  };

  // Page-specific SEO
  const pageSEO: Record<string, typeof defaultSEO> = {
    "/": defaultSEO,
    "/auth": {
      title: "Login | Namami Enterprises - Agarbatti Manufacturer",
      description: "Login to access your dealer dashboard. Manage orders, view pricing, and track shipments.",
      keywords: "dealer login, agarbatti supplier login, wholesale login",
      image: defaultSEO.image,
      url: "https://namamienterprises.in/auth",
    },
    // Generic SEO for blog detail pages
    "/blog": { 
      title: "Blog | Namami Enterprises - Industry Insights",
      description: "Read detailed insights, manufacturing process, and stories from Namami Enterprises.",
      keywords: "agarbatti blog, industry blog, incense manufacturing process",
      image: defaultSEO.image,
      url: "https://namamienterprises.in/blog",
    },
  };

  // Determine current SEO logic
  let currentSEO = pageSEO[location.pathname];

  // Dynamic SEO handling for blog posts
  if (!currentSEO && location.pathname.startsWith('/blog/')) {
    currentSEO = pageSEO['/blog'];
  }

  // Fallback to default
  if (!currentSEO) {
    currentSEO = defaultSEO;
  }

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{currentSEO.title}</title>
      <meta name="title" content={currentSEO.title} />
      <meta name="description" content={currentSEO.description} />
      <meta name="keywords" content={currentSEO.keywords} />

      {/* Canonical URL */}
      <link rel="canonical" href={currentSEO.url + location.pathname} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={currentSEO.url + location.pathname} />
      <meta property="og:title" content={currentSEO.title} />
      <meta property="og:description" content={currentSEO.description} />
      <meta property="og:image" content={currentSEO.image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={currentSEO.url + location.pathname} />
      <meta property="twitter:title" content={currentSEO.title} />
      <meta property="twitter:description" content={currentSEO.description} />
      <meta property="twitter:image" content={currentSEO.image} />

      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English, Hindi" />
      <meta name="revisit-after" content="7 days" />
      <meta name="author" content="Namami Enterprises" />
    </Helmet>
  );
};

const App = () => (
  <ErrorBoundary>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <BrowserRouter>
            <AuthProvider>
              {/* 🔥 Dynamic SEO for each page */}
              <SEO />

              <Suspense fallback={<LoadingScreen />}>
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<Index />} />
                  
                  {/* Blog Detail Route (Dynamic ID) */}
                  <Route path="/blog/:id" element={<BlogPost />} />
                  
                  {/* If you create a blog list page later, enable this: */}
                  {/* <Route path="/blogs" element={<BlogList />} /> */}

                  {/* Auth Route - Redirects to home if already logged in */}
                  <Route
                    path="/auth"
                    element={
                      <PublicRoute>
                        <AuthPage />
                      </PublicRoute>
                    }
                  />

                  {/* Admin Dashboard - Only for admin users */}
                  <Route
                    path="/admin"
                    element={
                      <ProtectedRoute>
                        <AdminDashboard />
                      </ProtectedRoute>
                    }
                  />

                  {/* 404 Route */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>

              {/* Toasters for notifications */}
              <Toaster />
              <Sonner />
            </AuthProvider>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  </ErrorBoundary>
);

export default App;