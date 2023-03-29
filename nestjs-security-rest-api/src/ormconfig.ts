import { DataSource } from 'typeorm';

require('dotenv').config({
  path: `./src/environments/.env.${process.env.NODE_ENV}`,
});

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  database: process.env.DATABASE_DB,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  entities: ['**/**.dao{.ts,.js}'],
  // migrationsRun: true,
  migrations: ['migrations/*.js'],
  migrationsTableName: 'migrations',
  logging: true,
  synchronize: false,
});

export default AppDataSource;
