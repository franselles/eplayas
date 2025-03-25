import { AnalisisService } from '../../../shared/analisis.services';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Total } from './../../../shared/models';

@Component({
    selector: 'app-pesos-mun',
    templateUrl: './pesos-mun.component.html',
    styleUrls: ['./pesos-mun.component.css'],
    standalone: false
})
export class PesosMunComponent implements OnInit {

  private fechad: string;
  private fechah: string;
  private lugar: string;
  public  municipio: string;

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
      this.fechad = params['fechad'];
      this.fechah = params['fechah'];
      // this.lugar = params['lugar'];
      this.municipio = params['municipio'];

      this.abrePesosMun(this.fechad, this.fechah, this.municipio);
    });
  }

  abrePesosMun(fechad: string, fechah: string, municipio: string) {
    this.analisisServices.getPesosMunicipio(fechad, fechah, municipio).
      subscribe(data =>  {
        this.pesos = data[0];
      }, err => console.log(err));
  }

}
