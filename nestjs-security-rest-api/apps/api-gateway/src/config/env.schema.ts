import * as Joi from 'joi';

export const envSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'test', 'production').required(),
  APP_NAME: Joi.string().required(),
  API_GATEWAY_SCHEMA: Joi.string().required(),
  API_GATEWAY_HOST: Joi.string().required(),
  API_GATEWAY_PORT: Joi.number().required(),
  UNIVERSITY_SERVICE_HOST: Joi.string().required(),
  UNIVERSITY_SERVICE_PORT: Joi.number().required(),
  SENTRY_DSN: Joi.string().required(),
  THROTTLE_TTL: Joi.number().required(),
  THROTTLE_LIMIT: Joi.number().required(),
  AUTH0_ISSUER_URL: Joi.string().required(),
  AUTH0_AUDIENCE: Joi.string().required(),
});
