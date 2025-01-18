import { defineConfig } from 'vite';

export default defineConfig({
    server: {
        proxy: {
            '/api': 'http://localhost:8080'  // Proxy API requests to the Servlet backend
        }
    }
});