import { Component, OnInit, Input } from '@angular/core';

import { Parte } from './../../shared/models';
import { ResumenService } from './../../shared/resumen.services';

@Component({
  selector: 'app-resumen-dia-partes',
  templateUrl: './resumen-dia-partes.component.html',
  styleUrls: ['./resumen-dia-partes.component.css']
})
export class ResumenDiaPartesComponent implements OnInit {

  @Input() playa: any;

  public playas: Parte[];

  public rsuP: number;
  public rsu_criP: number;
  public selP: number;
  public algasP: number;

  constructor(private resumenService: ResumenService) { }

  ngOnInit() {
    this.rsuP = 0;
    this.rsu_criP = 0;
    this.selP = 0;
    this.algasP = 0;

    this.abreRes(this.playa.fecha, this.playa.turno, this.playa.lugar);
  }

  abreRes(fecha: string, turno: string, lugar: string) {
    this.resumenService.getResPlaya(fecha, turno, lugar)
      .subscribe(data => {
        this.playas = data;
        for (const element of this.playas){
        this.rsuP += Number(element.pesos.rsu_manual);
        this.rsu_criP += Number(element.pesos.rsu_criba);
        this.selP += Number(element.pesos.selectivo);
        this.algasP += Number(element.pesos.algas_pesadas);
    }
      }
      , err => console.log(err));
  }
}
