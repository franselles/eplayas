import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopBarComponent } from './top-bar/top-bar.component';
import { MainContentComponent } from './main-content/main-content.component';
import { DashComponent } from './dash.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', component: DashComponent, children: [
      {path: 'operarios', loadChildren: './../../operarios/operarios.module#OperariosModule'},
      {path: 'limpieza', loadChildren: './../../partes-lim/partes-lim.module#PartesLimModule'},
      {path: 'informeslimpieza', loadChildren: './../../informes-lim/informes-lim.module#InformesLimModule'},
      {path: 'analisis', loadChildren: './../../analisis/analisis.module#AnalisisModule'},
      {path: 'mantenimiento', loadChildren: './../../partes-man/partes-man.module#PartesManModule'},
      {path: 'taller', loadChildren: './../../taller/taller.module#TallerModule'},
      {path: 'hamacas', loadChildren: './../../hamacas/hamacas.module#HamacasModule'}
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
