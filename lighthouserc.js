module.exports = {
  ci: {
    collect: {
      startServerCommand: "pnpm start",
      url: ["http://localhost:3000/", "http://localhost:3000/verification"],
      numberOfRuns: 2,
      settings: {
        chromeFlags: "--no-sandbox --headless --disable-gpu --disable-dev-shm-usage",
      },
    },
    upload: {
      target: "temporary-public-storage",
    },
    assert: {
      assertions: {
        "categories:performance": ["warn", { minScore: 0.90 }],
        "categories:accessibility": ["warn", { minScore: 0.95 }],
        "categories:best-practices": ["warn", { minScore: 0.95 }],
        "categories:seo": ["warn", { minScore: 0.95 }],
      },
    },
  },
}
