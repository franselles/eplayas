import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Hamaca } from './../shared/models';
import { BdService } from './../shared/bd.services';

@Injectable()
export class HamacasService {

  BASE_URL: string;

  constructor(private http: HttpClient, private bdService: BdService) {
    this.BASE_URL = this.bdService.dir_bd_ + 'hamacas/';
  }

  getHamacasUltimos() {
    return this.http.get(this.BASE_URL + 'lista/ultimos');
  }

  getHamaca(id: string | number) {
    return this.http.get(this.BASE_URL + 'edita/' + id);
  }

  addHamaca(hamaca: Hamaca) {
    return this.http.post(this.BASE_URL, hamaca);
  }

  removeHamaca(id: number | string) {
    return this.http.delete(this.BASE_URL + id);
  }

  updateHamaca(id: string | number, hamaca: Hamaca) {
    return this.http.put(this.BASE_URL + id, hamaca);
  }

}
