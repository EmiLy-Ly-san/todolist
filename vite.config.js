import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  test: {
    // simuler un navigateur pour tester les composants
    environment: 'jsdom',

    // rendre dispo les fonctions de test sans les importer
    globals: true,

    // charger ce fichier avant les tests
    setupFiles: './src/setupTests.js',
  },
});
