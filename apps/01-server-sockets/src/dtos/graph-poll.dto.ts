//import { ApiModelProperty } from '@nestjs/swagger';

import { IsIn, IsNumber, IsString } from 'class-validator';

export class GraphPollDto {
  //check if label is in the list of labels pri, pan prd, morena
  @IsString()
  @IsIn(['pri', 'pan', 'prd', 'morena'])
  label: string;

  // @ApiModelProperty()
  @IsNumber()
  value: number;
}
