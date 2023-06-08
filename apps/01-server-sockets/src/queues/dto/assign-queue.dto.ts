//import { ApiModelProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsNumber } from 'class-validator';

export class DesktopDto {
  // @ApiModelProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly desktop: number;
}
