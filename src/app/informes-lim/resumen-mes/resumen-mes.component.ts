import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Parte } from './../../shared/models';
import { ResumenService } from './../../shared/resumen.services';

@Component({
  selector: 'app-resumen-mes',
  templateUrl: './resumen-mes.component.html',
  styleUrls: ['./resumen-mes.component.css']
})
export class ResumenMesComponent implements OnInit {

  public partes: Parte[];

  private fecha: string;
  public month: string;
  public year: string;
  public turno: string;
  public municipio: string;

  constructor(private resumenService: ResumenService, private route: ActivatedRoute) { }

  ngOnInit() {

   this.route.params.subscribe(params => {
      let strFecha: any;

      this.fecha = params['fecha'];

      console.log(this.fecha);

      strFecha = this.fecha.split('-');

      this.year = strFecha[0];
      this.month = strFecha[1];

      this.turno = params['turno'];
      this.municipio = params['municipio'];

      console.log(this.year, this.month, this.turno, this.municipio);

      this.abreMes(this.year, this.month, this.turno, this.municipio);
    });
  }

  abreMes(year: string, month: string, turno: string, municipio: string) {
    this.resumenService.getMesPlaya(year, month, turno, municipio)
      .subscribe(data => {
        this.partes = data;
      }, err => console.log(err));

  }
}
