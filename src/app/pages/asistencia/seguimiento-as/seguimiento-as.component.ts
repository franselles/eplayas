import { Component, OnInit } from '@angular/core';
import { Operario } from '../../../shared/models';
import { AsistenciaService } from '../../../shared/asistencia.services';
import { GlobalsPartes } from '../../../shared/globalspartes.services';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { DetalleSegComponent } from './detalle-seg.component';

@Component({
    selector: 'app-seguimiento-as',
    templateUrl: './seguimiento-as.component.html',
    styleUrls: ['./seguimiento-as.component.css'],
    imports: [ReactiveFormsModule, FormsModule, NgFor, DetalleSegComponent]
})
export class SeguimientoAsComponent implements OnInit {


  public fechai: string;
  public fechaf: string;
  public idop: string;
  public listaOperarios: Operario[] = [];

  constructor(private asistenciaService: AsistenciaService, private globalPartes: GlobalsPartes) {

  }

  ngOnInit() {

    const splitFecha = this.globalPartes.fecha.split('-');

    this.fechai = splitFecha[0] + '-' + splitFecha[1] + '-01';

    this.fechaf = this.globalPartes.fecha;

    this.asistenciaService.getOperarios().subscribe(
      (data: Operario[]) => {
        this.listaOperarios = data;
      },
      err => console.log(err)
    );
  }

}
