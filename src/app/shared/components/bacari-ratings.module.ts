import { NgModule } from '@angular/core';
import { BacariRating } from './bacari-rating.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [BacariRating],
  imports: [CommonModule],
  exports: [BacariRating],
})
export class CardRateStarsModule {}
