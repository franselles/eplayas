import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GlobalsPartes } from './../../shared/globalspartes.services';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css']
})
export class ResumenComponent implements OnInit {

  public fecha: string;
  public lugar: string;
  public municipio: string;
  public turno: string;

  constructor(private router: Router, private globalPartes: GlobalsPartes) { }

  ngOnInit() {
    this.municipio = 'Benidorm';
    this.lugar = 'Levante y Calas';
    this.turno = 'Mañana';
    this.fecha =  this.globalPartes.fecha;
  }

  abreRes(fecha: string, municipio: string) {
    this.router.navigate(['dash/informeslimpieza/diario/', fecha, municipio]);
  }

  abreMes(fecha: string, turno: string, lugar: string, municipio: string) {
    this.router.navigate(['dash/informeslimpieza/mensual/', fecha, turno, lugar, municipio]);
  }

}
