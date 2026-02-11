import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Font loading optimization - Only load needed weights initially
import "@fontsource/inter/400.css";
import "@fontsource/inter/600.css";

// Lazy load non-critical fonts after page load
const loadNonCriticalFonts = () => {
  if (document.readyState === "complete") {
    import("@fontsource/inter/500.css");
    import("@fontsource/inter/700.css");
  } else {
    window.addEventListener("load", () => {
      import("@fontsource/inter/500.css");
      import("@fontsource/inter/700.css");
    });
  }
};

// Initialize React app
const initApp = () => {
  loadNonCriticalFonts();
  
  const rootElement = document.getElementById("root");
  
  if (!rootElement) {
    throw new Error("Root element not found. Unable to mount React app.");
  }

  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
};

// Register Service Worker for PWA (production only)
if ("serviceWorker" in navigator && import.meta.env.PROD) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        // Silent success - no console logs in production
        if (import.meta.env.DEV) {
          console.log("✅ Service Worker registered:", registration.scope);
        }
      })
      .catch((error) => {
        // Log errors even in production for debugging
        console.error("❌ Service Worker registration failed:", error);
      });
  });
}

// Core Web Vitals monitoring (production only)
if (import.meta.env.PROD) {
  import("web-vitals").then(({ onCLS, onFCP, onLCP, onTTFB, onINP }) => {
    // Send to analytics instead of console.log
    const sendToAnalytics = (metric: any) => {
      // TODO: Send to your analytics service (Google Analytics, Plausible, etc.)
      // Example: gtag('event', metric.name, { value: metric.value });
      
      // For now, only log in dev mode
      if (import.meta.env.DEV) {
        console.log(metric);
      }
    };

    onCLS(sendToAnalytics);
    onFCP(sendToAnalytics);
    onLCP(sendToAnalytics);
    onTTFB(sendToAnalytics);
    onINP(sendToAnalytics);
  });
}

// Initialize app
initApp();