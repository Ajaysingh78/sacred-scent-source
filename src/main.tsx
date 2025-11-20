import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";


// 🔥 Font loading optimization - Only load needed weights initially
// Critical fonts inline, rest will be lazy loaded
import "@fontsource/inter/400.css";
import "@fontsource/inter/600.css";

// 🔥 Preload critical fonts for better performance
const preloadFonts = () => {
  const link1 = document.createElement("link");
  link1.rel = "preload";
  link1.as = "font";
  link1.type = "font/woff2";
  link1.crossOrigin = "anonymous";
  link1.href = "/fonts/inter-400.woff2";
  
  const link2 = document.createElement("link");
  link2.rel = "preload";
  link2.as = "font";
  link2.type = "font/woff2";
  link2.crossOrigin = "anonymous";
  link2.href = "/fonts/inter-600.woff2";
  
  document.head.appendChild(link1);
  document.head.appendChild(link2);
};

// 🔥 Lazy load non-critical fonts
const loadNonCriticalFonts = () => {
  // Wait for page load, then load other font weights
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

// 🔥 Initialize app
const initApp = () => {
  preloadFonts();
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

// 🔥 Register Service Worker for PWA
if ("serviceWorker" in navigator && import.meta.env.PROD) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("✅ Service Worker registered:", registration.scope);
      })
      .catch((error) => {
        console.error("❌ Service Worker registration failed:", error);
      });
  });
}

// 🔥 Initialize app
initApp();

// 🔥 Performance monitoring (Production only)

if (import.meta.env.PROD) {
  import("web-vitals").then(({ onCLS, onFCP, onLCP, onTTFB, onINP }) => {
    onCLS(console.log);
    onFCP(console.log);
    onLCP(console.log);
    onTTFB(console.log);
    onINP(console.log); // FID replaced by INP
  });
}
