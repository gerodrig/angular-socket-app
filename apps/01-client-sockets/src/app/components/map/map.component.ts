import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as mapboxgl from 'mapbox-gl';
import Swal from 'sweetalert2';

import { environment } from '../../../environments/environment';
import { Place } from 'src/app/interfaces/place.interface';
import { WebsocketService } from '../../services/websocket.service';

interface MarkersResponse {
  [key: string]: Place;
}

@Component({
  selector: 'app-map-display',
  templateUrl: './map.component.html',
  styles: [
    `
      button {
        position: fixed;
        top: 10px;
        right: 10px;
        padding: 5px;
        z-index: 90;
      }
      div {
        position: fixed;
      }

      #map {
        height: 100%;
        width: 100%;
        margin: 0px;
        padding: 0px;
        z-index: 10;

        background-color: red;
      }
    `,
  ],
})
export class MapDisplayComponent implements AfterViewInit, OnInit {
  map: mapboxgl.Map | undefined;
  places: MarkersResponse = {};
  markersMapbox: { [id: string]: mapboxgl.Marker } = {};
  markerName: string = 'New Place';
  clientId: string | undefined;

  constructor(
    private renderer: Renderer2,
    public http: HttpClient,
    public wsService: WebsocketService
  ) {}

  ngOnInit(): void {
    this.http
      .get<MarkersResponse>(`${environment.wsUrl}/maps`)
      .subscribe((places) => {
        this.places = places;
        this.createMap();
      });

    this.listenToSockets();

    //get client id from wss services
    //check if id is in local storage
      if(localStorage.getItem('clientId')){
        this.clientId = localStorage.getItem('clientId')!;
      } else {
        this.wsService.clientId$.subscribe((clientId) => {
    
          this.clientId = clientId;
          localStorage.setItem('clientId', clientId);
        });

      }


  }

  ngAfterViewInit(): void {
    this.renderer.setStyle(document.body, 'width', '100%');
    this.renderer.setStyle(document.body, 'height', '100%');
    this.renderer.setStyle(document.body, 'margin', '0');
    this.renderer.setStyle(document.body, 'padding', '0');

    this.renderer.setStyle(document.documentElement, 'width', '100%');
    this.renderer.setStyle(document.documentElement, 'height', '100%');
    this.renderer.setStyle(document.documentElement, 'margin', '0');
    this.renderer.setStyle(document.documentElement, 'padding', '0');
  }

  createMap() {
    this.map = new mapboxgl.Map({
      accessToken: environment.mapboxToken,
      container: 'map', // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-113.98784, 51.26828], // starting position [lng, lat]
      zoom: 15.8, // starting zoom
    });

    for (const [id, place] of Object.entries(this.places)) {
      this.addMarker(place);
    }
  }

  listenToSockets() {
    //new marker
    this.wsService.listen('new-marker').subscribe((marker: Place) => {
      this.addMarker(marker);
    });
    // move marker
    this.wsService.listen('move-marker').subscribe((marker: Place) => {
      this.markersMapbox[marker.id].setLngLat([marker.lng, marker.lat]);
    });

    // delete marker
    this.wsService.listen('delete-marker').subscribe((id: string) => {

      this.markersMapbox[id].remove();
      delete this.markersMapbox[id];
    });


  }

  addMarker(place: Place) {
    console.log({ place });
    const h2 = document.createElement('h3');
    h2.innerText = place.name;

    const br = document.createElement('br');

    const div = document.createElement('div');
    div.classList.add('d-flex', 'flex-column', 'align-items-center', 'm-2');

    if (place.userId === this.clientId) {
      const btnDelete = document.createElement('button');
      btnDelete.classList.add('btn', 'btn-danger');
      btnDelete.innerText = 'Delete';
      div.append(h2, br, btnDelete);

      btnDelete.addEventListener('click', () => {
        marker.remove();
  
        // Delete this marker via sockets
        this.wsService.emit('delete-marker', place.id);
      });

    } else {
      div.append(h2, br);
    }

    

    const customPopup = new mapboxgl.Popup({
      offset: 25,
      closeOnClick: false,
    });
    customPopup.setDOMContent(div);
    const marker = new mapboxgl.Marker({
      draggable: place.userId === this.clientId,
      color: place.color,
    });
    marker
      .setLngLat([place.lng, place.lat])
      .setPopup(customPopup)
      .addTo(this.map!);

    marker.on('drag', () => {
      const lngLat = marker.getLngLat();

      //Create event to emit this marker coordinates
      this.wsService.emit('move-marker', { id: place.id, ...lngLat });
    });

    this.markersMapbox[place.id] = marker;
  }

  createMarker() {
    // create random color
    const color = '#' + Math.floor(Math.random() * 16777215).toString(16);

    // get current lat and lng
    const { lng, lat } = this.map!.getCenter();

    const customMarker: Place = {
      id: new Date().toISOString(),
      userId: this.clientId,
      name: this.markerName,
      lat,
      lng,
      color,
    };
    this.addMarker(customMarker);

    this.places[customMarker.id] = customMarker;

    //emit new marker via sockets
    this.wsService.emit('new-marker', customMarker);
  }

  showInputDialog(){
    Swal.fire({
      title: 'Enter marker name',
      input: 'text',
      inputPlaceholder: 'Marker name',
      confirmButtonColor: '#3085d6',
      showCancelButton: true,
      allowOutsideClick: true,
      inputValidator: (value) => {
        if (!value) {
          return 'You must enter a marker name!';
        }
        return null;
      },
    }).then((result) => {
      if (result.isConfirmed) {
        this.markerName = result.value!;
        this.createMarker();
      }
    });
  }
}
