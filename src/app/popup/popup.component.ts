import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-popup',
  imports: [CommonModule],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent {
  type: 0 | 1 | 2 = 0;

  @Input() heat: number = 0;

  @Input() humidity: number = 0;
}
