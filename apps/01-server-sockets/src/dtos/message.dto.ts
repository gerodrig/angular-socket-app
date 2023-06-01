import { IsString, MinLength } from 'class-validator';

export class NewMessageDto {
  @IsString()
  @MinLength(1)
  message: string;

  @IsString()
  from: string;

  @IsString()
  @MinLength(1)
  name: string;

  @IsString()
  id: string;

  @IsString()
  date: string;

  isPrivate: boolean;
}
