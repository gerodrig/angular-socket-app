import { Controller, Get } from '@nestjs/common';
import { MapsService } from './maps.service';

@Controller('maps')
export class MapsController {
  constructor(public mapService: MapsService) {}

  @Get()
  getMaps() {
    // return { message: 'Hello from MapsController' };
    return this.mapService.getMarkers();
  }
}
