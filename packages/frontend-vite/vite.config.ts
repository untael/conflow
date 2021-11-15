import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    fs: {
      strict: false,
      // Allow serving files from one level up to the project root
      allow: ['..']
    }
  },
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
    ],
  },
})