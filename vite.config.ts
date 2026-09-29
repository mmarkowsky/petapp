import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'vibe-testing-report-route',
      configureServer(server) {
        server.middlewares.use((request, response, next) => {
          if (request.url === '/tests/vibe-testing') {
            response.writeHead(302, { Location: '/tests/vibe-testing/' }).end()
            return
          }
          next()
        })
      },
    },
  ],
  server: {
    proxy: { '/api': 'http://localhost:3001' },
  },
})
