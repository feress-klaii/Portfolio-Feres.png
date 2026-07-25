import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { optimizeImagesPlugin } from './build-plugins/optimizeImages.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), optimizeImagesPlugin()],
})
