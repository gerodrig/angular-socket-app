//import { ApiModelProperty } from '@nestjs/swagger';

export class MarkerDto {
  // @ApiModelProperty()
  readonly id: string;
  // @ApiModelProperty()
  readonly name: string;

  readonly lat: number;
  readonly lng: number;
  readonly color: string;

  readonly userId?: string;
}
