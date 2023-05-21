import { INestApplication } from '@nestjs/common';
import helmet from 'helmet';

export const nestApplicationSecurity = (app: INestApplication) => {
  app.use(helmet());
  app.enableCors();
};
