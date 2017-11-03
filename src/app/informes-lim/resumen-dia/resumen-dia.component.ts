import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Parte, Total } from './../../shared/models';
import { ResumenService } from './../../shared/resumen.services';

@Component({
  selector: 'app-resumen-dia',
  templateUrl: './resumen-dia.component.html',
  styleUrls: ['./resumen-dia.component.css']
})
export class ResumenDiaComponent implements OnInit {

  public fecha: string;
  public turno: string;
  public municipio: string;

  public totalBas: Total;
  // public listaPlayas: any[];

  public datos: any[];
  public noche = 'Noche';

  constructor(private resumenService: ResumenService, private route: ActivatedRoute) { }

  ngOnInit() {

   this.route.params.subscribe(params => {
      this.fecha = params['dia'];
      this.municipio = params['municipio'];

      this.abreRes(this.fecha, this.municipio);
    });

  }

  abreRes(fecha: string, municipio: string) {

    this.resumenService.getResPlaya(fecha, municipio)
      .subscribe((data: any[]) => {
        this.datos = data;
      }, err => console.log(err));

    this.resumenService.getResbas(fecha, municipio)
      .subscribe(data => {
        this.totalBas = data[0];
      }, err => console.log(err));
  }
}
