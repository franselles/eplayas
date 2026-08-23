import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Hamaca } from './../shared/models';
import { BdService } from './../shared/bd.services';

@Injectable()
export class HamacasService {

  BASE_URL: string;

  constructor(private http: HttpClient, private bdService: BdService) {
    this.BASE_URL = this.bdService.dir_bd_ + 'hamacas/';
  }

  getHamacasUltimos():  Observable<Hamaca[]> {
    return this.http.get<Hamaca[]>(this.BASE_URL + 'lista/ultimos');
  }

  getHamacasHistorico(fecha1: string, fecha2: string, sector: number): Observable<Hamaca[]> {
    return this.http.get<Hamaca[]>(this.BASE_URL + 'lista/historico/' + fecha1 + '/' + fecha2 + '/' + sector);
  }

  getHamacasHistoricoRotas(fecha1: string, fecha2: string, sector: number): Observable<Hamaca[]> {
    return this.http.get<Hamaca[]>(this.BASE_URL + 'rotas/total/fecha/' + fecha1 + '/' + fecha2 + '/' + sector);
  }

  getHamaca(id: string | number): Observable<Hamaca> {
    return this.http.get<Hamaca>(this.BASE_URL + 'edita/' + id);
  }

  addHamaca(hamaca: Hamaca): Observable<Hamaca> {
    return this.http.post<Hamaca>(this.BASE_URL, hamaca);
  }

  removeHamaca(id: number | string): Observable<any> {
    return this.http.delete(this.BASE_URL + id);
  }

  updateHamaca(id: string | number, hamaca: Hamaca): Observable<Hamaca> {
    return this.http.put<Hamaca>(this.BASE_URL + id, hamaca);
  }

}
