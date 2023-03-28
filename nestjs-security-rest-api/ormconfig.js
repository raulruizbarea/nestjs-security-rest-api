var dbConfig = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  database: process.env.DATABASE_DB,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  autoLoadEntities: true,
  synchronize: true,
};

switch (process.env.NODE_ENV) {
  case 'development':
  case 'test':
  case 'production':
  // Object.assign(dbConfig, {
  //   type: 'postgres',
  //   host: process.env.DATABASE_HOST,
  //   port: parseInt(process.env.DATABASE_PORT),
  //   database: process.env.DATABASE_DB,
  //   username: process.env.DATABASE_USER,
  //   password: process.env.DATABASE_PASSWORD,
  //   autoLoadEntities: true,
  //   synchronize: true,
  // });
  // break;
  default:
    throw new Error('unknown environment');
}

module.exports = dbConfig;
