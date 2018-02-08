import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HamacasComponent } from './hamacas/hamacas.component';
import { HamacasDetalleComponent } from './hamacas-detalle/hamacas-detalle.component';
import { HamacasListaComponent } from './hamacas-lista/hamacas-lista.component';
import { LoggedInGuard } from '../shared/logged-in.guard';
import { HamacasService } from '../shared/hamacas.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BdService } from '../shared/bd.services';
import { HamacasHistoricoComponent } from './hamacas-historico/hamacas-historico.component';
import { GlobalsPartes } from '../shared/globalspartes.services';

const routes: Routes = [
  {path: '', component: HamacasListaComponent, canActivate: [LoggedInGuard]},
  {path: 'detalle', component: HamacasDetalleComponent, canActivate: [LoggedInGuard]},
  {path: 'detalle/:id', component: HamacasDetalleComponent, canActivate: [LoggedInGuard]},
  {path: 'historico', component: HamacasHistoricoComponent, canActivate: [LoggedInGuard]}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    HamacasComponent,
    HamacasDetalleComponent,
    HamacasListaComponent,
    HamacasHistoricoComponent
  ],
  providers: [
    HamacasService,
    BdService,
    GlobalsPartes
  ]
})
export class HamacasModule { }
