import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [react(), dts({ tsconfigPath: './tsconfig.json' })],
  build: {
    lib: {
      entry: './lib/main.ts',
      name: 'DialogflowReact',
      fileName: 'dialogflow-react'
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime']
    }
  }
})
