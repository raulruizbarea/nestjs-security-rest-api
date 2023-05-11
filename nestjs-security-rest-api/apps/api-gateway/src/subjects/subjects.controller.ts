import { PageOptionsDto } from '@app/shared/core/dto/page-options.dto';
import { PageDto } from '@app/shared/core/dto/page.dto';
import { SubjectPermissionName } from '@app/shared/subjects/constants/subject-permission-name';
import { CreateSubjectResponseDto } from '@app/shared/subjects/dto/create-subject-response.dto';
import { CreateSubjectDto } from '@app/shared/subjects/dto/create-subject.dto';
import { SubjectResponseDto } from '@app/shared/subjects/dto/subject-response.dto';
import { UpdateSubjectDto } from '@app/shared/subjects/dto/update-subject.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Sanitizer, sanitize } from 'class-sanitizer';
import { Observable } from 'rxjs';
import { Permissions } from '../auth/decorators/permissions.decorator';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { Tags } from '../core/constants/swagger/tags';
import { SubjectsService } from './subjects.service';

import { AuthUser } from '../auth/decorators/user.decorator';
import { UserDto } from '../auth/dto/user.dto';

@ApiTags(Tags.SUBJECTS)
@ApiBearerAuth('access-token')
@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @ApiOperation({
    summary: 'Create a new subject',
    description: 'Create a new subject',
  })
  @ApiBody({
    type: CreateSubjectDto,
    required: true,
  })
  @ApiCreatedResponse({
    description: 'The subject has been successfully created.',
    type: CreateSubjectResponseDto,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error.',
  })
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Post()
  @Permissions(SubjectPermissionName.CREATE)
  create(
    @Body() createSubjectDto: CreateSubjectDto,
    @AuthUser(new ValidationPipe({ validateCustomDecorators: true }))
    userDto: UserDto,
  ): Observable<CreateSubjectResponseDto> {
    try {
      sanitize(createSubjectDto);

      return this.subjectsService.create(createSubjectDto, userDto);
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @ApiOperation({
    summary: 'Find a subject by code',
    description: 'Find a subject by code',
  })
  @ApiParam({
    name: 'code',
    required: true,
  })
  @ApiOkResponse({
    description: 'The subject has been found.',
    type: SubjectResponseDto,
  })
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Get(':code')
  @Permissions(SubjectPermissionName.READ)
  findOne(@Param('code') code: string): Observable<SubjectResponseDto> {
    code = Sanitizer.escape(code).trim();

    return this.subjectsService.findOne(code);
  }

  @ApiOperation({
    summary: 'Find all subjects',
    description: 'Find all subjects',
  })
  @ApiOkResponse({
    description: 'The subject has been found.',
    type: SubjectResponseDto,
    isArray: true,
  })
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Get()
  @Permissions(SubjectPermissionName.READ)
  findAll(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Observable<PageDto<SubjectResponseDto>> {
    return this.subjectsService.findAll(pageOptionsDto);
  }

  @ApiOperation({
    summary: 'Update a subject by code',
    description: 'Update a subject by code',
  })
  @ApiOkResponse({
    description: 'The subject has been updated.',
    type: Number,
  })
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Patch(':code')
  @Permissions(SubjectPermissionName.UPDATE)
  update(
    @Param('code') code: string,
    @Body() updateSubjectDto: UpdateSubjectDto,
    @AuthUser(new ValidationPipe({ validateCustomDecorators: true }))
    userDto: UserDto,
  ): Observable<number> {
    // if (Object.values(updateSubjectDto).some((value) => value === null)) {
    //   throw new HttpException(
    //     'updateSubjectDto cannot contain null values',
    //     HttpStatus.BAD_REQUEST,
    //   );
    // }
    code = Sanitizer.escape(code).trim();
    sanitize(updateSubjectDto);

    return this.subjectsService.update(code, updateSubjectDto, userDto);
  }

  @ApiOperation({
    summary: 'Delete a subject by code',
    description: 'Delete a subject by code',
  })
  @ApiOkResponse({
    description: 'The subject has been deleted.',
    type: Number,
  })
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Delete(':code')
  @Permissions(SubjectPermissionName.DELETE)
  remove(@Param('code') code: string): Observable<number> {
    code = Sanitizer.escape(code).trim();

    return this.subjectsService.remove(code);
  }

  @ApiOperation({
    summary: 'Delete all subjects',
    description: 'Delete all subjects',
  })
  @ApiOkResponse({
    description: 'The subjects have been deleted.',
    type: Number,
  })
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Delete()
  @Permissions(SubjectPermissionName.DELETE)
  removeAll(): Observable<number> {
    return this.subjectsService.removeAll();
  }
}
