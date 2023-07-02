import { NgModule } from '@angular/core';
import { BacariListComponent } from './components/bacari-list.component';
import { AssetPathPipe } from 'src/app/shared/pipes/asset-path.pipe';
import { CommonModule } from '@angular/common';
import { CardRateStarsModule } from 'src/app/shared/components/bacari-ratings.module';
import { FormsModule } from '@angular/forms';
import { BacaroEditComponent } from './components/bacaro-edit.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [BacariListComponent, AssetPathPipe, BacaroEditComponent],
  imports: [
    MatInputModule,
    CommonModule,
    CardRateStarsModule,
    FormsModule,
    MatSliderModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [],
  exports: [BacariListComponent],
})
export class BacariModule {}
