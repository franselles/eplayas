import { Component, OnInit } from '@angular/core';
import { AsistenciaService } from '../../shared/asistencia.services';
import { GlobalsPartes } from '../../shared/globalspartes.services';
import { Operario } from '../../shared/models';

@Component({
  selector: 'app-acumulado-as',
  templateUrl: './acumulado-as.component.html',
  styleUrls: ['./acumulado-as.component.css']
})
export class AcumuladoAsComponent implements OnInit {

  public fechai: string;
  public fechaf: string;
  public idop: string;
  public concepto: string;
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

  cargaConcepto(event) {
    this.concepto = event;
  }

}
