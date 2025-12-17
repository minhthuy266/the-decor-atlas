import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // The third parameter '' loads all env regardless of prefix.
  const env = loadEnv(mode, '.', '');

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve('.'),
      }
    },
    // Configuration for Production Build
    build: {
      outDir: 'dist', // Output to parent directory as requested
      emptyOutDir: true,
      sourcemap: false,  // Disable sourcemaps for production
    },
    // Configuration for Dev Server (Google AI Studio)
    server: {
      host: true, // Equivalent to '0.0.0.0' - listens on all addresses
      port: 3000,
    },
    // Inject environment variables (Required for AI Studio templates)
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      // Explicitly define VITE_USE_HASH_ROUTER to ensure client receives it
      'process.env.VITE_USE_HASH_ROUTER': JSON.stringify(env.VITE_USE_HASH_ROUTER)
    }
  };
});