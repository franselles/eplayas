import { Component, OnInit } from '@angular/core';
// import { Hamaca } from '../../../shared/models';
import { HamacasService } from '../../../shared/hamacas.service';

@Component({
    selector: 'app-hamacas-lista',
    templateUrl: './hamacas-lista.component.html',
    styleUrls: ['./hamacas-lista.component.css'],
    standalone: false
})
export class HamacasListaComponent implements OnInit {

  public listaHamacas: any[] = [];

  constructor(private hamacasService: HamacasService) { }

  ngOnInit() {
    this.hamacasService.getHamacasUltimos().subscribe(
      (data: any[]) => {
        this.listaHamacas = data;
      },
      err => console.log(err)
    );
  }

}
