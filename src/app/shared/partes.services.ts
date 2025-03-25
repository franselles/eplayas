import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Parte } from "./../shared/models";
import { BdService } from "./../shared/bd.services";

@Injectable()
export class PartesService {
    BASE_URL: string;

    constructor(private http: HttpClient, private bdService: BdService) {
        this.BASE_URL = this.bdService.dir_bd_ + "partes/";
    }

    getPartes() {
        return this.http.get(this.BASE_URL);
    }

    getPartesLim(mes: string, ano: number) {
        return this.http.get(this.BASE_URL + "limit/" + mes + "/" + ano);
    }

    getPartesDia(dia: string) {
        return this.http.get(this.BASE_URL + "fecha/" + dia);
    }

    getParte(id: number | string) {
        return this.http.get(this.BASE_URL + id);
    }

    addParte(parte: Parte) {
        return this.http.post(this.BASE_URL, parte);
    }

    removeParte(id: number | string, parte: Parte) {
        return this.http.delete(this.BASE_URL + id);
    }

    updateParte(id: number | string, parte: Parte) {
        return this.http.put(this.BASE_URL + id, parte);
    }

    addPartes(partes: Parte[]) {
        return this.http.post(this.BASE_URL + "duplica", partes);
    }
}
