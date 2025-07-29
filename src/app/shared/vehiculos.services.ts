import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BdService } from './../shared/bd.services';
import { ItvAlert, Vehiculo } from './models';
import { Observable } from 'rxjs';


@Injectable()

export class VehiculosService {

  BASE_URL: string;

  constructor(private http: HttpClient, private bdService: BdService) {
    this.BASE_URL = this.bdService.dir_bd_ + 'vehiculos/';
  }

  getVehiculos() : Observable<Vehiculo[]>{
    return this.http.get<Vehiculo[]>(this.BASE_URL);
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
  updateKm(vehiculos: Vehiculo[]): Observable<Vehiculo[]> {
    return this.http.put<Vehiculo[]>(this.BASE_URL + 'km', vehiculos);
  }

  //api/vehiculos/cita-itv
  getItvAlert(): Observable<ItvAlert[]> {
    return this.http.get<ItvAlert[]>(this.BASE_URL + 'cita-itv');
  }

}
