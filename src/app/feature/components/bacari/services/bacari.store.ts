import { Injectable } from '@angular/core';
import { Bacaro } from '../model/bacaro';
import { BehaviorSubject, distinctUntilChanged, map } from 'rxjs';
import { BacaroService } from './bacaro.service';

@Injectable({
  providedIn: 'root',
})
export class BacariStore {
  state: Bacaro[] = [];

  private _state = new BehaviorSubject<Bacaro[]>(this.state);

  state$ = this._state.asObservable();

  constructor(private bacaroService: BacaroService) {}

  set(bacari: Bacaro[]) {
    this._state.next((this.state = bacari));
  }

  getAll() {
    this.bacaroService.getBacari().subscribe((x) => {
      const bacari: Bacaro[] = x;
      this.set(bacari);
    });
  }
}
