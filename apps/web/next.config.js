const withTM = require("next-transpile-modules")(["types"]);
const removeImports = require("next-remove-imports")();

module.exports = withTM(
  removeImports({
    reactStrictMode: false,
    webpack(config) {
      config.module.rules.push({
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      });
      config.resolve.fallback = {
        ...config.resolve.fallback, // if you miss it, all the other options in fallback, specified
        // by next.js will be dropped. Doesn't make much sense, but how it is
        fs: false, // the solution
      };
      return config;
    },
    images: {
      domains: ["drive.google.com"],
    },
    env: {
      API_URL: process.env.API_URL || "http://localhost:4000",
      AUTH0_DOMAIN: process.env.AUTH0_DOMAIN || "dev-mpvuqq8o.us.auth0.com",
      AUTH0_CLIENT_ID:
        process.env.AUTH0_CLIENT_ID || "4JpjfVVmuJzQOzxBjqQ4fzmmygy5VS6Z",
      AUTH0_REDIRECT_URL:
        process.env.AUTH0_REDIRECT_URL || "http://localhost:3000",
      AUTH0_AUDIENCE: "https://api.reputable.health",
    },
  })
);
