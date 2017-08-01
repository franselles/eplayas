import { AnalisisService } from '../../shared/analisis.services';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Total } from './../../shared/models';

@Component({
  selector: 'app-pesos-pla',
  templateUrl: './pesos-pla.component.html',
  styleUrls: ['./pesos-pla.component.css']
})
export class PesosPlaComponent implements OnInit {

  private fechad: string;
  private fechah: string;
  public lugar: string;
  public municipio: string;

  public pesos: Total;


  constructor(private route: ActivatedRoute, private analisisServices: AnalisisService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.fechad = params['fechad'];
      this.fechah = params['fechah'];
      this.lugar = params['lugar'];
      this.municipio = params['municipio'];

      this.abrePesosPla(this.fechad, this.fechah, this.lugar, this.municipio, );
    });
  }

  abrePesosPla(fechad: string, fechah: string, lugar: string, municipio: string) {
    this.analisisServices.getPesosPlaya(fechad, fechah, lugar, municipio).
      subscribe(data =>  {
        this.pesos = data[0];
      }, err => console.log(err));
  }
}
