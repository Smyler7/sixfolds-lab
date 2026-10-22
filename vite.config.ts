import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { siteBase } from './src/site-config.js';
export default defineConfig({ base: siteBase, plugins: [react()] });
