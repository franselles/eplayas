import { Component, OnInit } from '@angular/core';

import { Parte } from './../../shared/models';
import { PartesService } from './../../shared/partes.services';
import { GlobalsPartes } from './../../shared/globalspartes.services';

@Component({
  selector: 'app-partes-lim-lista',
  templateUrl: './partes-lim-lista.component.html',
  styleUrls: ['./partes-lim-lista.component.css']
})
export class PartesLimListaComponent implements OnInit {

  public listaPartes: Parte[] = [];
  public fecha: string;

  constructor(private partesService: PartesService, private globalPartes: GlobalsPartes) { }

  ngOnInit() {
    this.fecha = this.globalPartes.fecha;
    this.actualizaLista();
  }

  actualizaLista() {
    this.partesService.getPartesDia(this.fecha).subscribe(
      partes => this.listaPartes = partes,
      err => console.log(err)
    );

    this.globalPartes.setFecha(this.fecha);
  }
}
