import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': 'http://localhost:3000' //This causes an error because I put 'https' instead of 'http'. WARNING.
    }// any time Vue app makes a request to anything with a /api in the path the Vite dev server (localhost:5173) sends it to the Express server (localhost:3000)
  }
})
