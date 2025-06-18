import { Component, OnInit } from '@angular/core';

import { Operario } from './../../../shared/models';
import { OperariosService } from './../../../shared/operarios.services';
import { RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
    selector: 'app-operarios-lista',
    templateUrl: './operarios-lista.component.html',
    styleUrls: ['./operarios-lista.component.css'],
    imports: [RouterLink, NgFor]
})
export class OperariosListaComponent implements OnInit {

  public listaOperarios: Operario[] = [];

  constructor(private operariosService: OperariosService) { }

  ngOnInit() {
    this.operariosService.getOperarios().subscribe(
      (data: Operario[]) => this.listaOperarios = data,
      err => console.log(err)
    );
  }

}
