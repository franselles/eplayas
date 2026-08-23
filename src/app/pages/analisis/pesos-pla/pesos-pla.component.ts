import { AnalisisService } from '../../../shared/analisis.services';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Total } from './../../../shared/models';
import { UpperCasePipe } from '@angular/common';

@Component({
    selector: 'app-pesos-pla',
    templateUrl: './pesos-pla.component.html',
    styleUrls: ['./pesos-pla.component.css'],
    imports: [UpperCasePipe]
})
export class PesosPlaComponent implements OnInit {

  private fechad: string = '';
  private fechah: string = '';
  public lugar: string = '';
  public municipio: string = '';

  public pesos: Total = {
    total_rsu_manual: 0,
    total_rsu_criba: 0,
    total_selectivo: 0,
    total_algas_pesadas: 0,
    total_algas_teoricas: 0
  };


  constructor(private route: ActivatedRoute, private analisisServices: AnalisisService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let [year, month, day] = params['fechad'].split("-");
      this.fechad = new Date(year, month - 1, day).toISOString().split('T')[0]; 
      [year, month, day] = params['fechah'].split("-");
      this.fechah = new Date(year, month - 1, day).toISOString().split('T')[0];
      this.lugar = params['lugar'];
      this.municipio = params['municipio'];

      this.abrePesosPla(this.fechad, this.fechah, this.lugar, this.municipio, );
    });
  }

  abrePesosPla(fechad: string, fechah: string, lugar: string, municipio: string) {
    this.analisisServices.getPesosPlaya(fechad, fechah, lugar, municipio).
      subscribe({
        next: (data) => {
          this.pesos = data[0];
        },
        error: (err) => console.log(err)
      });
  }
}
