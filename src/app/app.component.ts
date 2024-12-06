import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

import { CardComponent } from './card/card.component';
import { MapComponent } from './map/map.component';
import { HeaderComponent } from './header/header.component';

export interface State {
  id: number;
  date: Date;
  heat: number;
  humidity: number;
  battery: number;
  position: {
    x: number;
    y: number;
  }
}

@Component({
  selector: 'app-root',
  imports: [NgOptimizedImage, CardComponent, MapComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  data: State[] = [
    {
      id: 1,
      date: new Date(),
      heat: 28,
      humidity: 27,
      battery: 0,
      position: { x: 41.0713044, y: 28.9782975 }
    },
    {
      id: 2,
      date: new Date(),
      heat: 28,
      humidity: 27,
      battery: 1,
      position: { x: 41.0918035, y: 28.871882 }
    },
    {
      id: 3,
      date: new Date(),
      heat: 28,
      humidity: 27,
      battery: 2,
      position: { x: 41.1132139, y: 28.7897675 }
    },
    {
      id: 4,
      date: new Date(),
      heat: 28,
      humidity: 27,
      battery: 0,
      position: { x: 41.0116669, y: 29.1345529 }
    },
    {
      id: 5,
      date: new Date(),
      heat: 28,
      humidity: 27,
      battery: 1,
      position: { x: 40.3459426, y: 28.9281458 }
    },
    {
      id: 6,
      date: new Date(),
      heat: 28,
      humidity: 27,
      battery: 2,
      position: { x: 39.5472702, y: 32.1401521 }
    }
  ]
}
