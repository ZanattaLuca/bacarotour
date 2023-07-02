import { Component, Input, OnInit } from '@angular/core';
import { Bacaro } from '../model/bacaro';
import { Router } from '@angular/router';
import { BacariStore } from '../services/bacari.store';

@Component({
  selector: 'bacaro-list',
  template: ` <div class="flex justify-center">
    <div class="w-screen max-w-screen-lg">
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        (click)="onAdd()"
      >
        ADD NEW BACARO
      </button>
      <div class="grid grid-cols-1 md:grid-cols-2 auto-cols-fr">
        <div *ngFor="let bacaro of bacari" class="m-3">
          <div
            class="h-32 grid grid-cols-5 grid-rows-2 gap-2 border-teal-600 border-2 border-dotted p-2 rounded-md"
            (click)="OnClick(bacaro)"
          >
            <img
              class="row-span-2 col-span-2 object-cover w-full h-full rounded-md"
              [src]="bacaro.link ? (bacaro.link | assetPath) : ''"
              alt="bacaro-risorto-carnareggio"
            />
            <div class="row-start-1 col-start-3 col-span-3">
              <p class="font-sans text-base text-red-400 font-bold">
                {{ bacaro.nome }}
              </p>
              <p
                *ngIf="bacaro.costoSpritz && bacaro.costoSpritz > 0"
                class="font-sans text-base text-red-400"
              >
                Costo Spritz: {{ bacaro?.costoSpritz }}€
              </p>
            </div>
            <div
              class="items-end row-start-2 col-start-3 col-span-3 flex justify-between"
            >
              <card-stars class=" " [number]="bacaro.mediaTotale"></card-stars>
              <p class="order-last font-bold font-sans text-2xl text-teal-600">
                {{ bacaro.mediaTotale }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`,
  styles: [``],
})
export class BacariListComponent implements OnInit {
  bacari: Bacaro[] = [];

  constructor(private router: Router, private bacariStore: BacariStore) {}

  ngOnInit(): void {
    this.bacariStore.getAll();
    this.bacariStore.state$.subscribe((bacari) => {
      this.bacari = bacari;
    });
  }

  OnClick(bacaro: any) {
    this.router.navigate(['/bacari_edit', bacaro.id]);
    console.log(bacaro);
  }
  onAdd() {
    this.router.navigate(['/bacari_edit', -1]);
  }
}
