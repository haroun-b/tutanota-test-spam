const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      // deletes the recorded video if the spec passes
      on('after:spec', (spec, results) => {
        if (results && results.stats.failures === 0 && results.video) {
          // `del` is an ES Module, which is why it is dynamically imported in this CommonJS Module
          // `deleteAsync()` returns a promise, so it's important to return it to ensure deleting the video is finished before moving on
          return import('del').then(({ deleteAsync }) => deleteAsync(results.video));
        }
      });
    }
  }
});
