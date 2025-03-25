import { Component, OnInit } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { Operario } from "./../../../shared/models";
import { OperariosService } from "./../../../shared/operarios.services";

@Component({
    selector: "app-operarios-detalle",
    templateUrl: "./operarios-detalle.component.html",
    styleUrls: ["./operarios-detalle.component.css"],
    standalone: false
})
export class OperariosDetalleComponent implements OnInit {
    public operariosForm: UntypedFormGroup;
    public operario: Operario;
    public enEdicion: boolean;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private fb: UntypedFormBuilder,
        private operariosService: OperariosService
    ) {}

    ngOnInit() {
        this.operariosForm = this.fb.group({
            nombre: ["", Validators.required],
            nif: [""],
            direccion: [""],
            telefono: [""],
            puesto: [""],
            conductor: [""],
            horario: [""],
            activo: [""],
            ultima_alta: [""],
            ultima_baja: [""],
            observacion: [""],
        });

        const id = this.activatedRoute.snapshot.params["id"];

        if (id) {
            this.operariosService.getOperario(id).subscribe(
                (data: Operario) => {
                    this.operario = data;
                    this.enEdicion = true;
                    this.cargaFormulario(data);
                },
                (err) => console.log(err)
            );
        } else {
            this.enEdicion = false;
        }
    }

    cargaFormulario(data: Operario) {
        this.operariosForm.patchValue({
            nombre: data.nombre,
            nif: data.nif,
            direccion: data.direccion,
            telefono: data.telefono,
            puesto: data.puesto,
            conductor: data.conductor,
            horario: data.horario,
            activo: data.activo,
            ultima_alta: data.ultima_alta,
            ultima_baja: data.ultima_baja,
            observacion: data.observacion,
        });
    }

    /*
   // GESTION DE onSubmit
   */

    onSubmit(data: any) {
        if (this.enEdicion === true) {
            this.operariosService
                .updateOperario(this.operario._id, data.value)
                .subscribe(
                    () => {
                        console.log("Actializado");
                        this.router.navigate(["/dash/operarios"]);
                    },
                    (err) => console.log("Error updating : " + err)
                );
        } else {
            this.operariosService.addOperario(data.value).subscribe(
                () => {
                    console.log("Creado");
                    this.router.navigate(["/dash/operarios"]);
                },
                (err) => console.log("Error creating : " + err)
            );
        }
    }

    /*
   GESTION Cancelar
   */

    onCancelar() {
        this.router.navigate(["/dash/operarios"]);
    }

    /*
   GESTION Borrar
   */

    onBorrar(datos: any) {
        this.operariosService.removeOperario(this.operario._id).subscribe(
            () => {
                console.log("Borrado");
                this.router.navigate(["/dash/operarios"]);
            },
            (error) => console.error("Error removing : " + error)
        );
    }
}
