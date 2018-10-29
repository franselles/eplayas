import { Component, OnInit } from '@angular/core';

import { Operario } from './../../../shared/models';
import { OperariosService } from './../../../shared/operarios.services';

@Component({
  selector: 'app-operarios-lista',
  templateUrl: './operarios-lista.component.html',
  styleUrls: ['./operarios-lista.component.css']
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
