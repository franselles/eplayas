import { Estadistica } from '../../../shared/models';
import { EstadisticasService } from '../../../shared/estadisticas.services';
import { ActivatedRoute, Router } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';


@Component({
    selector: 'app-estadisticas-detalle',
    templateUrl: './estadisticas-detalle.component.html',
    styleUrls: ['./estadisticas-detalle.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ReactiveFormsModule]
})
export class EstadisticasDetalleComponent implements OnInit {

  public estadisticasForm!: UntypedFormGroup;
  public estadistica!: Estadistica;
  public enEdicion = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
    private estadisticasService: EstadisticasService, private fb: UntypedFormBuilder) { }

  ngOnInit() {
    this.estadisticasForm = this.fb.group({
      estadistica: ['', Validators.required],
      gravedad: []
    });

    const id = this.activatedRoute.snapshot.params['id'];

    if (id) {
      this.estadisticasService.getEstadistica(id)
        .subscribe({
          next: (data: Estadistica) => {
          this.estadistica = data;
          this.enEdicion = true;
          this.cargaFormulario(this.estadistica);
        },
        error: (err) => console.log(err)
      });     
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
      this.estadisticasService.updateEstadistica(this.estadistica._id!, data.value)
        .subscribe({
          next: () => {
            console.log('Actualizado');
            this.router.navigate(['/dash/incidencias']);
          },
          error: (err) => console.log('Error updating : ' + err)
        });
    } else {
      this.estadisticasService.addEstadistica(data.value)
        .subscribe({
          next: () => {
            console.log('Creado');
            this.router.navigate(['/dash/incidencias']);
          },
          error: (err) => console.log('Error creating : ' + err)
        });
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
    this.estadisticasService.removeEstadistica(this.estadistica._id!).subscribe(
      {
        next: () => {
          console.log('Borrado');
          this.router.navigate(['/dash/incidencias']);
        },
        error: (error) => console.error('Error removing : ' + error)
      }
    );
  }

}
