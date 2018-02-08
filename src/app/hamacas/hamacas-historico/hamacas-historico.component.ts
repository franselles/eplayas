import { Component, OnInit } from '@angular/core';
import { Hamaca } from '../../shared/models';
import { HamacasService } from '../../shared/hamacas.service';
import { GlobalsPartes } from '../../shared/globalspartes.services';

@Component({
  selector: 'app-hamacas-historico',
  templateUrl: './hamacas-historico.component.html',
  styleUrls: ['./hamacas-historico.component.css']
})
export class HamacasHistoricoComponent implements OnInit {

  public fecha1: string;
  public fecha2: string;
  public sector: number;

  public listaHamacas: Hamaca[] = [];

  constructor(private hamacasService: HamacasService, private global: GlobalsPartes) { }

  ngOnInit() {
    this.sector = 1;
    this.fecha1 = this.global.fecha;
    this.fecha2 = this.global.fecha;
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
  }

}
