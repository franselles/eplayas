import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";

import { Parte } from "./../../../shared/models";
import { PartesService } from "./../../../shared/partes.services";
import { GlobalsPartes } from "./../../../shared/globalspartes.services";

@Component({
    selector: "app-partes-lim-lista",
    templateUrl: "./partes-lim-lista.component.html",
    styleUrls: ["./partes-lim-lista.component.css"],
    standalone: false
})
export class PartesLimListaComponent implements OnInit {
    public listaPartes: Parte[] = [];
    public fecha: string;
    public clonFecha: string;
    public clonado: boolean = false;

    constructor(
        private partesService: PartesService,
        private globalPartes: GlobalsPartes,
        private router: Router
    ) {}

    ngOnInit() {
        this.fecha = this.globalPartes.fecha;
        this.actualizaLista();
        this.clonFecha = this.fecha;

        /*
        const date = new Date();
        let dia = (date.getDate() < 10 ? "0" : "") + (date.getDate() + 1);
        let mes = (date.getMonth() + 1 < 10 ? "0" : "") + (date.getMonth() + 1);
        let ano = date.getFullYear();
        this.clonFecha = ano + "-" + mes + "-" + dia;
        */
    }

    nuevoParte() {
        this.router.navigate(["dash/limpieza/detalle"]);
    }

    clonarParte(parte: Parte) {
        let clonParte: Parte = { ...parte };
        delete clonParte._id;
        clonParte.fecha = this.clonFecha;
        this.partesService.addParte(clonParte).subscribe(
            () => {
                this.clonado = true;
                setTimeout(() => {
                    this.clonado = false;
                    this.actualizaLista();
                }, 3000);
            },
            (error) => console.error("Error creating : " + error)
        );
    }

    clonarPartes() {
        let clonListaPartes = [...this.listaPartes];

        clonListaPartes.forEach((item) => {
            item.fecha = this.clonFecha;
            delete item._id;
        });

        this.partesService.addPartes(clonListaPartes).subscribe(
            () => {
                this.clonado = true;
                setTimeout(() => {
                    this.clonado = false;
                }, 3000);
            },
            (error) => console.error("Error creating : " + error)
        );
    }

    actualizaLista() {
        this.globalPartes.setFecha(this.fecha);
        this.partesService.getPartesDia(this.fecha).subscribe(
            (partes: Parte[]) => (this.listaPartes = partes),
            (err) => console.log(err)
        );

        this.globalPartes.setFecha(this.fecha);
    }
}
