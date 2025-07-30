import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehiculosService } from '../../../shared/vehiculos.services';
import { RespuestaAlertasITV } from '../../../shared/models';

@Component({
  selector: 'app-taller',
  imports: [CommonModule],
  templateUrl: './taller.component.html',
  styleUrls: ['./taller.component.css'],
})
export class TallerComponent implements OnInit {
  private vehicleService = inject(VehiculosService);

  itvs: RespuestaAlertasITV;

  constructor() {
    this.vehicleService.getItvAlert().subscribe((data: RespuestaAlertasITV) => {
      this.itvs = data;
      console.log(this.itvs);
    });
  }

  ngOnInit() {}

  // Métodos a añadir en tu componente TypeScript:

  getColorByUrgencia(urgencia: string): string {
    const colors = {
      'vencida': 'danger',
      'alta': 'warning',
      'media': 'warning',
      'baja': 'success',
    };
    return colors[urgencia as keyof typeof colors] || 'secondary';
  }

  getBadgeClass(urgencia: string): string {
    return `badge-${urgencia}`;
  }

  getTextColorByDays(dias: number): string {
    if (dias <= 0) return 'text-danger';
    if (dias <= 7) return 'text-warning';
    if (dias <= 15) return 'text-warning';
    return 'text-success';
  }

  getDiasTexto(dias: number): string {
    if (dias <= 0) return `Vencida (${Math.abs(dias)} días)`;
    if (dias === 1) return 'Mañana';
    return `${dias} días`;
  }

}
