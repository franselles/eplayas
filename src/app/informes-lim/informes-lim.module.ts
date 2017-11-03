import { FormsModule } from '@angular/forms';
import { GlobalsPartes } from '../shared/globalspartes.services';
import { BdService } from '../shared/bd.services';
import { ResumenService } from '../shared/resumen.services';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LoggedInGuard } from '../shared/logged-in.guard';
import { ResumenDiaComponent } from './resumen-dia/resumen-dia.component';
import { ResumenMesComponent } from './resumen-mes/resumen-mes.component';
import { ResumenComponent } from './resumen/resumen.component';

const routes: Routes = [
  {path: '', component: ResumenComponent, canActivate: [LoggedInGuard], children: [
    {path: 'diario/:dia/:municipio', component: ResumenDiaComponent},
    {path: 'mensual/:fecha/:turno/:lugar/:municipio', component: ResumenMesComponent}
  ]}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    FormsModule
  ],
  declarations: [
    ResumenDiaComponent,
    ResumenMesComponent,
    ResumenComponent
  ],
  providers: [
    ResumenService,
    BdService,
    GlobalsPartes
  ]
})
export class InformesLimModule { }
