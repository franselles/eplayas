import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { AsistenciaService } from '../../../shared/asistencia.services';
import { TotalAsistencia } from '../../../shared/models';

@Component({
  selector: 'app-acumulado-seg',
  templateUrl: './acumulado-seg.component.html',
  styleUrls: ['./acumulado-seg.component.css']
})
export class AcumuladoSegComponent implements OnInit, OnChanges {

  @Input() idop: string;
  @Input() fechai: string;
  @Input() fechaf: string;

  @Output() concepto = new EventEmitter();

  public totales: TotalAsistencia;

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

  cargaConcepto(concepto: string) {
    this.concepto.emit(concepto);
  }

  actualizaData() {
    this.asistenciaService.getAsistenciaSegAcumulado(this.fechai, this.fechaf, this.idop).subscribe(
      (data: TotalAsistencia) => {
        this.totales = data[0];
      },
      err => console.log(err)
    );
  }

}
