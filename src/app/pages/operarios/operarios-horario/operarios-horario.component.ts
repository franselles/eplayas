import { Component, OnInit } from "@angular/core";
import { OperariosService } from "../../../shared/operarios.services";
import { Operario } from "../../../shared/models";

@Component({
    selector: "app-operarios-horario",
    templateUrl: "./operarios-horario.component.html",
    styleUrls: ["./operarios-horario.component.css"],
})
export class OperariosHorarioComponent implements OnInit {
    fecha: string;

    fechaLabel: string = "";

    operarios: Operario[] = [];

    meses = [
        "ENERO",
        "FEBRERO",
        "MARZO",
        "ABRIL",
        "MAYO",
        "JUNIO",
        "JULIO",
        "AGOSTO",
        "SEPTIEMBRE",
        "OCTUBRE",
        "NOVIEMBRE",
        "DICIEMBRE",
    ];

    fechas: string[] = [];

    constructor(public operariosService: OperariosService) {}

    ngOnInit(): void {
        this.operariosService.getOperariosHorario().subscribe(
            (data: Operario[]) => {
                this.operarios = data;
            },
            (err) => console.log(err)
        );
    }

    lastDay(m: number, y: number): number {
        return new Date(y, m + 1, 0).getDate();
    }

    setDates() {
        this.fechas = [];
        const dia = this.fecha.slice(-2);
        const mes = this.fecha.slice(5, 7);
        const ano = this.fecha.slice(0, 4);

        this.fechaLabel = this.meses[Number(mes) - 1] + "-" + ano;

        const last = this.lastDay(Number(mes), Number(ano));
        for (let d = Number(dia); d <= last; d++) {
            let fecha = d.toLocaleString() + "-" + mes + "-" + ano;
            this.fechas.push(fecha);
        }
    }
}
