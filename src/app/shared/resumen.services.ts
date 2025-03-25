import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { BdService } from "./../shared/bd.services";

@Injectable()
export class ResumenService {
    BASE_URL: string;

    constructor(private http: HttpClient, private bdService: BdService) {
        this.BASE_URL = this.bdService.dir_bd_ + "resumen/";
    }

    getResPlayas(dia: string, turno: string, municipio: string) {
        return this.http.get(
            this.BASE_URL + "diario/" + dia + "/" + turno + "/" + municipio
        );
    }

    getResPlaya(dia: string, municipio: string) {
        return this.http.get(this.BASE_URL + "dia/" + dia + "/" + municipio);
    }

    getResbas(dia: string, municipio: string) {
        return this.http.get(
            this.BASE_URL + "dia/basura/total/" + dia + "/" + municipio
        );
    }

    // getMesPlaya(year: string, month: string, turno: string, lugar: string, municipio: string) {
    getMesPlaya(year: string, month: string, lugar: string, municipio: string) {
        /*         return this.http.get(
            this.BASE_URL +
                "mes/" +
                year +
                "/" +
                month +
                "/" +
                turno +
                "/" +
                lugar +
                "/" +
                municipio
        ); */
        return this.http.get(
            this.BASE_URL +
                "mes/" +
                year +
                "/" +
                month +
                "/" +
                lugar +
                "/" +
                municipio
        );
    }

    getConstantes(seccion: string) {
        return this.http.get(this.bdService.dir_bd_ + "constantes/" + seccion);
    }
}
