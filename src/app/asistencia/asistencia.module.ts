import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlAsComponent } from './control-as/control-as.component';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { EntradaAsComponent } from './entrada-as/entrada-as.component';

const routes: Routes = [
  {path: '', component: ControlAsComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ControlAsComponent, EntradaAsComponent]
})
export class AsistenciaModule { }
