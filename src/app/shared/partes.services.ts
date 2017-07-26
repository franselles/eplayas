import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { Parte } from './../shared/models';
import { BdService } from './../shared/bd.services';

@Injectable()

export class PartesService {

  BASE_URL: string;

  constructor(private http: Http, private bdService: BdService) {
    this.BASE_URL = this.bdService.dir_bd_ + 'partes/';
  }

  getPartes() {
    return this.http.get(this.BASE_URL)
      .map(response => response.json())
      .catch(error => this.handleError(error));
  }

  getPartesLim(mes: string, ano: number) {
    return this.http.get(this.BASE_URL + 'limit/' + mes + '/' + ano)
      .map(response => response.json())
      .catch(error => this.handleError(error));
  }

  getPartesDia(dia: string) {
    return this.http.get(this.BASE_URL + 'fecha/' + dia)
      .map(response => response.json())
      .catch(error => this.handleError(error));
  }

  getParte(id: number | string) {
    return this.http.get(this.BASE_URL + id)
      .map(response => response.json())
      .catch(error => this.handleError(error));
  }

  addParte(parte: Parte) {
    return this.http.post(this.BASE_URL, parte)
      .map(response => response.json())
      .catch(error => this.handleError(error));
  }

  removeParte(id: number | string, parte: Parte) {
    return this.http.delete(this.BASE_URL + id)
      .map(response => response.json())
      .catch(error => this.handleError(error));
  }

  updateParte(id: number | string, parte: Parte) {
    return this.http.put(this.BASE_URL + id, parte)
      .map(response => response.json())
      .catch(error => this.handleError(error));
  }

  private handleError(error: any) {
    console.error(error);
    return Observable.throw('Server error (' + error.status + '): ' + error.text())
  }
}
