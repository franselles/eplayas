import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { BdService } from "./../shared/bd.services";
import { Observable } from "rxjs";

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

    getResPlaya(dia: string, municipio: string): Observable<any> {
        return this.http.get<any>(this.BASE_URL + "dia/" + dia + "/" + municipio);
    }

    getResbas(dia: string, municipio: string): Observable<any> {
        return this.http.get<any>(
            this.BASE_URL + "dia/basura/total/" + dia + "/" + municipio
        );
    }

    // getMesPlaya(year: string, month: string, turno: string, lugar: string, municipio: string) {
    getMesPlaya(year: string, month: string, lugar: string, municipio: string): Observable<any> {
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
        return this.http.get<any>(
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

    getConstantes(seccion: string): Observable<any> {
        return this.http.get<any>(this.bdService.dir_bd_ + "constantes/" + seccion);
    }
}
