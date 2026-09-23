import { Injectable } from '@angular/core';

@Injectable()
export class GlobalsPartes {

    public fecha: string;
    public mes: string;
    public ano: number;
    public dia: string;

    constructor() {
        const date = new Date();
        this.dia = (date.getDate() < 10 ? '0' : '') + date.getDate();
        this.mes = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1);
        this.ano = date.getFullYear();
        this.fecha = this.ano + '-' + this.mes + '-' + this.dia;
    }

    setGlobals(mes: string, ano: number) {
        this.mes = mes;
        this.ano = ano;
    }

    setFecha(fecha: string) {
        this.fecha = fecha;
    }
}
