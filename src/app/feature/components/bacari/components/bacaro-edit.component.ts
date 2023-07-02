import { Component, OnInit } from '@angular/core';
import { Bacaro } from '../model/bacaro';
import { HttpClient } from '@angular/common/http';
import { BacaroStore } from '../services/bacaro.store';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  template: `
    <div class="grid justify-items-center m-4 h-full">
      <form
        class="w-full justify-items-center"
        (ngSubmit)="onSubmit(editForm)"
        #editForm="ngForm"
      >
        <div class="flex justify-center">
          <div
            class="w-full max-w-md grid gap-4 grid-cols-1 md:grid-cols-2 md:max-w-3xl px-8"
          >
            <input
              required
              class=" focus:outline-none font-bold font-sans text-2xl text-teal-600 bg-transparent border-b-2 border-red-300"
              autocomplete="off"
              matInput
              placeholder="Nome Bacaro"
              [(ngModel)]="bacaro.nome"
              name="nome"
              type="text"
              [disabled]="!(modify$ | async)"
            />

            <input
              class=" focus:outline-none font-bold font-sans text-2xl text-teal-600 bg-transparent border-b-2 border-red-300"
              autocomplete="off"
              matInput
              placeholder="Costo Spritz"
              [(ngModel)]="bacaro.costoSpritz"
              name="costoSpritz"
              type="number"
              [disabled]="!(modify$ | async)"
            />

            <div class="w-full grid grid-cols-1">
              <!-- CICCHETTO -->
              <div class="flex flex-col w-full">
                <mat-slider
                  *ngIf="modify$ | async"
                  class="w-full m-0"
                  [max]="10"
                  [min]="1"
                  [step]="1"
                  [showTickMarks]="true"
                  discrete
                >
                  <input
                    matSliderThumb
                    (valueChange)="setCicchetto($event)"
                    (dragStart)="showNumber = false"
                    (dragEnd)="showNumber = true"
                    [ngModel]="bacaro.cicchetto"
                    name="cicchetto"
                    required
                    id="cicchetto"
                  />
                </mat-slider>
                <p
                  class="self-start place-self-end font-bold font-sans text-2xl text-teal-600"
                >
                  cicchetto: {{ bacaro.cicchetto }}
                </p>
              </div>
              <!-- LOCATION -->
              <div class="flex flex-col w-full">
                <mat-slider
                  *ngIf="modify$ | async"
                  class="w-full m-0"
                  [max]="10"
                  [min]="1"
                  [step]="1"
                  [showTickMarks]="true"
                  discrete
                >
                  <input
                    matSliderThumb
                    (valueChange)="setLocation($event)"
                    (dragStart)="showNumber = false"
                    (dragEnd)="showNumber = true"
                    [ngModel]="bacaro.location"
                    name="location"
                    required
                    id="location"
                  />
                </mat-slider>
                <p
                  class="self-start place-self-end font-bold font-sans text-2xl text-teal-600"
                >
                  location: {{ bacaro.location }}
                </p>
              </div>
              <!-- SERVIZIO  -->
              <div class="flex flex-col w-full">
                <mat-slider
                  *ngIf="modify$ | async"
                  class="w-full m-0"
                  [max]="10"
                  [min]="1"
                  [step]="1"
                  [showTickMarks]="true"
                  discrete
                >
                  <input
                    matSliderThumb
                    (valueChange)="setServizio($event)"
                    (dragStart)="showNumber = false"
                    (dragEnd)="showNumber = true"
                    [ngModel]="bacaro.servizio"
                    name="servizio"
                    required
                    id="servizio"
                  />
                </mat-slider>
                <p
                  class="self-start place-self-end font-bold font-sans text-2xl text-teal-600"
                >
                  servizio: {{ bacaro.servizio }}
                </p>
              </div>
              <!-- AFFOLLAMENTO -->
              <div class="flex flex-col w-full">
                <mat-slider
                  *ngIf="modify$ | async"
                  class="w-full m-0 border-red-300"
                  [max]="10"
                  [min]="1"
                  [step]="1"
                  [showTickMarks]="true"
                  discrete
                >
                  <input
                    matSliderThumb
                    (valueChange)="setAffollamento($event)"
                    (dragStart)="showNumber = false"
                    (dragEnd)="showNumber = true"
                    [ngModel]="bacaro.affollamento"
                    name="affollamento"
                    required
                    id="affollamento"
                  />
                </mat-slider>
                <p
                  class="self-start place-self-end font-bold font-sans text-2xl text-teal-600"
                >
                  affollamento: {{ bacaro.affollamento }}
                </p>
              </div>
            </div>
            <div class="self-center">
              <input
                name="link"
                id="link"
                type="file"
                class="hidden"
                (change)="onFileSelected($event)"
                #fileUpload
              />

              <div
                class="self-center w-full border-8 border-dashed h-52 border-red-300"
              >
                <img
                  *ngIf="bacaro.link"
                  class="row-span-2 col-span-2 object-cover w-full h-full rounded-md"
                  [src]="bacaro.link ? (bacaro.link | assetPath) : ''"
                  alt="{{ bacaroStore.link$ | async }}"
                />
              </div>
              <div *ngIf="modify$ | async" class="flex justify-center">
                <button
                  mat-mini-fab
                  color="primary"
                  class="button text-white rounded-xl bg-red-300 h-8 m-4 w-28 justify-self-center"
                  (click)="fileUpload.click(); $event.preventDefault()"
                >
                  upload image
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          class="fixed inset-x-0 bottom-0 flex justify-center space-x-4 p-4 bg-gray-200"
        >
          <button
            *ngIf="modify$ | async"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
            [disabled]="!editForm.valid"
          >
            ADD
          </button>
          <button
            *ngIf="!(modify$ | async)"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            (click)="clickInEdit()"
          >
            EDIT
          </button>
          <button
            *ngIf="!(modify$ | async)"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            (click)="deleteSingle()"
          >
            DELETE
          </button>
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            (click)="back()"
          >
            BACK
          </button>
        </div>
      </form>
    </div>
  `,
})
export class BacaroEditComponent implements OnInit {
  showNumber = true;
  modify = false;
  bacaro: Bacaro = {};
  modify$ = new BehaviorSubject<boolean>(false);
  constructor(
    public bacaroStore: BacaroStore,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      if (id === '-1') {
        this.bacaroStore.reset();
        this.modify$.next(true);
      } else {
        this.bacaroStore.getSingle(id);
        this.modify$.next(false);
      }
    }
    console.log(this.modify$);
    this.bacaroStore.state$.subscribe((bacaro) => (this.bacaro = bacaro));
  }
  /**
   * Set the value of the location
   * @param value
   */
  setServizio(value: any) {
    this.bacaro.servizio = value;
  }

  setCicchetto(value: any) {
    this.bacaro.cicchetto = value;
  }

  setLocation(value: any) {
    this.bacaro.location = value;
  }

  setAffollamento(value: any) {
    this.bacaro.affollamento = value;
  }

  onSubmit(form: any) {
    const bacarofilelink: string | undefined = this.bacaro.link;
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      if (id === '-1') {
        const bacaro: Bacaro = {
          ...form.value,
          costoSpritz: this.bacaro.costoSpritz ? this.bacaro.costoSpritz : 0,
          link: bacarofilelink,
        };
        console.log(bacaro);
        this.bacaroStore.addBacaro(bacaro);
      } else {
        const bacaro: Bacaro = {
          ...form.value,
          id: id,
          costoSpritz: this.bacaro.costoSpritz ? this.bacaro.costoSpritz : 0,
          link: bacarofilelink,
        };
        console.log(bacaro);
        this.bacaroStore.modifyBacaro(bacaro);
      }
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.bacaroStore.uploadFile(file);
    }
  }

  back() {
    this.router.navigate(['/bacari_list']);
  }

  clickInEdit() {
    this.modify$.next(true);
  }

  deleteSingle() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.bacaroStore.deleteSingle(id);
    }
  }
}
