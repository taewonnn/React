import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['react', 'react-dom', '@tanstack/react-query'],
  },
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
});
