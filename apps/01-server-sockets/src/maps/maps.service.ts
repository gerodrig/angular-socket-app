import { Injectable } from '@nestjs/common';
import { Map, MapInterface } from '@/classes/maps/map';
import { Marker } from '@/classes/maps/marker';

@Injectable()
export class MapsService {
  private readonly map = new Map();

  public getMarkers(): MapInterface {
    return this.map.getMarkers();
  }

  public addMarker(marker: Marker) {
    console.log('addMarker', marker);
    this.map.addMarker(marker);
  }

  public deleteMarker(id: string) {
    this.map.deleteMarker(id);
  }

  public moveMarker(marker: Marker) {
    //set marker position
    this.map.moveMarker(marker);
  }
}
