import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({base:'/rainy-web-preview/',plugins:[react()],build:{sourcemap:false}});
