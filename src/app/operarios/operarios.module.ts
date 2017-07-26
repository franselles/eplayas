import { BdService } from '../shared/bd.services';
import { OperariosService } from '../shared/operarios.services';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule, JsonpModule } from '@angular/http';
import { LoggedInGuard } from '../shared/logged-in.guard';
import { OperariosDetalleComponent } from './operarios-detalle/operarios-detalle.component';
import { OperariosListaComponent } from './operarios-lista/operarios-lista.component';

const routes: Routes = [
  {path: '', component: OperariosListaComponent, canActivate: [LoggedInGuard]},
  {path: 'detalle', component: OperariosDetalleComponent, canActivate: [LoggedInGuard]},
  {path: 'detalle/:id', component: OperariosDetalleComponent, canActivate: [LoggedInGuard]}
]

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    OperariosService,
    BdService
  ],
  declarations: [OperariosDetalleComponent, OperariosListaComponent]
})
export class OperariosModule { }
