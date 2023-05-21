import { NestApplicationOptions } from '@nestjs/common';
import * as fs from 'fs';

export const nestApplicationOptions: NestApplicationOptions = {
  bufferLogs: true,
  httpsOptions: {
    key: fs.readFileSync('./secrets/key.pem'),
    cert: fs.readFileSync('./secrets/cert.pem'),
  },
};
