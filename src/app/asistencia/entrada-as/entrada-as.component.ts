import { Component, OnInit } from '@angular/core';
import { AsistenciaService } from '../../shared/asistencia.services';
import { Operario, Asistencia } from '../../shared/models';
import { GlobalsPartes } from './../../shared/globalspartes.services';

@Component({
  selector: 'app-entrada-as',
  templateUrl: './entrada-as.component.html',
  styleUrls: ['./entrada-as.component.css']
})
export class EntradaAsComponent implements OnInit {

  public operarios: Operario[] = [];
  public fecha: string;

  constructor(public asistenciaService: AsistenciaService, private globalPartes: GlobalsPartes) {

  }

  ngOnInit() {

    this.fecha = this.globalPartes.fecha;

    this.asistenciaService.listaAsistenciasDia(this.fecha);

    this.asistenciaService.getOperarios().subscribe(
      (data: Operario[]) => {
        this.operarios = data;
      },
      err => console.log(err)
    );
  }

  actualizaLista() {
    this.asistenciaService.listaAsistenciasDia(this.fecha);
  }

}
