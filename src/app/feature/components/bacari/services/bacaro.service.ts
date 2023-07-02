import { Injectable } from '@angular/core';
import { BacaroStore } from './bacaro.store';
import { HttpClient } from '@angular/common/http';
import { Bacaro } from '../model/bacaro';

@Injectable({
  providedIn: 'root',
})
export class BacaroService {
  constructor(private http: HttpClient) {}
  getBacari() {
    console.log('faccio la get');
    return this.http.get<Bacaro[]>(
      'http://bacarotour.altervista.org/backend/bacariRead.php'
    );
  }
  addBacaro(bacaro: Bacaro) {
    return this.http.post(
      'http://bacarotour.altervista.org/backend/bacaroCreate.php',
      bacaro
    );
  }

  getSingle(id: string) {
    return this.http.get<Bacaro>(
      'http://bacarotour.altervista.org/backend/bacaroRead.php?id=' + id
    );
  }

  uploadFile(formData: FormData) {
    return this.http.post(
      'http://bacarotour.altervista.org/backend/imageUpload.php',
      formData
    );
  }

  modifyBacaro(bacaro: Bacaro) {
    return this.http.patch<Bacaro>(
      'http://bacarotour.altervista.org/backend/bacaroUpdate.php',
      bacaro
    );
  }

  deleteSingle(id: string) {
    return this.http.delete<any>(
      'http://bacarotour.altervista.org/backend/bacaroDelete.php?id=' + id
    );
  }
}
