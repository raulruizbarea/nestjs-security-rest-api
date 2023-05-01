import 'winston-daily-rotate-file';

import * as winston from 'winston';

import { utilities as nestWinstonModuleUtilities } from 'nest-winston';

const consoleFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.ms(),
  nestWinstonModuleUtilities.format.nestLike('Winston', {
    colors: true,
    prettyPrint: true,
  }),
);

const consoleTransport = new winston.transports.Console({
  format: consoleFormat,
});

const winstonConfig = {
  transports: [consoleTransport],
  level: 'info',
};

export default winstonConfig;
