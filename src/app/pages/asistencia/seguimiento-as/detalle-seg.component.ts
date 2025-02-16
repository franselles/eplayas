import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AsistenciaService } from '../../../shared/asistencia.services';
import { Asistencia } from '../../../shared/models';

@Component({
    selector: 'app-detalle-seg',
    templateUrl: './detalle-seg.component.html',
    styleUrls: ['./detalle-seg.component.css'],
    standalone: false
})
export class DetalleSegComponent implements OnInit, OnChanges {

  @Input() idop: string;
  @Input() fechai: string;
  @Input() fechaf: string;

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
  }

  actualizaData() {
    this.asistenciaService.getAsistenciaSegimiento(this.fechai, this.fechaf, this.idop).subscribe(
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
