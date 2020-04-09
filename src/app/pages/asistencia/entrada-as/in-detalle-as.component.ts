import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AsistenciaService } from '../../../shared/asistencia.services';
import { Asistencia, Operario } from '../../../shared/models';

@Component({
  selector: 'app-in-detalle-as',
  templateUrl: './in-detalle-as.component.html',
  styleUrls: ['./in-detalle-as.component.css']
})
export class InDetalleAsComponent implements OnInit {

  @Input() ffecha: string;
  @Input() idd: string;
  @Output() upventana: EventEmitter<number> = new EventEmitter<number>();

  public asForm: FormGroup;
  public asistencia: Asistencia;

  public enEdicion: boolean;
  public id: string;

  constructor(private fb: FormBuilder, private asistenciaSercice: AsistenciaService) { }

  ngOnInit() {
    this.id = this.idd;

    this.abreDatos(this.ffecha, this.idd);


    this.asForm = this.fb.group({
      // Se crea el FormGroup del formulario

      nombre: [''],
      fecha: [ '', Validators.required],
      puesto: [''],
      trabajado: [''],
      descanso: [''],
      festivo: [''],
      vacaciones: [''],
      disfrutadas: [''],
      baja: [''],
      justificado: [''],
      injustificado: [''],
      fecha_inicio: [''],
      fecha_fin: [''],
      observacion: ['']
    });
  }


abreDatos(fe: string, id: string) {
  this.asistenciaSercice.getAsistencia(fe, id).subscribe(
    (data: Asistencia) => {
      this.asistencia = data[0];
      if (data[0] === undefined) {
        this.enEdicion = false;
        this.asForm.reset();
        this.iniciaDatosForm();
        this.asForm.patchValue({fecha: fe});
        this.asistenciaSercice.getOperario(id).subscribe(
          (ope: Operario) => {
            this.asForm.patchValue({nombre: ope.nombre});
          }, err => console.log(err)
        );
      } else {
        this.enEdicion = true;
        this.cargaDatosForm(this.asistencia);
      }
    },
    err => console.log(err)
  );
}

isEmpty(obj) {
  for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        return false;
      }
  }
  return true;
}

iniciaDatosForm() {
  this.asForm.patchValue({
    trabajado: 0,
    descanso: 0,
    festivo: 0,
    vacaciones: 0,
    disfrutadas: 0,
    baja: 0,
    justificado: 0,
    injustificado: 0});
}

cargaDatosForm(asis: Asistencia) {
  this.asForm.patchValue({
    nombre: asis.nombre,
    fecha: asis.fecha,
    puesto: asis.puesto,
    trabajado: asis.trabajado,
    descanso: asis.descanso,
    festivo: asis.festivo,
    vacaciones: asis.vacaciones,
    disfrutadas: asis.disfrutadas,
    baja: asis.baja,
    justificado: asis.justificado,
    injustificado: asis.injustificado,
    fecha_inicio: asis.fecha_inicio,
    fecha_fin: asis.fecha_fin,
    observacion: asis.observacion});
}

/*
 GESTION Submit
 */

onSubmit(datos: any) {
  if (this.enEdicion === true) {
    datos.value.id_op = this.id;
    this.asistenciaSercice.updateAsistencia(this.asistencia._id, datos.value).subscribe(() => {
      console.log('Actualizado');
      this.asistenciaSercice.listaAsistenciasDia(datos.value.fecha);
      this.asistenciaSercice.listaAsistenciasUltimas(datos.value.fecha);
      this.upventana.emit(-1);
    }, error => console.error('Error updating : ' + error));
  } else {
    datos.value.id_op = this.id;
    this.asistenciaSercice.addAsistencia(datos.value).subscribe(() => {
      console.log('Salvado');
      this.asistenciaSercice.listaAsistenciasDia(datos.value.fecha);
      this.asistenciaSercice.listaAsistenciasUltimas(datos.value.fecha);
      this.upventana.emit(-1);
    }, error => console.error('Error creating : ' + error));
  }
}

/*
 GESTION Cancelar
 */

onCancelar() {
  this.upventana.emit(-1);
}

/*
 GESTION Borrar
 */

onBorrar(datos: any) {
  this.asistenciaSercice.removeAsistencia(this.asistencia._id, datos.value).subscribe(() => {
    console.log('Borrado');
    this.asistenciaSercice.listaAsistenciasDia(datos.value.fecha);
    this.asistenciaSercice.listaAsistenciasUltimas(datos.value.fecha);
    this.upventana.emit(-1);
  }, error => console.error('Error removing : ' + error));
}

}
