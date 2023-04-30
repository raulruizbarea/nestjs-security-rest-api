export default () => ({
  environment: process.env.NODE_ENV,
  name: process.env.APP_NAME,
  port: parseInt(process.env.PORT),
  university: {
    host: process.env.UNIVERSITY_SERVICE_HOST,
    port: parseInt(process.env.UNIVERSITY_SERVICE_PORT),
  },
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT),
    db: process.env.DATABASE_DB,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
  },
  sentry: {
    dsn: process.env.SENTRY_DSN,
  },
});
