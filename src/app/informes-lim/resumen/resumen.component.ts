import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css']
})
export class ResumenComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  abreRes(fecha: string, turno: string, municipio: string) {
    this.router.navigate(['dash/informeslimpieza/diario/', fecha, turno, municipio]);
  }

  abreMes(fecha: string, turno: string, lugar: string, municipio: string) {
    this.router.navigate(['dash/informeslimpieza/mensual/', fecha, turno, lugar, municipio]);
  }

}
