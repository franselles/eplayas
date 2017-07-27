import { BdService } from '../shared/bd.services';
import { ResumenService } from '../shared/resumen.services';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule, JsonpModule, Http } from '@angular/http';
import { LoggedInGuard } from '../shared/logged-in.guard';
import { ResumenDiaComponent } from './resumen-dia/resumen-dia.component';
import { ResumenMesComponent } from './resumen-mes/resumen-mes.component';
import { ResumenComponent } from './resumen/resumen.component';
import { ResumenDiaPartesComponent } from './resumen-dia/resumen-dia-partes.component';
import { ResumenDiaDetalleComponent } from './resumen-dia/resumen-dia-detalle.component';

const routes: Routes = [
  {path: '', component: ResumenComponent, canActivate: [LoggedInGuard], children: [
    {path: 'diario/:dia/:turno/:municipio', component: ResumenDiaComponent},
    {path: 'mensual/:dia/:turno/:municipio', component: ResumenMesComponent}
  ]}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpModule
  ],
  declarations: [
    ResumenDiaComponent,
    ResumenMesComponent,
    ResumenComponent,
    ResumenDiaPartesComponent,
    ResumenDiaDetalleComponent
  ],
  providers: [
    ResumenService,
    BdService
  ]
})
export class InformesLimModule { }
