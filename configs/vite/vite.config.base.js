const { defineConfig } = require('vite');
const react = require('@vitejs/plugin-react');

// 공통 Vite 설정
module.exports = defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  css: {
    postcss: {
      plugins: [require('tailwindcss'), require('autoprefixer')],
    },
  },
});
