import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  testMatch: "visual.spec.ts",
  outputDir: "test-results/playwright",
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: [["line"]],
  use: {
    ...devices["Desktop Chrome"],
    baseURL: "http://127.0.0.1:3100",
    browserName: "chromium",
    colorScheme: "light",
    contextOptions: {
      reducedMotion: "reduce",
    },
    deviceScaleFactor: 1,
    locale: "fr-FR",
    screenshot: "off",
    trace: "retain-on-failure",
    timezoneId: "Africa/Algiers",
    video: "off",
  },
});
