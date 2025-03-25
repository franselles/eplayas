import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Mantenimiento } from './../../../shared/models';
import { MantenimientoService } from './../../../shared/mantenimiento.services';
import { OperariosService } from './../../../shared/operarios.services';
import { VehiculosService } from './../../../shared/vehiculos.services';
import { GlobalsPartes } from './../../../shared/globalspartes.services';

@Component({
    selector: 'app-partes-man-detalle',
    templateUrl: './partes-man-detalle.component.html',
    styleUrls: ['./partes-man-detalle.component.css'],
    standalone: false
})
export class PartesManDetalleComponent implements OnInit {

  public manteForm: UntypedFormGroup;
  public mante: Mantenimiento;
  public listaOperarios = [];
  public listaVehiculos = [];
  public enEdicion: boolean;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private fb: UntypedFormBuilder,
    private mantenimientoService: MantenimientoService,
    private operariosService: OperariosService,
    private vehiculosService: VehiculosService,
    private globalPartes: GlobalsPartes) { }

  ngOnInit() {

    this.manteForm = this.fb.group({
      // Se crea el FormGroup del formulario
      municipio: ['', Validators.required],
      fecha: [ this.globalPartes.fecha, Validators.required],
      lugar: ['', Validators.required],
      turno: ['', Validators.required],
      tipo: [''],
      operario: [''],
      vehiculo: [''],
      numero_ops: [''],
      observacion_ayto: [''],
      observacion_ra: [''],
      material: [''],
      coste: [''],
      horarios: this.fb.group({
        salida_almacen: [''],
        salida_playa: [''],
        llegada_almacen: ['']
      })
    });

    this.operariosService.getOperariosActCond().subscribe((data: any[]) => this.listaOperarios = data, error => console.log(error));
    this.vehiculosService.getVehiculos().subscribe((data: any[]) => this.listaVehiculos = data, error => console.log(error));

    const id = this.activatedRoute.snapshot.params['id'];

    if (id) {
      this.mantenimientoService.getMantenimiento(id).subscribe((data: Mantenimiento) => {
        this.mante = data;
        this.cargaDatosFormulario(this.mante);
        this.enEdicion = true;
      }, err => console.log(err));
    } else {
      this.enEdicion = false;
    }
  }

  cargaDatosFormulario(mante: Mantenimiento) {

    /*
    for (let i in parte.operarios) {
      this.nuevoOperario(parte.operarios[i].nombre);
    }
    ;
    */


    this.manteForm.patchValue({
      municipio: mante.municipio,
      fecha: mante.fecha,
      lugar: mante.lugar,
      turno: mante.turno,
      tipo: mante.tipo,
      vehiculo: mante.vehiculo,
      operario: mante.operario,
      numero_ops: mante.numero_ops,
      observacion_ayto: mante.observacion_ayto,
      observacion_ra: mante.observacion_ra,
      material: mante.material,
      coste: mante.coste,
      horarios: {
        salida_almacen: mante.horarios.salida_almacen,
        salida_playa: mante.horarios.salida_playa,
        llegada_almacen: mante.horarios.llegada_almacen
      }
    });
  }

  /*
   GESTION Submit
   */

  onSubmit(datos: any) {
    if (this.enEdicion === true) {
      this.mantenimientoService.updateMantenimiento(this.mante._id, datos.value).subscribe(() => {
        console.log('Actualizado');
        this.router.navigate(['/dash/mantenimiento']);
      }, error => console.error('Error updating : ' + error));
    } else {
      this.mantenimientoService.addMantenimiento(datos.value).subscribe(() => {
        console.log('Salvado');
        this.router.navigate(['/dash/mantenimiento']);
      }, error => console.error('Error creating : ' + error));
    }
  }

  /*
   GESTION Cancelar
   */

  onCancelar() {
    this.router.navigate(['/dash/mantenimiento']);
  }

  /*
   GESTION Borrar
   */

  onBorrar(datos: any) {
    this.mantenimientoService.removeMantenimiento(this.mante._id, datos.value).subscribe(() => {
      console.log('Borrado');
      this.router.navigate(['/dash/mantenimiento']);
    }, error => console.error('Error removing : ' + error));
  }

}
