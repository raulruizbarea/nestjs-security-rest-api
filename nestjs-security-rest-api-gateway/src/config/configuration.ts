export default () => ({
  environment: process.env.NODE_ENV,
  port: parseInt(process.env.PORT),
  university: {
    host: process.env.UNIVERSITY_SERVICE_HOST,
    port: parseInt(process.env.UNIVERSITY_SERVICE_PORT),
  },
});
