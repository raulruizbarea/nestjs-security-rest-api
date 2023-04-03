import { Controller, HttpException, HttpStatus } from '@nestjs/common';
import { Body, Post } from '@nestjs/common/decorators';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { Subject } from './entities/subject.entity';
import { SubjectsService } from './subjects.service';

@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @Post()
  create(@Body() body: CreateSubjectDto) {
    try {
      return this.subjectsService.create(Subject.fromDto(body));
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
