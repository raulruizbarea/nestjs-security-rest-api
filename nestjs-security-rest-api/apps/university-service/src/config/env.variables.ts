export interface EnvironmentVariables {
  environment: string;
  name: string;
  port: number;
  university: {
    host: string;
    port: number;
  };
  sentry: {
    dsn: string;
  };
  database: {
    host: string;
    port: number;
    db: string;
    user: string;
    password: string;
  };
}
