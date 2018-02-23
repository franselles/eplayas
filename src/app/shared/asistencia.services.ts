import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Operario, Asistencia, TotalAsistencia } from './../shared/models';

import { BdService } from './../shared/bd.services';

@Injectable()

export class AsistenciaService {

    BASE_URL_A: string;
    BASE_URL_O: string;

    public asistencias: Asistencia[] = [];
    public asUltimos: Asistencia[] = [];

    constructor(private http: HttpClient, private bdService: BdService) {
      this.BASE_URL_A = this.bdService.dir_bd_ + 'asistencia/';
      this.BASE_URL_O = this.bdService.dir_bd_ + 'operarios/';
    }

    getAsistencia(fecha: string, id_op: string) {
      return this.http.get<Asistencia>(this.BASE_URL_A + fecha + '/' + id_op);
    }

    getAsistenciaSegimiento(fechai: string, fechaf: string, id_op: string) {
      return this.http.get<Asistencia[]>(this.BASE_URL_A + 'seguimiento/' + fechai + '/' + fechaf + '/' + id_op);
    }

    getAsistenciaSegAcumulado(fechai: string, fechaf: string, id_op: string) {
      return this.http.get<TotalAsistencia>(this.BASE_URL_A + 'acumulado/' + fechai + '/' + fechaf + '/' + id_op);
    }

    getAsistenciasDia(fecha: string) {
      return this.http.get(this.BASE_URL_A + 'lista/dia/' + fecha);
    }

    getOperarios() {
      return this.http.get(this.BASE_URL_O);
    }

    getAsistenciaUltimos(fecha: string) {
      return this.http.get(this.BASE_URL_A + 'ultimos/' + fecha);
    }

    getOperario(id: string | number) {
      return this.http.get(this.BASE_URL_O + id);
    }

    addAsistencia(asistencia: Asistencia) {
      return this.http.post(this.BASE_URL_A, asistencia);
    }

    removeAsistencia(id: number | string, asistencia: Asistencia) {
      return this.http.delete(this.BASE_URL_A + id);
    }

    updateAsistencia(id: number | string, asistencia: Asistencia) {
      return this.http.put(this.BASE_URL_A + id, asistencia);
    }

    listaAsistenciasDia(fecha: string) {
      this.getAsistenciasDia(fecha).subscribe(
        (data: Asistencia[]) => {
          this.asistencias = data;
        },
        err => console.log(err)
      );
    }

    listaAsistenciasUltimas(fecha: string) {
      this.getAsistenciaUltimos(fecha).subscribe(
        (data: Asistencia[]) => {
          this.asUltimos = data;
        },
        err => console.log(err)
      );
    }
}
