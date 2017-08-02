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
  public visible: boolean;
  public textoOculta: string;

  constructor(private router: Router, private globalPartes: GlobalsPartes) { }

  ngOnInit() {
    this.fecha =  this.globalPartes.fecha;
    this.visible = true;
    this.textoOculta = '[-] ocultar';
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

  abreRes(fecha: string, turno: string, municipio: string) {
    this.router.navigate(['dash/informeslimpieza/diario/', fecha, turno, municipio]);
  }

  abreMes(fecha: string, turno: string, lugar: string, municipio: string) {
    this.router.navigate(['dash/informeslimpieza/mensual/', fecha, turno, lugar, municipio]);
  }

}
