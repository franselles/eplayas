import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BdService } from './../shared/bd.services';
import { Total } from './../shared/models';
import { Observable } from 'rxjs';

@Injectable()

export class AnalisisService {

  BASE_URL: string;

  constructor(private http: HttpClient, private bdService: BdService) {
    this.BASE_URL = this.bdService.dir_bd_ + 'analisis/';
  }

  getPesosMunicipio(fechad: string, fechah: string, municipio: string): Observable<Total[]> {
    return this.http.get<Total[]>(this.BASE_URL + 'pesos/' + fechad + '/' + fechah + '/' + municipio);
  }

  getPesosPlaya(fechad: string, fechah: string, lugar: string, municipio: string): Observable<Total[]> {
    return this.http.get<Total[]>(this.BASE_URL + 'pesos/playas/' + fechad + '/' + fechah + '/' + lugar + '/' + municipio);
  }

  getEstadisticasMunicipio(fechad: string, fechah: string, municipio: string): Observable<Total[]> {
    return this.http.get<Total[]>(this.BASE_URL + 'estadisticas/' + fechad + '/' + fechah + '/' + municipio);
  }

  getEstadisticasPlaya(fechad: string, fechah: string, lugar: string, municipio: string): Observable<Total[]> {
    return this.http.get<Total[]>(this.BASE_URL + 'estadisticas/playas/' + fechad + '/' + fechah + '/' + lugar + '/' + municipio);
  }
}
