import { Component, OnInit } from '@angular/core';
import { AsistenciaService } from '../../shared/asistencia.services';
import { ActivatedRoute, Router } from '@angular/router';
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
  private asistencia: Asistencia;

  constructor(public asistenciaService: AsistenciaService, private globalPartes: GlobalsPartes, private router: Router) {

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

  insertaRapido(id_op: string, nombre: string, tipo: number) {

    if (this.asistenciaService.asistencias.find(x => x.id_op === id_op)) {
      return;
    }

    let t = 0;
    let d = 0;
    let f = 0;

    if (tipo === 1) {
      t = 1;
      d = 0;
    }

    if (tipo === 2) {
      t = 0;
      d = 1;
    }

    if (tipo === 3) {
      t = 1;
      f = 1;
    }

    const asis: Asistencia = {
      id_op: id_op,
      puesto: '',
      observacion: '',
      fecha_fin: '',
      fecha_inicio: '',
      fecha: this.fecha,
      trabajado: t,
      descanso: d,
      baja: 0,
      disfrutadas: 0,
      festivo: f,
      injustificado: 0,
      justificado: 0,
      vacaciones: 0,
      nombre: nombre
    };



    this.asistenciaService.addAsistencia(asis).subscribe(() => {
      console.log('Salvado');
      this.asistenciaService.listaAsistenciasDia(this.fecha);
      // this.router.navigate(['/dash/asistencia/entrada']);
    }, error => console.error('Error creating : ' + error));
  }

}
