import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { Operario } from './../shared/models';
import { BdService } from './../shared/bd.services';

@Injectable()

export class OperariosService {

  BASE_URL: string;

  constructor(private http: Http, private bdService: BdService) {
    this.BASE_URL = this.bdService.dir_bd_ + 'operarios/';
  }

  getOperarios() {
    return this.http.get(this.BASE_URL)
      .map(response => response.json())
      .catch(error => this.handleError(error));
  }

  getOperario(id: string | number) {
    return this.http.get(this.BASE_URL + id)
      .map(response => response.json())
      .catch(error => this.handleError(error));
  }

  addOperario(operario: Operario) {
    return this.http.post(this.BASE_URL, operario)
      .map(response => response.json())
      .catch(error => this.handleError(error));
  }

  removeOperario(id: number | string) {
    return this.http.delete(this.BASE_URL + id)
      .map(response => response.json())
      .catch(error => this.handleError(error));
  }

  updateOperario(id: string | number, operario: Operario) {
    return this.http.put(this.BASE_URL + id, operario)
      .map(response => response.json())
      .catch(error => this.handleError(error));
  }

  private handleError(error: any) {
    console.error(error);
    return Observable.throw('Server error (' + error.status + '): ' + error.text())
  }
}
