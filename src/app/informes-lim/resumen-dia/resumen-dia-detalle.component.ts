import { Component, OnInit, Input } from '@angular/core';

import { Parte } from './../../shared/models';

@Component({
  selector: 'app-resumen-dia-detalle',
  templateUrl: './resumen-dia-detalle.component.html',
  styleUrls: ['./resumen-dia-detalle.component.css']
})
export class ResumenDiaDetalleComponent implements OnInit {

  @Input() parte: Parte;

  constructor() { }

  ngOnInit() {
  }

}
