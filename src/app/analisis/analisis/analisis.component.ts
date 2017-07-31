import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-analisis',
  templateUrl: './analisis.component.html',
  styleUrls: ['./analisis.component.css']
})
export class AnalisisComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
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
}
