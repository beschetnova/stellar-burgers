import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4000',
    viewportWidth: 1400,
    viewportHeight: 900,
      setupNodeEvents(on, config) {
        // implement node event listeners here
      },
  },
});
