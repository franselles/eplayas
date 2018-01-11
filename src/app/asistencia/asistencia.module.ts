import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlAsComponent } from './control-as/control-as.component';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { EntradaAsComponent } from './entrada-as/entrada-as.component';
import { DetalleAsComponent } from './entrada-as/detalle-as.component';
import { LoggedInGuard } from '../shared/logged-in.guard';
import { AsistenciaService } from '../shared/asistencia.services';
import { BdService } from '../shared/bd.services';
import { GlobalsPartes } from '../shared/globalspartes.services';

const routes: Routes = [
  {path: '', component: ControlAsComponent, canActivate: [LoggedInGuard], children: [
    {path: 'entrada', component: EntradaAsComponent, canActivate: [LoggedInGuard], children : [
      {path: ':fecha/:id', component: DetalleAsComponent}
    ]}
  ]}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [
    ControlAsComponent,
    EntradaAsComponent,
    DetalleAsComponent],
  providers: [
    BdService,
    AsistenciaService,
    GlobalsPartes
  ]
})
export class AsistenciaModule { }
