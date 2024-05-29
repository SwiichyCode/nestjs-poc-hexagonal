import { IsString, IsNotEmpty } from 'class-validator';

export class TestDto {
  @IsString()
  @IsNotEmpty()
  content: string;
}
