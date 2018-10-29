import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopBarComponent } from './top-bar/top-bar.component';
import { MainContentComponent } from './main-content/main-content.component';
import { DashComponent } from './dash.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', component: DashComponent, children: [
      {path: 'operarios', loadChildren: './../../pages/operarios/operarios.module#OperariosModule'},
      {path: 'asistencia', loadChildren: './../../pages/asistencia/asistencia.module#AsistenciaModule'},
      {path: 'incidencias', loadChildren: './../../pages/estadisticas/estadisticas.module#EstadisticasModule'},
      {path: 'limpieza', loadChildren: './../../pages/partes-lim/partes-lim.module#PartesLimModule'},
      {path: 'informeslimpieza', loadChildren: './../../pages/informes-lim/informes-lim.module#InformesLimModule'},
      {path: 'analisis', loadChildren: './../../pages/analisis/analisis.module#AnalisisModule'},
      {path: 'mantenimiento', loadChildren: './../../pages/partes-man/partes-man.module#PartesManModule'},
      {path: 'taller', loadChildren: './../../pages/taller/taller.module#TallerModule'},
      {path: 'hamacas', loadChildren: './../../pages/hamacas/hamacas.module#HamacasModule'}
    ]}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    TopBarComponent,
    MainContentComponent,
    DashComponent
  ]
})
export class DashModule { }
