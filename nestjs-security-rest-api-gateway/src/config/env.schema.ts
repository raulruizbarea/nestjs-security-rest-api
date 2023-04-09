import * as Joi from 'joi';

export const env_schema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'test').required(),
  PORT: Joi.number().required(),
});
