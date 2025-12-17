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
      outDir: 'dist',
      emptyOutDir: true,
      sourcemap: false,
    },
    server: {
      host: true,
      port: 3000,
    },
    // Inject environment variables
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      // IMPORTANT: Inject directly into import.meta.env
      // Default to "false" if the variable is missing to force Clean URLs
      'import.meta.env.VITE_USE_HASH_ROUTER': JSON.stringify(env.VITE_USE_HASH_ROUTER || "false")
    }
  };
});