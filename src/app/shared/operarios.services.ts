import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Operario } from "./../shared/models";
import { BdService } from "./../shared/bd.services";
import { Observable } from "rxjs";

@Injectable()
export class OperariosService {
    BASE_URL: string;

    constructor(private http: HttpClient, private bdService: BdService) {
        this.BASE_URL = this.bdService.dir_bd_ + "operarios/";
    }

    getOperarios(): Observable<Operario[]> {
        return this.http.get<Operario[]>(this.BASE_URL);
    }

    getOperariosActCond(): Observable<Operario[]> {
        return this.http.get<Operario[]>(this.BASE_URL + "activos/conductores");
    }

    getOperario(id: string | number) : Observable<Operario> {
        return this.http.get<Operario>(this.BASE_URL + id);
    }

    addOperario(operario: Operario): Observable<Operario> {
        return this.http.post<Operario>(this.BASE_URL, operario);
    }

    removeOperario(id: number | string): Observable<any> {
        return this.http.delete(this.BASE_URL + id);
    }

    updateOperario(id: string | number, operario: Operario): Observable<Operario> {
        return this.http.put<Operario>(this.BASE_URL + id, operario);
    }

    getOperariosActivos(): Observable<Operario[]> {
        return this.http.get<Operario[]>(this.BASE_URL + "estado/activo");
    }

    getOperariosHorario(): Observable<Operario[]> {
        return this.http.get<Operario[]>(this.BASE_URL + "estado/horario");
    }
}
