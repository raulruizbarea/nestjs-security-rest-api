import { Escape, Trim } from 'class-sanitizer';
import {
  IsEnum,
  IsNotEmpty,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

import { Languages } from '@app/shared/core/types/languages';
import { SubjectSettings } from '@app/shared/core/types/settings';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSubjectDto {
  @ApiProperty()
  @Escape()
  @Length(
    SubjectSettings.ACADEMICALYEAR_LENGTH,
    SubjectSettings.ACADEMICALYEAR_LENGTH,
    {
      message: `academicalYear must be exactly ${SubjectSettings.ACADEMICALYEAR_LENGTH} characters`,
    },
  )
  @Trim()
  @IsString()
  @IsNotEmpty()
  academicalYear: string;

  @ApiProperty()
  @Escape()
  @Length(SubjectSettings.CODE_LENGTH, SubjectSettings.CODE_LENGTH, {
    message: `code must be exactly ${SubjectSettings.CODE_LENGTH} characters`,
  })
  @Trim()
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({
    enum: Languages,
  })
  @IsEnum(Languages)
  @MaxLength(SubjectSettings.LANGUAGES_LENGTH)
  @Trim()
  @IsNotEmpty()
  lang: Languages;

  @ApiProperty()
  @Escape()
  @MaxLength(SubjectSettings.NAME_LENGTH)
  @Trim()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @Escape()
  @MaxLength(SubjectSettings.DESCRIPTION_LENGTH)
  @Trim()
  @IsString()
  @IsNotEmpty()
  description: string;
}
