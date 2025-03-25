import { Component, inject, input } from '@angular/core';
import { AsistenciaService } from '../../../shared/asistencia.services';

@Component({
  selector: 'app-cuadrante-det',
  imports: [],
  templateUrl: './cuadrante-det.component.html',
  styleUrl: './cuadrante-det.component.css',
})
export class CuadranteDetComponent {
  cuadrante = input<any[]>();

  asistenciaService = inject(AsistenciaService);

}
