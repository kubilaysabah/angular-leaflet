import {
  Component,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
  Injector,
} from '@angular/core';
import { createCustomElement } from '@angular/elements';
import * as L from 'leaflet';

import { type State } from '../app.component';
import { PopupComponent } from '../popup/popup.component';
import { PopupService } from '../popup/popup.service';

@Component({
  selector: 'app-map',
  providers: [PopupService],
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements AfterViewInit {
  private map!: L.Map;

  private markers: Map<number, L.Marker> = new Map();

  private _data: State[] = [];

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

  selected: null | State = null;

  @Input() set data(data: State[]) {
    this._data = data;
    this.setMarker();
  }

  @Output() selectedItem = new EventEmitter<State>();
  @Output() update = new EventEmitter<{ heat?: number; humidity?: number }>();

  constructor(
    injector: Injector,
    public popup: PopupService,
  ) {
    // Convert `PopupComponent` to a custom element.
    const PopupElement = createCustomElement(PopupComponent, {injector});
    // Register the custom element with the browser.
    customElements.define('popup-element', PopupElement);
  }

  ngAfterViewInit(): void {
    this.initMap();
    this.setMarker();
  }

  get data(): State[] {
    return this._data;
  }

  icon() {
    return L.icon({
      iconUrl: '/pin.svg',
      shadowUrl: '/pin-shadow.svg',

      iconSize:     [50, 80.5], // size of the icon
      shadowSize:   [50, 80.5], // size of the shadow
      iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
      shadowAnchor: [20, 50],  // the same for the shadow
      popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });
  }

  setMarker() {
    this.data.forEach((item) => {
      const marker = L.marker([item.position.x, item.position.y], { icon: this.icon() }).addTo(this.map);
      const popup = this.popup.showAsComponent({ heat: item.heat, humidity: item.humidity, update: ({ heat, humidity }) => this.updateMarker({ humidity, heat }) });

      marker.bindPopup(popup, {
        minWidth: 300,

      });

      this.markers.set(item.id, marker);

      this.selected = item;

      marker.on('click', () => {
        this.selected = item;
        this.selectedItem.emit(item);
      });
    })
  }

  updateMarker({ heat, humidity }: { heat?: number; humidity?: number }) {
    this.update.emit({
      heat,
      humidity,
    })

    if(!this.selected?.position.x || !this.selected?.position.y) return;

    if (this.selected) {
      const marker = this.markers.get(this.selected.id);

      if (marker) {
        marker.closePopup();
      }

      this.selected = null;
    }
  }
}
