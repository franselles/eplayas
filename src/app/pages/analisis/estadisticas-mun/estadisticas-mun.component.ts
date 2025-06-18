import { AnalisisService } from '../../../shared/analisis.services';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgFor, UpperCasePipe } from '@angular/common';

// import { Total } from './../../../shared/models';

@Component({
    selector: 'app-estadisticas-mun',
    templateUrl: './estadisticas-mun.component.html',
    styleUrls: ['./estadisticas-mun.component.css'],
    imports: [NgFor, UpperCasePipe]
})
export class EstadisticasMunComponent implements OnInit {

  private fechad: string;
  private fechah: string;
  private lugar: string;
  public municipio: string;

  public estadisticas: any[];

  constructor(private route: ActivatedRoute, private analisisServices: AnalisisService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.fechad = params['fechad'];
      this.fechah = params['fechah'];
      // this.lugar = params['lugar'];
      this.municipio = params['municipio'];

      this.abreEstadisticasMun(this.fechad, this.fechah, this.municipio, );
    });
  }

  abreEstadisticasMun(fechad: string, fechah: string, municipio: string) {
    this.analisisServices.getEstadisticasMunicipio(fechad, fechah, municipio).
      subscribe((data: any[]) =>  {
        this.estadisticas = data;
      }, err => console.log(err));
  }

}
