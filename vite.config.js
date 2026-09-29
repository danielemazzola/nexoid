import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // Prioriza TypeScript si conviven archivos .tsx y .jsx con el mismo nombre
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.mjs', '.json'],
  },
  server: {
    host: true,
    port: 3000,
    strictPort: true,
  },
  preview: {
    port: 3000,
  },
})
