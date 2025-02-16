import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BdService } from '../../shared/bd.services';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { LoggedInGuard } from '../../shared/logged-in.guard';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstadisticasListaComponent } from './estadisticas-lista/estadisticas-lista.component';
import { EstadisticasDetalleComponent } from './estadisticas-detalle/estadisticas-detalle.component';

import { EstadisticasService } from '../../shared/estadisticas.services';

const routes: Routes = [
  {path: 'lista', component: EstadisticasListaComponent, canActivate: [LoggedInGuard]},
  {path: 'detalle', component: EstadisticasDetalleComponent, canActivate: [LoggedInGuard]},
  {path: 'detalle/:id', component: EstadisticasDetalleComponent, canActivate: [LoggedInGuard]},
  { path: '**', redirectTo: 'lista', pathMatch: 'full' }
];

@NgModule({ declarations: [
        EstadisticasListaComponent,
        EstadisticasDetalleComponent
    ], imports: [CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forChild(routes)], providers: [
        EstadisticasService,
        BdService,
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class EstadisticasModule { }
