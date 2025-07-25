import { Component, OnInit } from "@angular/core";
import { AsistenciaService } from "../../../shared/asistencia.services";
import { ActivatedRoute, Router } from "@angular/router";
import { Operario, Asistencia } from "../../../shared/models";
import { GlobalsPartes } from "./../../../shared/globalspartes.services";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { NgFor, NgIf, DatePipe } from "@angular/common";
import { InDetalleAsComponent } from "./in-detalle-as.component";

@Component({
    selector: "app-entrada-as",
    templateUrl: "./entrada-as.component.html",
    styleUrls: ["./entrada-as.component.css"],
    imports: [ReactiveFormsModule, FormsModule, NgFor, NgIf, InDetalleAsComponent, DatePipe]
})
export class EntradaAsComponent implements OnInit {
    public operarios: Operario[] = [];
    public fecha: string;
    private asistencia: Asistencia;
    public asDeldia: Asistencia;
    public asUltimo: any;
    public ventana = -1;
    public tipoVentana = "n";

    constructor(
        public asistenciaService: AsistenciaService,
        private globalPartes: GlobalsPartes,
        private router: Router
    ) {}

    ngOnInit() {
        this.fecha = this.globalPartes.fecha;

        this.asistenciaService.listaAsistenciasDia(this.fecha);
        this.asistenciaService.listaAsistenciasUltimas(this.fecha);

        this.asistenciaService.getOperarios().subscribe(
            (data: Operario[]) => {
                this.operarios = data;
            },
            (err) => console.log(err)
        );
    }

    actualizaLista() {
        this.asistenciaService.listaAsistenciasDia(this.fecha);
        this.asistenciaService.listaAsistenciasUltimas(this.fecha);
    }

    yaExiste(id_op: string) {
        this.asDeldia = this.asistenciaService.asistencias.find(
            (x) => x.id_op === id_op
        );

        if (this.asDeldia) {
            return this.asDeldia;
        }
    }

    elUltimo(id_op: string) {
        this.asUltimo = this.asistenciaService.asUltimos.find(
            (x) => x._id === id_op
        );
        if (this.asUltimo) {
            return this.asUltimo;
        }
    }

    insertaRapido(id_op: string, nombre: string, tipo: number) {
        if (this.asistenciaService.asistencias.find((x) => x.id_op === id_op)) {
            return;
        }

        let t = 0;
        let d = 0;
        let f = 0;
        let b = 0;
        let v = 0;
        let j = 0;
        let f1 = "";
        let f2 = "";
        let desc = "";

        if (tipo === 1) {
            t = 1;
            d = 0;
            b = 0;
            v = 0;
            j = 0;
            f1 = "";
            f2 = "";
            desc = "";
        }

        if (tipo === 2) {
            t = 0;
            d = 1;
            b = 0;
            v = 0;
            j = 0;
            f1 = "";
            f2 = "";
            desc = "";
        }

        if (tipo === 3) {
            t = 1;
            f = 1;
            b = 0;
            v = 0;
            j = 0;
            f1 = "";
            f2 = "";
            desc = "";
        }

        if (tipo === 4) {
            t = 0;
            f = 0;
            b = 1;
            v = 0;
            j = 0;
            f1 = this.fecha;
            f2 = this.fecha;
            desc = "ENFERMEDAD";
        }

        if (tipo === 5) {
            t = 0;
            f = 0;
            b = 0;
            v = 1;
            j = 0;
            f1 = this.fecha;
            f2 = this.fecha;
            desc = "VACACIONES";
        }

        if (tipo === 6) {
            t = 0;
            f = 0;
            b = 0;
            v = 0;
            j = 1;
            f1 = this.fecha;
            f2 = this.fecha;
            desc = "CONFINAMIENTO";
        }

        if (tipo === 7) {
            t = 0;
            f = 0;
            b = 0;
            v = 0;
            j = 1;
            f1 = this.fecha;
            f2 = this.fecha;
            desc = `VACACIONES DEL AÑO PASADO ${Number(f1.slice(0, 4)) - 1}`;
        }

        const asis: Asistencia = {
            id_op: id_op,
            puesto: "",
            observacion: desc,
            fecha_fin: f1,
            fecha_inicio: f2,
            fecha: this.fecha,
            trabajado: t,
            descanso: d,
            baja: b,
            vacaciones: 0,
            disfrutadas: v,
            festivo: f,
            injustificado: 0,
            justificado: j,
            nombre: nombre,
        };

        this.asistenciaService.addAsistencia(asis).subscribe(
            () => {
                console.log("Salvado");
                this.asistenciaService.listaAsistenciasDia(this.fecha);
                // this.router.navigate(['/dash/asistencia/entrada']);
            },
            (error) => console.error("Error creating : " + error)
        );
    }

    ventanaClick(i: number, t: string) {
        this.tipoVentana = t;
        this.ventana = i;
    }
}
