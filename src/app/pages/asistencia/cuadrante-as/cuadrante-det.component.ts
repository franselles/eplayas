import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { Cuadrante } from "../../../shared/models"

@Component({
  selector: 'app-cuadrante-det',
  imports: [],
  templateUrl: './cuadrante-det.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './cuadrante-det.component.css',
})

export class CuadranteDetComponent {
  cuadrante = input<Cuadrante[]>();
}
