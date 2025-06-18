import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Hamaca } from '../../../shared/models';
import { HamacasService } from '../../../shared/hamacas.service';
import { Location, NgIf } from '@angular/common';

@Component({
    selector: 'app-hamacas-detalle',
    templateUrl: './hamacas-detalle.component.html',
    styleUrls: ['./hamacas-detalle.component.css'],
    imports: [ReactiveFormsModule, NgIf]
})
export class HamacasDetalleComponent implements OnInit {

  public hamacasForm: UntypedFormGroup;
  public hamaca: Hamaca;
  public enEdicion: boolean;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private fb: UntypedFormBuilder,
    private hamacasService: HamacasService, private location: Location) { }

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
            this.hamaca = data;
            this.enEdicion = true;
            this.cargaFormulario(data);
          },
          err => console.log(err));
    } else {
      this.enEdicion = false;
    }

/*     this.hamacasForm.valueChanges.subscribe(value => {
      console.log(value);
    }); */
  }

  cargaFormulario(data: Hamaca) {
    this.hamacasForm.patchValue({
      sector: data.sector,
      fecha: data.fecha,
      hamacas: data.hamacas,
      sombrillas: data.sombrillas,
      h_rotas: data.h_rotas,
      h_retiradas: data.h_retiradas,
      h_repuestas: data.h_repuestas,
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
          // this.router.navigate(['/dash/hamacas']);
          this.location.back();
        }, err => console.log('Error updating : ' + err));
    } else {
      this.hamacasService.addHamaca(data.value)
        .subscribe(() => {
          console.log('Creado');
          // this.router.navigate(['/dash/hamacas']);
          this.location.back();
        }, err => console.log('Error creating : ' + err));
    }
  }


  /*
   GESTION Cancelar
   */

  onCancelar() {
    // this.router.navigate(['/dash/hamacas']);
    this.location.back();
  }

  /*
   GESTION Borrar
   */


  onBorrar(datos: any) {
    this.hamacasService.removeHamaca(this.hamaca._id).subscribe(() => {
      console.log('Borrado');
      // this.router.navigate(['/dash/hamacas']);
      this.location.back();
    }, error => console.error('Error removing : ' + error));
  }

  masHret(value: any) {
    const t = Number(value.h_retiradas);
    const h = Number(value.hamacas);
    this.hamacasForm.patchValue({
      hamacas: h - 1,
      h_retiradas: t + 1
    });
  }

  menosHret(value: any) {
    const t = Number(value.h_retiradas);
    const h = Number(value.hamacas);
    if (t > 0) {
      this.hamacasForm.patchValue({
        hamacas: h + 1,
        h_retiradas: t - 1
      });
    }
  }

  masSret(value: any) {
    const t = Number(value.s_retiradas);
    const h = Number(value.sombrillas);
    this.hamacasForm.patchValue({
      sombrillas: h - 1,
      s_retiradas: t + 1
    });
  }

  menosSret(value: any) {
    const t = Number(value.s_retiradas);
    const h = Number(value.sombrillas);
    if (t > 0) {
      this.hamacasForm.patchValue({
        sombrillas: h + 1,
        s_retiradas: t - 1
      });
    }
  }

  masHrot(value: any) {
    const t = Number(value.h_rotas);
    const h = Number(value.hamacas);
    this.hamacasForm.patchValue({
      hamacas: h - 1,
      h_rotas: t + 1
    });
  }

  menosHrot(value: any) {
    const t = Number(value.h_rotas);
    const h = Number(value.hamacas);
    if (t > 0) {
      this.hamacasForm.patchValue({
        hamacas: h + 1,
        h_rotas: t - 1
      });
    }
  }

  masSrot(value: any) {
    const t = Number(value.s_rotas);
    const h = Number(value.sombrillas);
    this.hamacasForm.patchValue({
      sombrillas: h - 1,
      s_rotas: t + 1
    });
  }

  menosSrot(value: any) {
    const t = Number(value.s_rotas);
    const h = Number(value.sombrillas);
    if (t > 0) {
      this.hamacasForm.patchValue({
        sombrillas: h + 1,
        s_rotas: t - 1
      });
    }
  }

  masHrep(value: any) {
    const t = Number(value.h_repuestas);
    const h = Number(value.hamacas);
    this.hamacasForm.patchValue({
      hamacas: h + 1,
      h_repuestas: t + 1
    });
  }

  menosHrep(value: any) {
    const t = Number(value.h_repuestas);
    const h = Number(value.hamacas);
    if (t > 0) {
      this.hamacasForm.patchValue({
        hamacas: h - 1,
        h_repuestas: t - 1
      });
    }
  }

  masSrep(value: any) {
    const t = Number(value.s_repuestas);
    const h = Number(value.sombrillas);
    this.hamacasForm.patchValue({
      sombrillas: h + 1,
      s_repuestas: t + 1
    });
  }

  menosSrep(value: any) {
    const t = Number(value.s_repuestas);
    const h = Number(value.sombrillas);
    if (t > 0) {
      this.hamacasForm.patchValue({
        sombrillas: h - 1,
        s_repuestas: t - 1
      });
    }
  }

}
