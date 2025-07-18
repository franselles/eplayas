import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { GlobalsPartes } from './../../../shared/globalspartes.services';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
    selector: 'app-resumen',
    templateUrl: './resumen.component.html',
    styleUrls: ['./resumen.component.css'],
    imports: [ReactiveFormsModule, FormsModule, RouterOutlet]
})
export class ResumenComponent implements OnInit {
    public fecha: string;
    public lugar: string;
    public municipio: string;
    public turno: string;

    constructor(private router: Router, private globalPartes: GlobalsPartes) {}

    ngOnInit() {
        /*     document.addEventListener('mousewheel', function(event) {
      if (document.activeElement.classList.contains('noscroll')) {
          (document.activeElement as HTMLElement).blur();
      }
    }); */

        this.municipio = 'Benidorm';
        this.lugar = 'Levante y Calas';
        this.turno = 'Mañana';
        this.fecha = this.globalPartes.fecha;
    }

    abreRes(fecha: string, municipio: string) {
        this.router.navigate([
            'dash/informeslimpieza/diario/',
            fecha,
            municipio
        ]);
    }

    abreMes(fecha: string, turno: string, lugar: string, municipio: string) {
        this.router.navigate([
            'dash/informeslimpieza/mensual/',
            fecha,
            turno,
            lugar,
            municipio
        ]);
    }
}
