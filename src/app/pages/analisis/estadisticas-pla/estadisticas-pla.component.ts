import { AnalisisService } from '../../../shared/analisis.services';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgFor, UpperCasePipe } from '@angular/common';

@Component({
    selector: 'app-estadisticas-pla',
    templateUrl: './estadisticas-pla.component.html',
    styleUrls: ['./estadisticas-pla.component.css'],
    imports: [NgFor, UpperCasePipe]
})
export class EstadisticasPlaComponent implements OnInit {

  private fechad: string;
  private fechah: string;
  public  lugar: string;
  public municipio: string;

  public estadisticas: any[];

  constructor(private route: ActivatedRoute, private analisisServices: AnalisisService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.fechad = params['fechad'];
      this.fechah = params['fechah'];
      this.lugar = params['lugar'];
      this.municipio = params['municipio'];

      this.abreEstadisticasPla(this.fechad, this.fechah, this.lugar, this.municipio, );
    });
  }

  abreEstadisticasPla(fechad: string, fechah: string, lugar: string, municipio: string) {
    this.analisisServices.getEstadisticasPlaya(fechad, fechah, lugar, municipio).
      subscribe((data: any[]) =>  {
        this.estadisticas = data;
      }, err => console.log(err));
  }

}
