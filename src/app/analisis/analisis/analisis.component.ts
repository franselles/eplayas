import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-analisis',
  templateUrl: './analisis.component.html',
  styleUrls: ['./analisis.component.css']
})
export class AnalisisComponent implements OnInit {

  public tipo: string;
  public municipio: string;
  public lugar: string;
  public fechade: any;
  public fechaha: any;

  constructor(private router: Router) { }

  ngOnInit() {
    this.municipio = 'Benidorm';
    this.lugar = 'Levante y Calas';
    this.tipo = 'Pesos totales';
  }

  abreAnalisis(tipo: string, fechad: string, fechah: string, municipio: string, lugar: string) {
    switch (tipo) {
      case 'Pesos totales':
        this.router.navigate(['dash/analisis/pesos_mun/', fechad, fechah, municipio]);
        break;
      case 'Pesos por playa':
        this.router.navigate(['dash/analisis/pesos_pla/', fechad, fechah, municipio, lugar]);
        break;
      case 'Estadísticas totales':
        this.router.navigate(['dash/analisis/estadisticas_mun/', fechad, fechah, municipio]);
        break;
      case 'Estadísticas por playa':
        this.router.navigate(['dash/analisis/estadisticas_pla/', fechad, fechah, municipio, lugar]);
        break;
    }
  }

}
