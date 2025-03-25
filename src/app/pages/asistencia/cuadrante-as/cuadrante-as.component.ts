import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AsistenciaService } from '../../../shared/asistencia.services';
import { GlobalsPartes } from '../../../shared/globalspartes.services';
import { CuadranteDetComponent } from "./cuadrante-det.component";

@Component({
  selector: 'app-cuadrante-as',
  imports: [FormsModule, CuadranteDetComponent],
  templateUrl: './cuadrante-as.component.html',
  styleUrl: './cuadrante-as.component.css',
})


export class CuadranteAsComponent implements OnInit {

  constructor() { }

  asistenciaService = inject(AsistenciaService);
  globalPartes = inject(GlobalsPartes);

  cuadrante = [];
  fechai: string;
  fechaf: string;

  ngOnInit() {

    const splitFecha = this.globalPartes.fecha.split('-');

    this.fechai = splitFecha[0] + '-' + splitFecha[1] + '-01';

    this.fechaf = this.globalPartes.fecha;

  }

  datosCuadrante() {
    this.asistenciaService.getAsistenciaCuadrante(this.fechai, this.fechaf).subscribe(
      (data: any) => {
        this.cuadrante = data;
      },
      (err) => console.log(err),
    );
  }

}
