import { Component, OnInit, signal, WritableSignal } from '@angular/core';
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
export class AppComponent implements OnInit {
  data: WritableSignal<State[]> = signal([]);

  selected: State | null = null;

  ngOnInit(): void {
    this.generateData();
  }

  generateData() {
    this.data.set(Array.from({ length: 10 }).map((_, index) => ({
      id: index,
      date: this.randomDate(),
      heat: this.randomHeat(),
      humidity: this.randomHumidity(),
      battery: this.randomBattery(),
      position: {
        x: parseFloat(this.randomCoords().x),
        y: parseFloat(this.randomCoords().y),
      }
    })));
  }

  randomCoords(): { x: string; y: string; } {
    const minLat = 35.8;
    const maxLat = 42.1;
    const minLon = 25.7;
    const maxLon = 44.8;

    return {
      x: (Math.random() * (maxLat - minLat) + minLat).toFixed(6),
      y: (Math.random() * (maxLon - minLon) + minLon).toFixed(6),
    }
  }

  randomHeat(): number {
    return Math.floor(Math.random() * 45) + 1;
  }

  randomHumidity(): number {
    return Math.floor(Math.random() * 100) + 1;
  }

  randomBattery(): number {
    return Math.floor(Math.random() * 3) + 1;
  }

  randomDate(): Date {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    return new Date(yesterday.getTime() + Math.random() * (today.getTime() - yesterday.getTime()));
  }

  update({ heat, humidity }: { heat?: number; humidity?: number }) {
    if (!this.selected) {
      return;
    }

    this.data.update(value =>
      value.map(state =>
        state.id === this.selected?.id
          ? { ...state, heat: heat ?? state.heat, humidity: humidity ?? state.humidity }
          : state
      )
    );

    this.selected = null;
  }

  trackById(index: number, item: State): number {
    return item.id;
  }
}
