import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import { AsistenciaService } from '../../../shared/asistencia.services';
import { Asistencia } from '../../../shared/models';
import { NgFor, NgIf, DatePipe } from '@angular/common';
import { InDetalleAsComponent } from '../entrada-as/in-detalle-as.component';

@Component({
    selector: 'app-detalle-acu',
    templateUrl: './detalle-acu.component.html',
    styleUrls: ['./detalle-acu.component.css'],
    imports: [NgFor, NgIf, InDetalleAsComponent, DatePipe]
})
export class DetalleAcuComponent implements OnInit, OnChanges {

  @Input() idop: string;
  @Input() fechai: string;
  @Input() fechaf: string;
  @Input() concepto: string;


  public ventana = -1;
  public tipoVentana = 'n';

  public asistencia: Asistencia[] = [];

  constructor(private asistenciaService: AsistenciaService) { }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['idop']) {
      this.actualizaData();
    }

    if (changes['fechai']) {
      this.actualizaData();
    }

    if (changes['fechaf']) {
      this.actualizaData();
    }

    if (changes['concepto']) {
      this.actualizaData();
    }
  }

  actualizaData() {
    this.asistenciaService.getAsistenciaSegimientoAcumulado(this.fechai, this.fechaf, this.idop, this.concepto).subscribe(
      (data: Asistencia[]) => {
        this.asistencia = data;
      },
      err => console.log(err)
    );
  }


  ventanaClick(i: number, t: string) {
    this.tipoVentana = t;
    this.ventana = i;

    this.actualizaData();
  }

}
