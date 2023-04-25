export default () => ({
  environment: process.env.NODE_ENV,
  name: process.env.APP_NAME,
  schema: process.env.API_GATEWAY_SCHEMA,
  host: process.env.API_GATEWAY_HOST,
  port: parseInt(process.env.API_GATEWAY_PORT),
  university: {
    host: process.env.UNIVERSITY_SERVICE_HOST,
    port: parseInt(process.env.UNIVERSITY_SERVICE_PORT),
  },
  sentry: {
    dsn: process.env.SENTRY_DSN,
  },
  throttle: {
    ttl: process.env.THROTTLE_TTL,
    limit: process.env.THROTTLE_LIMIT,
  },
});
