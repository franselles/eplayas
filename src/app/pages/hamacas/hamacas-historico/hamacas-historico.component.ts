import { Component, OnInit } from '@angular/core';
import { Hamaca, Acumulados } from '../../../shared/models';
import { HamacasService } from '../../../shared/hamacas.service';
import { GlobalsPartes } from '../../../shared/globalspartes.services';

@Component({
    selector: 'app-hamacas-historico',
    templateUrl: './hamacas-historico.component.html',
    styleUrls: ['./hamacas-historico.component.css'],
    standalone: false
})
export class HamacasHistoricoComponent implements OnInit {

  public fecha1: string;
  public fecha2: string;
  public sector: number;

  public listaHamacas: Hamaca[] = [];
  public acumuladoHamacas: Acumulados;

  constructor(private hamacasService: HamacasService, private global: GlobalsPartes) { }

  ngOnInit() {
    this.sector = 1;
    const splitFecha = this.global.fecha.split('-');

    this.fecha1 = splitFecha[0] + '-' + splitFecha[1] + '-01';
    this.fecha2 = this.global.fecha;

    this.actualizaLista();
  }

  actualizaLista() {
    if (this.fecha1 ===  '' || this.fecha2 === '') {
      return;
    }
    this.hamacasService.getHamacasHistorico(this.fecha1, this.fecha2, this.sector)
      .subscribe(
        (data: Hamaca[]) => {
          this.listaHamacas = data;
        },
        err => console.log(err)
      );

      this.hamacasService.getHamacasHistoricoRotas(this.fecha1, this.fecha2, this.sector)
      .subscribe(
        (data: Acumulados) => {
          this.acumuladoHamacas = data[0];
        },
        err => console.log(err)
      );
  }

}
