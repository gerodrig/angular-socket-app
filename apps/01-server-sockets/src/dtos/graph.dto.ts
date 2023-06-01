//import { ApiModelProperty } from '@nestjs/swagger';

import { IsNumber, IsString } from 'class-validator';

export class GraphDto {
  @IsString()
  month: string;
  // @ApiModelProperty()
  @IsNumber()
  value: number;
}
