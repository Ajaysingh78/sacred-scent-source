import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from "vite-plugin-pwa";
import viteCompression from "vite-plugin-compression";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    
    // 🔥 GZIP Compression - Files ko 70% tak compress karta hai
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240, // 10kb se badi files compress hongi
      algorithm: "gzip",
      ext: ".gz",
    }),
    
    // 🔥 Brotli Compression - Gzip se bhi better (85% compression)
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: "brotliCompress",
      ext: ".br",
    }),
    
    // 🔥 PWA Support - Offline access + Install karne ki facility
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
      manifest: {
        name: "Namami Enterprises - Premium Agarbatti Manufacturer",
        short_name: "Namami Enterprises",
        description: "ISO certified agarbatti manufacturer in Indore. Premium quality incense sticks wholesale supplier.",
        theme_color: "#FF6B35",
        background_color: "#ffffff",
        display: "standalone",
        scope: "/",
        start_url: "/",
        orientation: "portrait-primary",
        icons: [
          {
            src: "/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable"
          },
          {
            src: "/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable"
          }
        ],
        categories: ["business", "shopping"],
        screenshots: [
          {
            src: "/screenshot-desktop.png",
            sizes: "1280x720",
            type: "image/png",
            form_factor: "wide"
          },
          {
            src: "/screenshot-mobile.png",
            sizes: "750x1334",
            type: "image/png",
            form_factor: "narrow"
          }
        ]
      },
      workbox: {
        // 🔥 Caching Strategy - Fast loading
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "gstatic-fonts-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
            handler: "CacheFirst",
            options: {
              cacheName: "images-cache",
              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
            },
          },
          {
            urlPattern: /\.(?:js|css)$/,
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "static-resources",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 7, // 7 days
              },
            },
          },
        ],
        globPatterns: ["**/*.{js,css,html,ico,png,svg,woff,woff2}"],
        cleanupOutdatedCaches: true,
        skipWaiting: true,
        clientsClaim: true,
      },
    }),
    
    // 🔥 Bundle Analyzer - Build size dekhne ke liye
    mode === "production" && visualizer({
      open: false,
      filename: "dist/stats.html",
      gzipSize: true,
      brotliSize: true,
    }),
  ].filter(Boolean),
  
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  
  // 🔥 BUILD OPTIMIZATION - Critical for SEO & Performance
  build: {
    target: "esnext",
    minify: "terser",
    
    // Terser options - Code ko maximum compress karta hai
    terserOptions: {
      compress: {
        drop_console: true, // Production mein console.log remove
        drop_debugger: true,
        pure_funcs: ["console.log", "console.info"],
        passes: 2,
      },
      format: {
        comments: false, // Comments remove
      },
      mangle: {
        safari10: true,
      },
    },
    
    // 🔥 Code Splitting - Chunks banake load time kam karta hai
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunk - React, React-DOM alag bundle
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          
          // UI Library chunk - Radix UI components alag
          "ui-vendor": [
            "@radix-ui/react-dialog",
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-select",
            "@radix-ui/react-tabs",
            "@radix-ui/react-toast",
            "@radix-ui/react-tooltip",
            "@radix-ui/react-accordion",
          ],
          
          // Firebase alag chunk - Lazy load karenge
          "firebase-vendor": ["firebase/app", "firebase/auth", "firebase/firestore"],
          
          // Form libraries alag
          "form-vendor": ["react-hook-form", "@hookform/resolvers", "zod"],
          
          // Charts alag
          "chart-vendor": ["recharts"],
          
          // Query alag
          "query-vendor": ["@tanstack/react-query"],
        },
        
        // 🔥 File naming strategy - Better caching
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: ({ name }) => {
          if (/\.(gif|jpe?g|png|svg|webp)$/.test(name ?? "")) {
            return "assets/images/[name]-[hash][extname]";
          }
          if (/\.css$/.test(name ?? "")) {
            return "assets/css/[name]-[hash][extname]";
          }
          if (/\.(woff2?|eot|ttf|otf)$/.test(name ?? "")) {
            return "assets/fonts/[name]-[hash][extname]";
          }
          return "assets/[name]-[hash][extname]";
        },
      },
    },
    
    // 🔥 Chunk size warnings - Large chunks detect karta hai
    chunkSizeWarningLimit: 1000, // 1MB
    
    // 🔥 Source maps (production mein off)
    sourcemap: mode === "development",
    
    // 🔥 CSS Code splitting
    cssCodeSplit: true,
    
    // 🔥 Report compressed size
    reportCompressedSize: true,
    
    // 🔥 Assets inline limit (8kb se choti files inline hongi)
    assetsInlineLimit: 8192,
  },
  
  // 🔥 CSS OPTIMIZATION
  css: {
    devSourcemap: mode === "development",
    preprocessorOptions: {
      css: {
        // Remove unused CSS
        charset: false,
      },
    },
  },
  
  // 🔥 PREVIEW SERVER OPTIMIZATION
  preview: {
    host: "::",
    port: 4173,
    strictPort: true,
    open: false,
  },
  
  // 🔥 OPTIMIZATION OPTIONS
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-router-dom",
      "@tanstack/react-query",
    ],
    exclude: ["firebase"], // Firebase ko lazy load karenge
  },
  
  // 🔥 ESBUILD OPTIMIZATION
  esbuild: {
    logOverride: { "this-is-undefined-in-esm": "silent" },
    legalComments: "none",
    treeShaking: true,
  },
}));