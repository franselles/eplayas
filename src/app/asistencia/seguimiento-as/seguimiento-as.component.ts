import { Component, OnInit } from '@angular/core';
import { Operario } from '../../shared/models';
import { AsistenciaService } from '../../shared/asistencia.services';
import { GlobalsPartes } from '../../shared/globalspartes.services';

@Component({
  selector: 'app-seguimiento-as',
  templateUrl: './seguimiento-as.component.html',
  styleUrls: ['./seguimiento-as.component.css']
})
export class SeguimientoAsComponent implements OnInit {


  public fechai: string;
  public fechaf: string;
  public idop: string;
  public listaOperarios: Operario[] = [];
  public visible = true;
  public textoOculta = '[-] ocultar';

  constructor(private asistenciaService: AsistenciaService, private globalPartes: GlobalsPartes) {

  }

  ngOnInit() {

    this.fechai = this.globalPartes.fecha;

    this.fechaf = this.globalPartes.fecha;

    this.asistenciaService.getOperarios().subscribe(
      (data: Operario[]) => {
        this.listaOperarios = data;
      },
      err => console.log(err)
    );
  }

  oculta(event) {
    event.preventDefault();
    if (this.visible) {
      this.visible = false;
      this.textoOculta = '[+] mostrar';
    } else {
      this.visible = true;
      this.textoOculta = '[-] ocultar';
    }
  }

}
