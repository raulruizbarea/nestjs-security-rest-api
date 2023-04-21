import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

import { Languages } from '@app/shared/core/types/languages';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSubjectDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  academicalYear: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({
    enum: Languages,
  })
  @IsEnum(Languages)
  @IsNotEmpty()
  lang: Languages;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;
}
