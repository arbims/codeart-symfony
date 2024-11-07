import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  root: './resources/',
  base: '/assets/',
  build: {
    outDir: '../webroot/assets',
    assetsDir: '',
    manifest: true,
    rollupOptions: {
      output: {
        manualChunks: undefined
      },
      input: {
        'main.js': './assets/js/main.js'
      }
    }
  },
  server: {
    port: 3000
  }
})
