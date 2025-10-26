import * as Sentry from "@sentry/react-router";

Sentry.init({
  dsn: "https://88137d65c6e21bbed0de7b72accac99c@o4510257421615104.ingest.de.sentry.io/4510257559765072",
  // Adds request headers and IP for users, for more info visit:
  // https://docs.sentry.io/platforms/javascript/guides/react-router/configuration/options/#sendDefaultPii
  sendDefaultPii: true,
  // Enable logs to be sent to Sentry
  enableLogs: true,
  tracesSampleRate: 1.0, // Capture 100% of the transactions
});