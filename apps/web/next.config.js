const withTM = require("next-transpile-modules")(["ui"]);

module.exports = withTM({
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  env: {
    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN || "dev-mpvuqq8o.us.auth0.com",
    AUTH0_CLIENT_ID:
      process.env.AUTH0_CLIENT_ID || "4JpjfVVmuJzQOzxBjqQ4fzmmygy5VS6Z",
    AUTH0_REDIRECT_URL:
      process.env.AUTH0_REDIRECT_URL || "http://localhost:3000",
  },
});
