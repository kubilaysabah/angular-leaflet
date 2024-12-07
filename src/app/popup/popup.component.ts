import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-popup',
  imports: [CommonModule],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent {
  private _heat: number = 0;
  private _humidity: number = 0;

  type: 0 | 1 | 2 = 0;

  @Input() set heat(value: number) {
    this._heat = value;
  }

  @Input() set humidity(value: number) {
    this._humidity = value;
  }

  @Output() update = new EventEmitter<{ heat?: number; humidity?: number }>();

  get heat() {
    return this._heat;
  }

  get humidity() {
    return this._humidity;
  }

  updateData(value: string) {
    if (this.type === 1) {
      this._heat = parseInt(value);

      this.update.emit({
        heat: parseInt(value)
      });

      return;
    }

    this.humidity = parseInt(value);

    this.update.emit({
      humidity: parseInt(value)
    })
  }
}
