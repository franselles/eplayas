import { Component, inject, OnInit } from '@angular/core';
import { VehiculosService } from '../../../shared/vehiculos.services';
import { ItvAlert } from '../../../shared/models';

@Component({
    selector: 'app-taller',
    templateUrl: './taller.component.html',
    styleUrls: ['./taller.component.css']
})
export class TallerComponent implements OnInit {

  private vehicleService = inject(VehiculosService);

  itvs: ItvAlert[] = [];

  constructor() {
        this.vehicleService.getItvAlert().subscribe((data: ItvAlert[]) => {
          this.itvs = data;
          console.log(this.itvs);
        });
   }

  ngOnInit() {
  }

}
