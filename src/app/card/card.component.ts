import { Component, Input } from '@angular/core';
import { NgOptimizedImage } from "@angular/common";

@Component({
  selector: 'app-card',
    imports: [
        NgOptimizedImage
    ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  batteries: { [key: number]: { name: string; icon: string; } } = {
    1: {
      name: 'Düşük Batarya',
      icon: '/low.svg'
    },
    2: {
      name: 'Yarım Batarya',
      icon: '/half.svg'
    },
    3: {
      name: 'Dolu Batarya',
      icon: '/full.svg'
    },
  }

  @Input() battery: number = 0;

  @Input() heat: number = 0;

  @Input() humidity: number = 0;

  @Input() date: Date = new Date();
}
