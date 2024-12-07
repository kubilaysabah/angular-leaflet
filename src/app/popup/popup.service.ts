import { ApplicationRef, ComponentRef, createComponent, EnvironmentInjector, Injectable } from '@angular/core';
import { NgElement, WithProperties } from '@angular/elements';
import { PopupComponent } from './popup.component';

@Injectable()
export class PopupService {
  constructor(
    private injector: EnvironmentInjector,
    private applicationRef: ApplicationRef,
  ) {}

  showAsComponent({ heat, humidity }: { heat: number; humidity: number }) {
    // Create element
    const popup = document.createElement('popup-component');
    // Create the component and wire it up with the element
    const popupComponentRef = createComponent(PopupComponent, {
      environmentInjector: this.injector,
      hostElement: popup,
    });
    // Attach to the view so that the change detector knows to run
    this.applicationRef.attachView(popupComponentRef.hostView);

    popupComponentRef.instance.heat = heat;
    popupComponentRef.instance.humidity = humidity;
    popupComponentRef.changeDetectorRef.detectChanges();

    return popup;
  }

  showAsElement({ heat, humidity }: { heat: number; humidity: number }) {
    const popupEl = document.createElement(
      'popup-element',
    ) as NgElement & WithProperties<PopupComponent>;

    popupEl.heat = heat;
    popupEl.humidity = humidity;

    return popupEl;
  }
}
