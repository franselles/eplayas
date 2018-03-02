import { Component, OnInit } from '@angular/core';

import { Mantenimiento } from './../../shared/models';
import { MantenimientoService } from './../../shared/mantenimiento.services';
import { GlobalsPartes } from './../../shared/globalspartes.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-partes-man-lista',
  templateUrl: './partes-man-lista.component.html',
  styleUrls: ['./partes-man-lista.component.css']
})
export class PartesManListaComponent implements OnInit {

  public listaMante: Mantenimiento[] = [];
  public fecha: string;

  constructor(private mantenimientoService: MantenimientoService, private globalPartes: GlobalsPartes, private router: Router) { }

  ngOnInit() {
    this.fecha = this.globalPartes.fecha;
    this.actualizaLista();
  }

  nuevoParte() {
    this.router.navigate(['dash/mantenimiento/detalle']);
  }

  actualizaLista() {
    this.globalPartes.setFecha(this.fecha);
    this.mantenimientoService.getMantenimientoDia(this.fecha).subscribe(
      (data: Mantenimiento[]) => this.listaMante = data,
      err => console.log(err)
    );

    this.globalPartes.setFecha(this.fecha);
  }

}
