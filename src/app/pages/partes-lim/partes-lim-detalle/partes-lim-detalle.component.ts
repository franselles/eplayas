import { Component, OnInit } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, UntypedFormArray, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { Parte } from "./../../../shared/models";
import { PartesService } from "./../../../shared/partes.services";
import { EstadisticasService } from "./../../../shared/estadisticas.services";
import { OperariosService } from "./../../../shared/operarios.services";
import { VehiculosService } from "./../../../shared/vehiculos.services";
import { GlobalsPartes } from "./../../../shared/globalspartes.services";

@Component({
    selector: "app-partes-lim-detalle",
    templateUrl: "./partes-lim-detalle.component.html",
    styleUrls: ["./partes-lim-detalle.component.css"],
    standalone: false
})
export class PartesLimDetalleComponent implements OnInit {
    public parteForm: UntypedFormGroup;
    public parte: Parte;
    public listaEstadisticas = [];
    public listaOperarios = [];
    public listaVehiculos = [];
    public enEdicion: boolean;
    public enviado: boolean;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private fb: UntypedFormBuilder,
        private partesService: PartesService,
        private estadisticasService: EstadisticasService,
        private operariosService: OperariosService,
        private vehiculosService: VehiculosService,
        private globalPartes: GlobalsPartes
    ) {}

    ngOnInit() {
        /*      document.addEventListener('mousewheel', function(event) {
      if (document.activeElement.classList.contains('noscroll')) {
          (document.activeElement as HTMLElement).blur();
      }
    }); */

        this.parteForm = this.fb.group({
            // Se crea el FormGroup del formulario
            municipio: ["", Validators.required],
            fecha: [this.globalPartes.fecha, Validators.required],
            lugar: ["", Validators.required],
            turno: ["", Validators.required],
            tipo: ["", Validators.required],
            operario: [""],
            vehiculo: [""],
            numero_ops: [""],
            observacion_ayto: [""],
            observacion_ra: [""],
            estadisticas: this.fb.array([]),
            pesos: this.fb.group({
                rsu_manual: [""],
                rsu_criba: [""],
                selectivo: [""],
                algas_pesadas: [""],
                algas_teoricas: [""],
            }),
            horarios: this.fb.group({
                salida_almacen: [""],
                salida_playa: [""],
                llegada_almacen: [""],
            }),
            bolsas: [""],
        });

        this.enviado = false;

        this.estadisticasService.getEstadisticas().subscribe(
            (data: any[]) => (this.listaEstadisticas = data),
            (error) => console.log(error)
        );
        this.operariosService.getOperariosActCond().subscribe(
            (data: any[]) => {
                this.listaOperarios = data;
                this.listaOperarios.forEach((x) => {
                    // x.nombre = x.nombre.toUpperCase();
                    x.nombre = this.capitalize(x.nombre);
                });
            },
            (error) => console.log(error)
        );
        this.vehiculosService.getVehiculos().subscribe(
            (data: any[]) => (this.listaVehiculos = data),
            (error) => console.log(error)
        );

        const id = this.activatedRoute.snapshot.params["id"];

        if (id) {
            this.partesService.getParte(id).subscribe(
                (parte: Parte) => {
                    this.parte = parte;
                    // this.parte.operario = parte.operario.toUpperCase();
                    this.parte.operario = this.capitalize(parte.operario);
                    this.cargaDatosFormulario(this.parte);
                    this.enEdicion = true;
                },
                (err) => console.log(err)
            );
        } else {
            this.enEdicion = false;
        }
    }

    capitalize(sentence: string): string {
        const words = sentence.toLowerCase().split(" ");

        return words
            .map((word) => {
                return word[0].toUpperCase() + word.substring(1);
            })
            .join(" ");
    }

    cargaDatosFormulario(parte: Parte) {
        /*
    for (let i in parte.operarios) {
      this.nuevoOperario(parte.operarios[i].nombre);
    }
    ;
    */

        for (const i in parte.estadisticas) {
            if ({}.hasOwnProperty.call(parte.estadisticas, i)) {
                this.nuevaEstadistica(parte.estadisticas[i].estadistica);
            }
        }

        this.parteForm.patchValue({
            municipio: parte.municipio,
            fecha: parte.fecha,
            lugar: parte.lugar,
            turno: parte.turno,
            tipo: parte.tipo,
            vehiculo: parte.vehiculo,
            operario: parte.operario,
            numero_ops: parte.numero_ops,
            observacion_ayto: parte.observacion_ayto,
            observacion_ra: parte.observacion_ra,
            pesos: {
                rsu_manual: parte.pesos.rsu_manual,
                rsu_criba: parte.pesos.rsu_criba,
                selectivo: parte.pesos.selectivo,
                algas_pesadas: parte.pesos.algas_pesadas,
                algas_teoricas: parte.pesos.algas_teoricas,
            },
            horarios: {
                salida_almacen: parte.horarios.salida_almacen,
                salida_playa: parte.horarios.salida_playa,
                llegada_almacen: parte.horarios.llegada_almacen,
            },
            bolsas: parte.bolsas,
        });
    }

    get estadisticas(): UntypedFormArray {
        return this.parteForm.get("estadisticas") as UntypedFormArray;
    }

    /*
  ACCESO RAPIDO
  */

    setAccesoRapido(o: number) {
        switch (o) {
            case 1:
                this.parteForm.patchValue({
                    municipio: "Benidorm",
                    lugar: "Levante y Calas",
                    turno: "Mañana",
                    tipo: "Manual",
                });
                break;
            case 2:
                this.parteForm.patchValue({
                    municipio: "Benidorm",
                    lugar: "Poniente y Mal Pas",
                    turno: "Mañana",
                    tipo: "Manual",
                });
                break;
            case 3:
                this.parteForm.patchValue({
                    municipio: "Benidorm",
                    lugar: "Levante y Calas",
                    turno: "Tarde",
                    tipo: "Manual",
                });
                break;
            case 4:
                this.parteForm.patchValue({
                    municipio: "Benidorm",
                    lugar: "Poniente y Mal Pas",
                    turno: "Tarde",
                    tipo: "Manual",
                });
                break;
            case 5:
                this.parteForm.patchValue({
                    municipio: "Benidorm",
                    lugar: "Levante y Calas",
                    turno: "Noche",
                    tipo: "Manual",
                });
                break;
            case 6:
                this.parteForm.patchValue({
                    municipio: "Benidorm",
                    lugar: "Poniente y Mal Pas",
                    turno: "Noche",
                    tipo: "Manual",
                });
                break;
            case 11:
                this.parteForm.patchValue({
                    observacion_ayto:
                        "Cribado y nivelación de la arena de playa.",
                });
                break;
            case 12:
                this.parteForm.patchValue({
                    observacion_ayto: "Cribado de la orilla de playa.",
                });
                break;
            case 13:
                const texto1 = this.parteForm.get("observacion_ayto").value;
                this.parteForm.patchValue({
                    observacion_ayto: texto1 + "\n" + "MANTENIMIENTO:\n",
                });
                break;
            case 14:
                const texto2 = this.parteForm.get("observacion_ayto").value;
                this.parteForm.patchValue({
                    observacion_ayto:
                        texto2 +
                        "\n" +
                        "Limpieza y desinfección de lavapiés, escaleras y casetas.",
                });
                break;
            case 15:
                const texto3 = this.parteForm.get("observacion_ayto").value;
                this.parteForm.patchValue({
                    observacion_ayto:
                        texto3 +
                        `Desinfección y limpieza de pasarelas, lavapies, papeleras, casetas.
Limpieza a pie de toda la playa, rios, y salidas de agua.                        
Basura pequeña. Hojas secas, colillas, papeles, plásticos, y similar.
Se rastilla filo, pasarelas, palmeras y cambian papeleras.`,
                });
                break;
        }
    }

    /*
  TEMPORADAS
  */

    setOperariosTemporada(o: number) {
        switch (o) {
            case 1:
                this.parteForm.patchValue({
                    numero_ops: 13,
                });
                break;
            case 2:
                this.parteForm.patchValue({
                    numero_ops: 27,
                });
                break;
        }
    }

    /*
   GESTION CAMPOS Estadisticas
   */

    nuevaEstadistica(nuevaEst: string) {
        const campoEst = this.parteForm.controls["estadisticas"] as UntypedFormArray;
        campoEst.push(this.campoEst(nuevaEst));
    }

    campoEst(n: string) {
        return this.fb.group({
            estadistica: [n],
        });
    }

    onQuitaEstadistica(i: number) {
        const campoEst = this.parteForm.controls["estadisticas"] as UntypedFormArray;
        campoEst.removeAt(i);
    }

    onMasEstadsitica(nuevaEst: any) {
        this.nuevaEstadistica(nuevaEst);
    }

    /*
   GESTION Submit
   */

    onSubmit(datos: any) {
        this.enviado = true;

        if (this.enEdicion === true) {
            this.partesService
                .updateParte(this.parte._id, datos.value)
                .subscribe(
                    () => {
                        console.log("Actualizado");
                        this.router.navigate(["/dash/limpieza"]);
                    },
                    (error) => console.error("Error updating : " + error)
                );
        } else {
            this.partesService.addParte(datos.value).subscribe(
                () => {
                    console.log("Salvado");
                    this.router.navigate(["/dash/limpieza"]);
                },
                (error) => console.error("Error creating : " + error)
            );
        }
    }

    /*
   GESTION Cancelar
   */

    onCancelar() {
        this.router.navigate(["/dash/limpieza"]);
    }

    /*
   GESTION Borrar
   */

    onBorrar(datos: any) {
        this.enviado = true;

        this.partesService.removeParte(this.parte._id, datos.value).subscribe(
            () => {
                console.log("Borrado");
                this.router.navigate(["/dash/limpieza"]);
            },
            (error) => console.error("Error removing : " + error)
        );
    }
}
