//import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UserDto {
  // @ApiModelProperty()
  @IsString()
  id: string;
  // @ApiModelProperty()
  @IsString()
  name = 'guest';

  @IsString()
  room = 'no-room';
}
