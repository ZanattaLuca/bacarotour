import { Component, Input } from '@angular/core';

@Component({
  selector: 'card-stars',
  template: `
    <ng-container class="d-flex justify-content-between" [ngSwitch]="number">
      <div *ngSwitchCase="1" class="d-flex justify-content-between mx-auto">
        <i
          class="text-2xl text-teal-600 star-icon p-0 fa-solid fa-star-half-stroke"
        ></i>
        <i class="text-2xl text-teal-600 star-icon p-0 fa-regular fa-star"></i>
        <i class="text-2xl text-teal-600 star-icon p-0 fa-regular fa-star"></i>
        <i class="text-2xl text-teal-600 star-icon p-0 fa-regular fa-star"></i>
        <i class="text-2xl text-teal-600 star-icon p-0 fa-regular fa-star"></i>
      </div>

      <div *ngSwitchCase="2" class="d-flex justify-content-between mx-auto">
        <i class="text-2xl text-teal-600 star-icon p-0 fa-solid fa-star"></i>
        <i class="text-2xl text-teal-600 star-icon p-0 fa-regular fa-star"></i>
        <i class="text-2xl text-teal-600 star-icon p-0 fa-regular fa-star"></i>
        <i class="text-2xl text-teal-600 star-icon p-0 fa-regular fa-star"></i>
        <i class="text-2xl text-teal-600 star-icon p-0 fa-regular fa-star"></i>
      </div>

      <div *ngSwitchCase="3" class="d-flex justify-content-between mx-auto">
        <i class="text-2xl text-teal-600 star-icon p-0 fa-solid fa-star"></i>
        <i
          class="text-2xl text-teal-600 star-icon p-0 fa-solid fa-star-half-stroke"
        ></i>
        <i class="text-2xl text-teal-600 star-icon p-0 fa-regular fa-star"></i>
        <i class="text-2xl text-teal-600 star-icon p-0 fa-regular fa-star"></i>
        <i class="text-2xl text-teal-600 star-icon p-0 fa-regular fa-star"></i>
      </div>

      <div *ngSwitchCase="4" class="d-flex justify-content-between mx-auto">
        <i class="text-2xl text-teal-600 star-icon p-0 fa-solid fa-star"></i>
        <i class="text-2xl text-teal-600 star-icon p-0 fa-solid fa-star"></i>
        <i class="text-2xl text-teal-600 star-icon p-0 fa-regular fa-star"></i>
        <i class="text-2xl text-teal-600 star-icon p-0 fa-regular fa-star"></i>
        <i class="text-2xl text-teal-600 star-icon p-0 fa-regular fa-star"></i>
      </div>

      <div *ngSwitchCase="5" class="d-flex justify-content-between mx-auto">
        <i class="text-2xl text-teal-600 star-icon p-0 fa-solid fa-star"></i>
        <i class="text-2xl text-teal-600 star-icon p-0 fa-solid fa-star"></i>
        <i
          class="text-2xl text-teal-600 star-icon p-0 fa-solid fa-star-half-stroke"
        ></i>
        <i class="text-2xl text-teal-600 star-icon p-0 fa-regular fa-star"></i>
        <i class="text-2xl text-teal-600 star-icon p-0 fa-regular fa-star"></i>
      </div>

      <div *ngSwitchCase="6" class="d-flex justify-content-between mx-auto">
        <i class="text-2xl text-teal-600 star-icon p-0 fa-solid fa-star"></i>
        <i class="text-2xl text-teal-600 star-icon p-0 fa-solid fa-star"></i>
        <i class="text-2xl text-teal-600 star-icon p-0 fa-solid fa-star"></i>
        <i class="text-2xl text-teal-600 star-icon p-0 fa-regular fa-star"></i>
        <i class="text-2xl text-teal-600 star-icon p-0 fa-regular fa-star"></i>
      </div>

      <div *ngSwitchCase="7" class="d-flex justify-content-between mx-auto">
        <i class="text-2xl text-teal-600 star-icon p-0 fa-solid fa-star"></i>
        <i class="text-2xl text-teal-600 star-icon p-0 fa-solid fa-star"></i>
        <i class="text-2xl text-teal-600 star-icon p-0 fa-solid fa-star"></i>
        <i
          class="text-2xl text-teal-600 star-icon p-0 fa-solid fa-star-half-stroke"
        ></i>
        <i class="text-2xl text-teal-600 star-icon p-0 fa-regular fa-star"></i>
      </div>

      <div *ngSwitchCase="8" class="d-flex justify-content-between mx-auto">
        <i class="text-2xl text-teal-600 star-icon p-0 fa-solid fa-star"></i>
        <i class="text-2xl text-teal-600 star-icon p-0 fa-solid fa-star"></i>
        <i class="text-2xl text-teal-600 star-icon p-0 fa-solid fa-star"></i>
        <i class="text-2xl text-teal-600 star-icon p-0 fa-solid fa-star"></i>
        <i class="text-2xl text-teal-600 star-icon p-0 fa-regular fa-star"></i>
      </div>

      <div *ngSwitchCase="9" class="d-flex justify-content-between mx-auto">
        <i class="text-2xl text-teal-600 star-icon p-0 fa-solid fa-star"></i>
        <i class="text-2xl text-teal-600 star-icon p-0 fa-solid fa-star"></i>
        <i class="text-2xl text-teal-600 star-icon p-0 fa-solid fa-star"></i>
        <i class="text-2xl text-teal-600 star-icon p-0 fa-solid fa-star"></i>
        <i
          class="text-2xl text-teal-600 star-icon p-0 fa-solid fa-star-half-stroke"
        ></i>
      </div>

      <div *ngSwitchCase="10" class="d-flex justify-content-between mx-auto">
        <i class="text-2xl text-teal-600 star-icon p-0 fa-solid fa-star"></i>
        <i class="text-2xl text-teal-600 star-icon p-0 fa-solid fa-star"></i>
        <i class="text-2xl text-teal-600 star-icon p-0 fa-solid fa-star"></i>
        <i class="text-2xl text-teal-600 star-icon p-0 fa-solid fa-star"></i>
        <i class="text-2xl text-teal-600 star-icon p-0 fa-solid fa-star"></i>
      </div>
    </ng-container>
  `,
  styles: [
    `
      /* .star-icon {
        font-size: 1.5em;
        color: #189ba3;
      } */
    `,
  ],
})
export class BacariRating {
  @Input() number?: number = undefined;
}
