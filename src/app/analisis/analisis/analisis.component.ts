import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-analisis',
  templateUrl: './analisis.component.html',
  styleUrls: ['./analisis.component.css']
})
export class AnalisisComponent implements OnInit {

  public visible: boolean;
  public textoOculta: string;

  constructor(private router: Router) { }

  ngOnInit() {
    this.visible = true;
    this.textoOculta = '[-] ocultar';
  }

  abreAnalisis(tipo: string, fechad: string, fechah: string, municipio: string, lugar: string) {
    switch (tipo) {
      case '1':
        this.router.navigate(['dash/analisis/pesos_mun/', fechad, fechah, municipio]);
        break;
      case '2':
        this.router.navigate(['dash/analisis/pesos_pla/', fechad, fechah, municipio, lugar]);
        break;
      case '3':
        this.router.navigate(['dash/analisis/estadisticas_mun/', fechad, fechah, municipio]);
        break;
      case '4':
        this.router.navigate(['dash/analisis/estadisticas_pla/', fechad, fechah, municipio, lugar]);
        break;
    }
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
