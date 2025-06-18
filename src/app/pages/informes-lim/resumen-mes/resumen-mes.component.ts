import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";

// import { Parte } from './../../../shared/models';
import { ResumenService } from "./../../../shared/resumen.services";
import { NgFor, UpperCasePipe, DatePipe } from "@angular/common";

@Component({
    selector: "app-resumen-mes",
    templateUrl: "./resumen-mes.component.html",
    styleUrls: ["./resumen-mes.component.css"],
    imports: [NgFor, UpperCasePipe, DatePipe]
})
export class ResumenMesComponent implements OnInit {
    public resumen: any[];

    private fecha: string;
    public month: string;
    public year: string;
    public turno: string;
    public lugar: string;
    public municipio: string;

    constructor(
        private resumenService: ResumenService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.route.params.subscribe((params) => {
            let strFecha: any;

            this.fecha = params["fecha"];

            strFecha = this.fecha.split("-");

            this.year = strFecha[0];
            this.month = strFecha[1];

            this.turno = params["turno"];
            this.lugar = params["lugar"];
            this.municipio = params["municipio"];

            this.abreMes(
                this.year,
                this.month,
                this.turno,
                this.lugar,
                this.municipio
            );
        });
    }

    abreMes(
        year: string,
        month: string,
        turno: string,
        lugar: string,
        municipio: string
    ) {
        // this.resumenService.getMesPlaya(year, month, turno, lugar, municipio)
        this.resumenService
            .getMesPlaya(year, month, lugar, municipio)
            .subscribe(
                (data: any[]) => {
                    this.resumen = data;
                },
                (err) => console.log(err)
            );
    }
}
