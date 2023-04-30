import * as Joi from 'joi';

export const envSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'test', 'production').required(),
  APP_NAME: Joi.string().required(),
  PORT: Joi.number().required(),
  UNIVERSITY_SERVICE_HOST: Joi.string().required(),
  UNIVERSITY_SERVICE_PORT: Joi.number().required(),
  DATABASE_HOST: Joi.string().required(),
  DATABASE_PORT: Joi.number().required(),
  DATABASE_DB: Joi.string().required(),
  DATABASE_USER: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
  SENTRY_DSN: Joi.string().required(),
});
