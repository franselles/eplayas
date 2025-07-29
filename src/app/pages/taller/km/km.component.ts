import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';

import { Vehiculo } from '../../../shared/models';
import { VehiculosService } from '../../../shared/vehiculos.services';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-km',
  templateUrl: './km.component.html',
  styleUrl: './km.component.css',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  standalone: true,
})
export class KmComponent implements OnInit {
  private vehiclesService = inject(VehiculosService);
  public fb = inject(FormBuilder);

  vehicles: Vehiculo[];
  form: FormGroup;

  private idCounter = 0;
  public actualizado: boolean = false;

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
      km_tramo: this.fb.control(vehiculo.km_tramo),
      km_sig_rev: this.fb.control(vehiculo.km_sig_rev),
      ult_itv: this.fb.control(vehiculo.ult_itv),
      prx_itv: this.fb.control(vehiculo.prx_itv),
    });

    arreglo.push(grupo);
  }

  /* Ejemplo para agregar datos en el arreglo */
  agregarVehiculo() {
    const arreglo = this.form.get('arreglo') as FormArray;

    const grupo = this.fb.group({
      id: this.fb.control(this.idCounter++),
      matricula: this.fb.control(''),
      nombre: this.fb.control(''),
    });

    arreglo.push(grupo);
  }

  borrarGrupo(i: number) {
    const arreglo = this.form.get('arreglo') as FormArray;
    arreglo.removeAt(i);
  }

  onSubmit() {
    console.log(this.form.value.arreglo);
    this.vehiclesService.updateKm(this.form.value.arreglo).subscribe(
      () => {
        this.actualizado = true;
        setTimeout(() => {
          this.actualizado = false;
        }, 3000);
      },
      (error) => console.error('Error actualizacion : ' + error),
    );
  }
}
