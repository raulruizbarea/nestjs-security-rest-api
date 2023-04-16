import { CreateSubjectResponseDto } from '@app/shared/subjects/dto/create-subject-response.dto';
import { CreateSubjectDto } from '@app/shared/subjects/dto/create-subject.dto';
import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { Tags } from '../core/constants/swagger/tags';
import { SubjectsService } from './subjects.service';

@ApiTags(Tags.SUBJECTS)
@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}
  @Post()
  create(@Body() body: CreateSubjectDto): Observable<CreateSubjectResponseDto> {
    try {
      return this.subjectsService.create(body);
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
