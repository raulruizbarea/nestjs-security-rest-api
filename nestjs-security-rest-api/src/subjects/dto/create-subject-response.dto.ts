import { IsNotEmpty } from 'class-validator';

export class CreateSubjectResponseDto {
  @IsNotEmpty()
  id: string;
}
