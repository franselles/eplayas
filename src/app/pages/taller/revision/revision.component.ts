import { Component, inject, OnInit } from '@angular/core';

import { Vehiculo } from '../../../shared/models';
import { VehiculosService } from '../../../shared/vehiculos.services';

import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-revision',
  imports: [ReactiveFormsModule],
  templateUrl: './revision.component.html',
  styleUrl: './revision.component.css',
})
export class RevisionComponent implements OnInit {
  private vehiclesService = inject(VehiculosService);
  public fb = inject(FormBuilder);

  form: FormGroup;
  vehicles: Vehiculo[];

  constructor() {
    this.vehicles = [];

    this.form = this.fb.group({
      arreglo: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.vehiclesService.getVehiculos().subscribe((data: Vehiculo[]) => {
      this.vehicles = data;

      this.vehicles.forEach((vehiculo) => {
        this.insertaVehiculo(vehiculo);
      });
    });
  }

  get arreglo(): FormArray {
    return this.form.get('arreglo') as FormArray;
  }

  insertaVehiculo(vehiculo: Vehiculo) {
    const arreglo = this.form.get('arreglo') as FormArray;

    const grupo = this.fb.group({
      id: this.fb.control(vehiculo._id),
      matricula: this.fb.control(vehiculo.matricula),
      nombre: this.fb.control(vehiculo.nombre),
      km: this.fb.control(vehiculo.km),
      km_sig_rev: this.fb.control(vehiculo.km_sig_rev),
    });

    arreglo.push(grupo);
  }

  onSubmit() {
    console.log(this.form.value.arreglo);
    this.vehiclesService.updateKm(this.form.value.arreglo).subscribe(
      () => {
        console.log('Actualizado');
      },
      (error) => console.error('Error actualizacion : ' + error),
    );
  }
}
