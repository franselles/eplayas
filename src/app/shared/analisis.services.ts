import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { BdService } from './../shared/bd.services';

@Injectable()

export class AnalisisService {

  BASE_URL: string;

  constructor(private http: Http, private bdService: BdService) {
    this.BASE_URL = this.bdService.dir_bd_ + 'analisis/';
  }

  getPesosMunicipio(fechad: string, fechah: string, municipio: string) {
    return this.http.get(this.BASE_URL + 'pesos/' + fechad + '/' + fechah + '/' + municipio)
      .map(response => response.json())
      .catch(error => this.handleError(error));
  }

  getPesosPlaya(fechad: string, fechah: string, lugar: string, municipio: string) {
    return this.http.get(this.BASE_URL + 'pesos/' + fechad + '/' + fechah + '/' + lugar + '/' + municipio)
      .map(response => response.json())
      .catch(error => this.handleError(error));
  }

  getEstadisticasMunicipio(fechad: string, fechah: string, municipio: string) {
    return this.http.get(this.BASE_URL + 'estadisticas/' + fechad + '/' + fechah + '/' + municipio)
      .map(response => response.json())
      .catch(error => this.handleError(error));
  }

  getEstadisticasPlaya(fechad: string, fechah: string, lugar: string, municipio: string) {
    return this.http.get(this.BASE_URL + 'estadisticas/' + fechad + '/' + fechah + '/' + lugar + '/' + municipio)
      .map(response => response.json())
      .catch(error => this.handleError(error));
  }

  private handleError(error: any) {
    console.error(error);
    return Observable.throw('Server error (' + error.status + '): ' + error.text());
  }
}
