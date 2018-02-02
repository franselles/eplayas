import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Hamaca } from '../../shared/models';
import { HamacasService } from '../../shared/hamacas.service';

@Component({
  selector: 'app-hamacas-detalle',
  templateUrl: './hamacas-detalle.component.html',
  styleUrls: ['./hamacas-detalle.component.css']
})
export class HamacasDetalleComponent implements OnInit {

  public hamacasForm: FormGroup;
  public hamaca: Hamaca;
  public enEdicion: boolean;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private fb: FormBuilder,
    private hamacasService: HamacasService) { }

  ngOnInit() {
    this.hamacasForm = this.fb.group({
      sector: ['', Validators.required],
      fecha: ['', Validators.required],
      hamacas: [''],
      sombrillas: [''],
      h_rotas: [''],
      h_retiradas: [''],
      h_repuestas: [''],
      s_rotas: [''],
      s_retiradas: [''],
      s_repuestas: [''],
      observacion: ['']
    });

    const id = this.activatedRoute.snapshot.params['id'];

    if (id) {
      this.hamacasService.getHamaca(id)
        .subscribe((data: Hamaca) => {
            console.log(data);
            this.hamaca = data;
            this.enEdicion = true;
            this.cargaFormulario(data);
          },
          err => console.log(err));
    } else {
      this.enEdicion = false;
    }
  }

  cargaFormulario(data: Hamaca) {
    this.hamacasForm.patchValue({
      sector: data.sector,
      fecha: data.fecha,
      hamacas: data.hamacas,
      sombrillas: data.sombrillas,
      h_rotas: data.h_rotas,
      h_retiradas: data.h_retiradas,
      s_rotas: data.s_rotas,
      s_retiradas: data.s_retiradas,
      s_repuestas: data.s_repuestas,
      observacion: data.observacion
    });
  }

  /*
   // GESTION DE onSubmit
   */

  onSubmit(data: any) {
    if (this.enEdicion === true) {
      this.hamacasService.updateHamaca(this.hamaca._id, data.value)
        .subscribe(() => {
          console.log('Actializado');
          this.router.navigate(['/dash/hamacas']);
        }, err => console.log('Error updating : ' + err));
    } else {
      this.hamacasService.addHamaca(data.value)
        .subscribe(() => {
          console.log('Creado');
          this.router.navigate(['/dash/hamacas']);
        }, err => console.log('Error creating : ' + err));
    }
  }


  /*
   GESTION Cancelar
   */

  onCancelar() {
    this.router.navigate(['/dash/hamacas']);
  }

  /*
   GESTION Borrar
   */


  onBorrar(datos: any) {
    this.hamacasService.removeHamaca(this.hamaca._id).subscribe(() => {
      console.log('Borrado');
      this.router.navigate(['/dash/hamacas']);
    }, error => console.error('Error removing : ' + error));
  }

}
