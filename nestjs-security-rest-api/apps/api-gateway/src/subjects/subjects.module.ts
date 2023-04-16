import { Module } from '@nestjs/common';
import { SubjectsController } from './subjects.controller';
import { SubjectsService } from './subjects.service';

@Module({
  providers: [SubjectsService],
  controllers: [SubjectsController],
})
export class SubjectsModule {}
