import { Body, Post } from '@nestjs/common/decorators';
import { Controller } from '@nestjs/common';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { SubjectsService } from './subjects.service';
import { Subject } from './entities/subject.entity';

@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @Post()
  create(@Body() body: CreateSubjectDto) {
    return this.subjectsService.create(Subject.fromDto(body));
  }
}
