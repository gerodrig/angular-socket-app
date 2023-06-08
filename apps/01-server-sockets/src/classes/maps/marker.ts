export class Marker {
  constructor(
    public id: string,
    public name: string,
    public lat: number,
    public lng: number,
    public color: string,
    public userId?: string,
  ) {}
}
