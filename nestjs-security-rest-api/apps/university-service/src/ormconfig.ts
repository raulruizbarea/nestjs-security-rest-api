import { DataSource } from 'typeorm';
import { SubjectDao } from './subjects/infrastructure/type-orm/subject.dao';
import { SubjectTeacherDao } from './subjects/infrastructure/type-orm/subjectteacher.dao';
import { TeacherDao } from './teachers/infrastructure/type-orm/teacher.dao';

require('dotenv').config({
  path: `./apps/university-service/src/environments/.env.${process.env.NODE_ENV}`,
});

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  database: process.env.DATABASE_DB,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  entities: [SubjectDao, TeacherDao, SubjectTeacherDao],
  migrations: ['./migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations',
  logging: true,
  synchronize: true,
});

switch (process.env.NODE_ENV) {
  case 'development':
    break;
  case 'test':
    Object.assign(AppDataSource.options, {
      migrationsRun: true,
    });
    break;
  case 'production':
    break;
  default:
    throw new Error('unknown environment');
}

export default AppDataSource;
