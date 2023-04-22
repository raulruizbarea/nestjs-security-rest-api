import 'winston-daily-rotate-file';

import * as winston from 'winston';

import { utilities as nestWinstonModuleUtilities } from 'nest-winston';

const ecsFormat = require('@elastic/ecs-winston-format');

const consoleFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.ms(),
  nestWinstonModuleUtilities.format.nestLike('MyApp', {
    colors: true,
    prettyPrint: true,
  }),
);

const fileTransport = new winston.transports.DailyRotateFile({
  filename: '%DATE%-application.log',
  dirname: './logs',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: false,
  maxFiles: '30d',
  format: ecsFormat({ convertReqRes: true }),
  level: 'http',
});

const consoleTransport = new winston.transports.Console({
  format: consoleFormat,
});

const winstonConfig = {
  transports: [fileTransport, consoleTransport],
};

export default winstonConfig;
