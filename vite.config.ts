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
            response.writeHead(302, { Location: '/tests/resultados/exploratorio/vibe-testing/' }).end()
            return
          }
          if (request.url === '/tests/resultados/exploratorio/vibe-testing') {
            response.writeHead(302, { Location: '/tests/resultados/exploratorio/vibe-testing/' }).end()
            return
          }
          next()
        })
      },
    },
  ],
  publicDir: 'frontend/public',
  server: {
    proxy: { '/api': 'http://localhost:3001' },
    watch: {
      ignored: ['**/tests/resultados/frontend/e2e/**', '**/tests/resultados/exploratorio/vibe-testing/evidence/**'],
    },
  },
})
