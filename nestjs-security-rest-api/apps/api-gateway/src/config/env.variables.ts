export interface EnvironmentVariables {
  environment: string;
  name: string;
  schema: string;
  host: string;
  port: number;
  university: {
    host: string;
    port: number;
  };
  sentry: {
    dsn: string;
  };
  throttle: {
    ttl: number;
    limit: number;
  };
  auth0: {
    issuerUrl: string;
    audience: string;
  };
}
