import { ConfigModule, ConfigService } from '@nestjs/config';

import { Module } from '@nestjs/common';
import { SubjectDao } from './infrastructure/type-orm/subject.dao';
import { SubjectsController } from './subjects.controller';
import { SubjectsService } from './subjects.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`src/environments/.env.${process.env.NODE_ENV}`],
    }),
    TypeOrmModule.forRoot(),
    // TypeOrmModule.forRootAsync({
    //   inject: [ConfigService],
    //   useFactory: (config: ConfigService) => {
    //     return {
    //       type: 'postgres',
    //       host: config.get<string>('DATABASE_HOST'),
    //       port: config.get<number>('DATABASE_PORT'),
    //       database: config.get<string>('DATABASE_DB'),
    //       username: config.get<string>('DATABASE_USER'),
    //       password: config.get<string>('DATABASE_PASSWORD'),
    //       autoLoadEntities: true,
    //       synchronize: true,
    //     };
    //   },
    // }),
    // TypeOrmModule.forFeature([SubjectDao]),
  ],
  controllers: [SubjectsController],
  providers: [SubjectsService],
})
export class SubjectsModule {
  constructor(private configService: ConfigService) {}
}
