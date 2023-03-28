import { IsString } from 'class-validator';

export class CreateSubjectDto {
  @IsString()
  code: string;

  @IsString()
  name: string;
}
