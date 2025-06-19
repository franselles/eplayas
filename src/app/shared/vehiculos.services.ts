import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BdService } from './../shared/bd.services';
import { Vehiculo } from './models';


@Injectable()

export class VehiculosService {

  BASE_URL: string;

  constructor(private http: HttpClient, private bdService: BdService) {
    this.BASE_URL = this.bdService.dir_bd_ + 'vehiculos/';
  }

  getVehiculos() {
    return this.http.get(this.BASE_URL);
  }

  /*
  getOperario(id: string | number) {
    return this.http.get(this.BASE_URL + id);
  }

  addOperario(operario: Operario) {
    return this.http.post(this.BASE_URL, operario);
  }

  removeOperario(id: number | string) {
    return this.http.delete(this.BASE_URL + id);
  }
  */
  updateKm(vehiculos: Vehiculo[]) {
    return this.http.put(this.BASE_URL + 'km', vehiculos);
  }

}
