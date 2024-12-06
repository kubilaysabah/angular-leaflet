import { Component, Input, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { State } from '../app.component';

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements AfterViewInit {
  private _data: State[] = [];

  private map!: L.Map;

  private initMap(): void {
    this.map = L.map('map', {
      center: [39.5472702, 32.1401521],
      zoom: 7,
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  @Input() set data(value: State[]) {
    this._data = value;
  };

  ngAfterViewInit(): void {
    this.initMap();
    this.setMarker();
  }

  get data(): State[] {
    return this._data;
  }

  setMarker() {
    const icon = L.icon({
      iconUrl: '/pin.svg',
      shadowUrl: '/pin-shadow.svg',

      iconSize:     [50, 80.5], // size of the icon
      shadowSize:   [50, 80.5], // size of the shadow
      iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
      shadowAnchor: [20, 50],  // the same for the shadow
      popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });

    this.data.forEach((item) => {
      L.marker([item.position.x, item.position.y], { icon: icon }).addTo(this.map).bindPopup("I am a green leaf.");
    })
  }
}
