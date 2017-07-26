import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { Estadistica } from './../shared/models';
import { BdService } from './../shared/bd.services';

@Injectable()

export class EstadisticasService {

  BASE_URL: string;

  constructor(private http: Http, private bdService: BdService) {
    this.BASE_URL = this.bdService.dir_bd_ + 'estadisticas/';
  }

  getEstadisticas() {
    return this.http.get(this.BASE_URL)
      .map(response => response.json())
      .catch(error => this.handleError(error));
  }

  getEstadistica(id: string | number) {
    return this.http.get(this.BASE_URL + id)
      .map(response => response.json())
      .catch(error => this.handleError(error));
  }

  addEstadistica(estadistica: Estadistica) {
    return this.http.post(this.BASE_URL, estadistica)
      .map(response => response.json())
      .catch(error => this.handleError(error));
  }

  removeOperario(id: number | string, estadistica: Estadistica) {
    return this.http.delete(this.BASE_URL + id)
      .map(response => response.json())
      .catch(error => this.handleError(error));
  }

  updateEstadistica(id: string | number, estadistica: Estadistica) {
    return this.http.put(this.BASE_URL + id, estadistica)
      .map(response => response.json())
      .catch(error => this.handleError(error));
  }

  private handleError(error: any) {
    console.error(error);
    return Observable.throw('Server error (' + error.status + '): ' + error.text())
  }
}
