export default () => ({
  environment: process.env.NODE_ENV,
  schema: process.env.API_GATEWAY_SCHEMA,
  host: process.env.API_GATEWAY_HOST,
  port: parseInt(process.env.API_GATEWAY_PORT),
  university: {
    host: process.env.UNIVERSITY_SERVICE_HOST,
    port: parseInt(process.env.UNIVERSITY_SERVICE_PORT),
  },
});
