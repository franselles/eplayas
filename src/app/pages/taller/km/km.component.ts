import { Component, inject, OnInit } from '@angular/core';

import { Vehiculo } from '../../../shared/models';
import { VehiculosService } from '../../../shared/vehiculos.services';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-km',
  templateUrl: './km.component.html',
  styleUrl: './km.component.css',
  imports:[ReactiveFormsModule, CommonModule],
  standalone: true
})
export class KmComponent implements OnInit{

  private vehiclesService = inject(VehiculosService);
  public fb = inject(FormBuilder);

  vehicles: Vehiculo[];
  form: FormGroup;

  private idCounter = 0;

  constructor(){
    this.vehicles = [];

    this.form = this.fb.group({
      arreglo: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.vehiclesService.getVehiculos().subscribe((data: Vehiculo[]) => {
      this.vehicles = data;

      console.log(this.vehicles);

      this.vehicles.forEach((vehiculo) => {
        this.insertaVehiculo(vehiculo);
      })
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
    })

    arreglo.push(grupo);
  }

  agregarVehiculo() {
    const arreglo = this.form.get('arreglo') as FormArray;

    const grupo = this.fb.group({
      id: this.fb.control(this.idCounter++),
      matricula: this.fb.control(''),
      nombre: this.fb.control(''),
    })

    arreglo.push(grupo);
  }

   borrarGrupo(i: number) {
    const arreglo = this.form.get('arreglo') as FormArray;
    arreglo.removeAt(i);
 }

 onSubmit(){
  console.log(this.form.value);
 }

}
