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
    this.router.navigate(['dash/imformeslimpieza/diario/', fecha, turno, municipio]);
  }

}
