import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false,
    minify: true,
    rollupOptions: {
      output: {
        sourcemap: false
      }
    }
  },
  css: {
    devSourcemap: false
  },
  esbuild: {
    sourcemap: false
  },
  server: {
    sourcemap: 'inline',
  },
  optimizeDeps: {
    exclude: ['@swc/wasm-web'],
  }
})
