import { EstadisticasService } from '../../shared/estadisticas.services';
import { Component, OnInit } from '@angular/core';

import { Estadistica } from './../../shared/models';

@Component({
  selector: 'app-estadisticas-lista',
  templateUrl: './estadisticas-lista.component.html',
  styleUrls: ['./estadisticas-lista.component.css']
})
export class EstadisticasListaComponent implements OnInit {

  estadisticas: Estadistica[] = [];

  constructor(private estadisticasService: EstadisticasService ) { }

  ngOnInit() {
    this.estadisticasService.getEstadisticas()
      .subscribe(data => {
        this.estadisticas = data;
      });
  }

}
