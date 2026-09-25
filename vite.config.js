import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages serves the site from /<repo-name>/, so production builds need that base path.
export default defineConfig(({ command, isPreview }) => ({
  base: command === 'build' || isPreview ? '/taskflow-web/' : '/',
  plugins: [vue(), tailwindcss()],
}))
