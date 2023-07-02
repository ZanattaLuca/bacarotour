import { Injectable } from '@angular/core';
import { Bacaro } from '../model/bacaro';
import { BehaviorSubject, distinctUntilChanged, map } from 'rxjs';
import { BacaroService } from './bacaro.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class BacaroStore {
  state: Bacaro = {
    id: undefined,
    nome: '',
    affollamento: undefined,
    costoSpritz: undefined,
    votoCostoSpritz: undefined,
    location: undefined,
    servizio: undefined,
    cicchetto: undefined,
    mediaTotale: undefined,
    link: '',
  };
  /** Store retrieved router command */
  _state = new BehaviorSubject<Bacaro>(this.state);

  /** Observable of the state */
  state$ = this._state.asObservable();

  /**Observable of the name */
  nome$ = this._state.pipe(
    map((x) => x.nome),
    distinctUntilChanged()
  );

  /**Observable of the name */
  link$ = this._state.pipe(
    map((x) => x.link),
    distinctUntilChanged()
  );

  set(bacaro: Bacaro) {
    this._state.next((this.state = bacaro));
  }
  constructor(private bacaroService: BacaroService, private router: Router) {}

  addBacaro(bacaro: Bacaro) {
    this.bacaroService.addBacaro(bacaro).subscribe(() => this.goBack());
  }

  getSingle(id: string) {
    this.bacaroService.getSingle(id).subscribe((bacaro) => {
      this.set(bacaro);
    });
  }

  goBack() {
    this.router.navigate(['/bacari_list']);
  }

  uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file, file.name);
    this.bacaroService.uploadFile(formData).subscribe((link: any) => {
      this.set({
        ...this.state,
        link: link.message,
      });
    });
  }

  reset() {
    this.set({
      ...this.state,
      id: undefined,
      nome: '',
      affollamento: undefined,
      costoSpritz: undefined,
      votoCostoSpritz: undefined,
      location: undefined,
      servizio: undefined,
      cicchetto: undefined,
      mediaTotale: undefined,
      link: '',
    });
  }

  modifyBacaro(bacaro: Bacaro) {
    this.bacaroService.modifyBacaro(bacaro).subscribe(() => this.goBack());
  }

  deleteSingle(id: string) {
    this.bacaroService.deleteSingle(id).subscribe(() => {
      this.goBack();
    });
  }
}
