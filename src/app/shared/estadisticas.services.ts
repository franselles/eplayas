import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Estadistica } from './../shared/models';
import { BdService } from './../shared/bd.services';

@Injectable()

export class EstadisticasService {

  BASE_URL: string;

  constructor(private http: HttpClient, private bdService: BdService) {
    this.BASE_URL = this.bdService.dir_bd_ + 'estadisticas/';
  }

  getEstadisticas() {
    return this.http.get(this.BASE_URL);
  }

  getEstadistica(id: string | number) {
    return this.http.get(this.BASE_URL + id);
  }

  addEstadistica(estadistica: Estadistica) {
    return this.http.post(this.BASE_URL, estadistica);
  }

  removeEstadistica(id: number | string) {
    return this.http.delete(this.BASE_URL + id);
  }

  updateEstadistica(id: string | number, estadistica: Estadistica) {
    return this.http.put(this.BASE_URL + id, estadistica);
  }
}
