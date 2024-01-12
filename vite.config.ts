import react from '@vitejs/plugin-react'
import dns from 'dns'
import path from 'path'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'

dns.setDefaultResultOrder('verbatim')

const mainPath = './src/'

export default defineConfig({
  plugins: [svgr(), react()],
  optimizeDeps: {
    include: ['@mui/material'],
  },
  resolve: {
    alias: {
      '@app': `${path.resolve(__dirname, `${mainPath}app/`)}`,
      '@pages': `${path.resolve(__dirname, `${mainPath}pages/`)}`,
      '@widgets': `${path.resolve(__dirname, `${mainPath}widgets/`)}`,
      '@features': `${path.resolve(__dirname, `${mainPath}features/`)}`,
      '@entities': `${path.resolve(__dirname, `${mainPath}entities/`)}`,
      '@shared': `${path.resolve(__dirname, `${mainPath}shared/`)}`,
      '@processes': `${path.resolve(__dirname, `${mainPath}processes/`)}`,
      process: 'process/browser',
      stream: 'stream-browserify',
      zlib: 'browserify-zlib',
      util: 'util',
    },
  },
  server: {
    host: true,
  },
})
