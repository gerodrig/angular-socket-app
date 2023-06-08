import { Marker } from './marker';

export interface MapInterface {
  [key: string]: Marker;
}

export class Map {
  private markers: MapInterface = {};

  //get markers
  public getMarkers(): MapInterface {
    return this.markers;
  }

  //add marker
  public addMarker(marker: Marker): MapInterface {
    this.markers[marker.id] = marker;
    return this.getMarkers();
  }

  public deleteMarker(id: string): MapInterface {
    delete this.markers[id];
    return this.getMarkers();
  }

  public moveMarker(marker: Marker): void {
    this.markers[marker.id].lat = marker.lat;
    this.markers[marker.id].lng = marker.lng;
  }
}
