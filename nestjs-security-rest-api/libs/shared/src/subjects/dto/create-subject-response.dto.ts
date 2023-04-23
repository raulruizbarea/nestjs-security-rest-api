import { IsNotEmpty, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateSubjectResponseDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly id: string;

  constructor(id: string) {
    this.id = id;
  }
}
