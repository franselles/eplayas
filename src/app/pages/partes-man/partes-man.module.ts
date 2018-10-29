import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PartesManComponent } from './partes-man/partes-man.component';
import { PartesManListaComponent } from './partes-man-lista/partes-man-lista.component';
import { PartesManDetalleComponent } from './partes-man-detalle/partes-man-detalle.component';
import { LoggedInGuard } from '../../shared/logged-in.guard';
import { MantenimientoService } from '../../shared/mantenimiento.services';
import { BdService } from '../../shared/bd.services';
import { GlobalsPartes } from '../../shared/globalspartes.services';
import { OperariosService } from '../../shared/operarios.services';
import { VehiculosService } from '../../shared/vehiculos.services';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {path: '', component: PartesManListaComponent, canActivate: [LoggedInGuard]},
  {path: 'detalle', component: PartesManDetalleComponent, canActivate: [LoggedInGuard]},
  {path: 'detalle/:id', component: PartesManDetalleComponent, canActivate: [LoggedInGuard]}
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    PartesManComponent,
    PartesManListaComponent,
    PartesManDetalleComponent
  ],
  providers: [
    BdService,
    GlobalsPartes,
    OperariosService,
    VehiculosService,
    MantenimientoService
  ]
})
export class PartesManModule { }
