import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Operario } from './../shared/models';
import { BdService } from './../shared/bd.services';

@Injectable()

export class OperariosService {

  BASE_URL: string;

  constructor(private http: HttpClient, private bdService: BdService) {
    this.BASE_URL = this.bdService.dir_bd_ + 'operarios/';
  }

  getOperarios() {
    return this.http.get(this.BASE_URL);
  }

  getOperario(id: string | number) {
    return this.http.get(this.BASE_URL + id);
  }

  addOperario(operario: Operario) {
    return this.http.post(this.BASE_URL, operario);
  }

  removeOperario(id: number | string) {
    return this.http.delete(this.BASE_URL + id);
  }

  updateOperario(id: string | number, operario: Operario) {
    return this.http.put(this.BASE_URL + id, operario);
  }
}
