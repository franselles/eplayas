import { Estadistica } from '../../shared/models';
import { EstadisticasService } from '../../shared/estadisticas.services';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-estadisticas-detalle',
  templateUrl: './estadisticas-detalle.component.html',
  styleUrls: ['./estadisticas-detalle.component.css']
})
export class EstadisticasDetalleComponent implements OnInit {

  public estadisticasForm: FormGroup;
  public estadistica: Estadistica;
  public enEdicion = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
    private estadisticasService: EstadisticasService, private fb: FormBuilder) { }

  ngOnInit() {
    this.estadisticasForm = this.fb.group({
      estadistica: ['', Validators.required],
      gravedad: []
    });

    const id = this.activatedRoute.snapshot.params['id'];

    if (id) {
      this.estadisticasService.getEstadistica(id)
        .subscribe((data: Estadistica) => {
          this.estadistica = data;
          this.enEdicion = true;
          this.cargaFormulario(this.estadistica);
        },
        err => console.log(err));
    } else {
      this.enEdicion = false;
    }
  }

  cargaFormulario(data: Estadistica) {
    this.estadisticasForm.patchValue({
      estadistica: data.estadistica,
      gravedad: data.gravedad
    });
  }

  /*
   // GESTION DE onSubmit
   */

  onSubmit(data: any) {
    if (this.enEdicion === true) {
      this.estadisticasService.updateEstadistica(this.estadistica._id, data.value)
        .subscribe(() => {
          console.log('Actializado');
          this.router.navigate(['/dash/incidencias']);
        }, err => console.log('Error updating : ' + err));
    } else {
      this.estadisticasService.addEstadistica(data.value)
        .subscribe(() => {
          console.log('Creado');
          this.router.navigate(['/dash/incidencias']);
        }, err => console.log('Error creating : ' + err));
    }
  }


  /*
   GESTION Cancelar
   */

  onCancelar() {
    this.router.navigate(['/dash/incidencias']);
  }

  /*
   GESTION Borrar
   */


  onBorrar(datos: any) {
    this.estadisticasService.removeEstadistica(this.estadistica._id).subscribe(() => {
      console.log('Borrado');
      this.router.navigate(['/dash/incidencias']);
    }, error => console.error('Error removing : ' + error));
  }

}
