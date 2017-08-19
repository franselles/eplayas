import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { BdService } from './../shared/bd.services';

@Injectable()

export class ResumenService {

  BASE_URL: string;

  constructor(private http: Http, private bdService: BdService) {
    this.BASE_URL = this.bdService.dir_bd_ + 'resumen/';
  }

  getResPlayas(dia: string, turno: string, municipio: string) {
    return this.http.get(this.BASE_URL + 'diario/' + dia + '/' + turno + '/' + municipio)
      .map(response => response.json())
      .catch(error => this.handleError(error));
  }

  getResPlaya(dia: string, turno: string, playa: string) {
    return this.http.get(this.BASE_URL + 'dia/' + dia + '/' + turno + '/' + playa)
      .map(response => response.json())
      .catch(error => this.handleError(error));
  }

  getResPlaya2(dia: string, municipio: string) {
    return this.http.get(this.BASE_URL + 'dia2/' + dia + '/' + municipio)
      .map(response => response.json())
      .catch(error => this.handleError(error));
  }

  getResbas(dia: string, turno: string, municipio: string) {
    return this.http.get(this.BASE_URL + 'dia/basura/total/' + dia + '/' + turno + '/' + municipio)
      .map(response => response.json())
      .catch(error => this.handleError(error));
  }

  getResbas2(dia: string, municipio: string) {
    return this.http.get(this.BASE_URL + 'dia2/basura/total/' + dia + '/' + municipio)
      .map(response => response.json())
      .catch(error => this.handleError(error));
  }

  getMesPlaya(year: string, month: string, turno: string, lugar: string, municipio: string) {
  return this.http.get(this.BASE_URL + 'mes/' + year + '/' + month + '/' + turno + '/' +  lugar + '/' + municipio)
    .map(response => response.json())
    .catch(error => this.handleError(error));
  }

  private handleError(error: any) {
    console.error(error);
    return Observable.throw('Server error (' + error.status + '): ' + error.text());
  }
}
