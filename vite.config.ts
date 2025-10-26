import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { sentryReactRouter, type SentryReactRouterBuildOptions } from '@sentry/react-router';


const sentryConfig: SentryReactRouterBuildOptions = {
  org: "jsm-travel",
  project: "javascript-react-router",
  // An auth token is required for uploading source maps;
  // store it in an environment variable to keep it secure.
  authToken: process.env.VITE_SENTRY_AUTH_TOKEN,
  // ...
};

export default defineConfig(config => {
  return {
    plugins: [tailwindcss(), reactRouter(), tsconfigPaths(), sentryReactRouter(sentryConfig, config)],
    optimizeDeps: {
      include: ["@syncfusion/ej2-base"],
    },
    ssr: {
      noExternal: ["@syncfusion/ej2-base"],
    }
  };
});
