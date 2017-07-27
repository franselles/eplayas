import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HamacasComponent } from './hamacas/hamacas.component';

const routes: Routes = [
  {path: '', component: HamacasComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HamacasComponent]
})
export class HamacasModule { }
