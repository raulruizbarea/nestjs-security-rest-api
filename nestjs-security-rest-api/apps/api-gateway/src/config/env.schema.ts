import * as Joi from 'joi';

export const envSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'test', 'production').required(),
  PORT: Joi.number().required(),
  UNIVERSITY_SERVICE_HOST: Joi.string().required(),
  UNIVERSITY_SERVICE_PORT: Joi.number().required(),
});
