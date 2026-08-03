import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // honor the harness-assigned port when present
    port: process.env.PORT ? Number(process.env.PORT) : 5173,
  },
})
