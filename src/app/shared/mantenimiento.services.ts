import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Mantenimiento } from './../shared/models';
import { BdService } from './../shared/bd.services';

@Injectable()

export class MantenimientoService {

  BASE_URL: string;

  constructor(private http: HttpClient, private bdService: BdService) {
    this.BASE_URL = this.bdService.dir_bd_ + 'mantenimiento/';
  }

  getMantenimientoTodo() {
    return this.http.get(this.BASE_URL);
  }

  getMantenimientoLim(mes: string, ano: number) {
    return this.http.get(this.BASE_URL + 'limit/' + mes + '/' + ano);
  }

  getMantenimientoDia(dia: string) {
    return this.http.get(this.BASE_URL + 'fecha/' + dia);
  }

  getMantenimiento(id: number | string) {
    return this.http.get(this.BASE_URL + id);
  }

  addMantenimiento(mantenimiento: Mantenimiento) {
    return this.http.post(this.BASE_URL, mantenimiento);
  }

  removeMantenimiento(id: number | string, parte: Mantenimiento) {
    return this.http.delete(this.BASE_URL + id);
  }

  updateMantenimiento(id: number | string, mantenimiento: Mantenimiento) {
    return this.http.put(this.BASE_URL + id, mantenimiento);
  }
}
