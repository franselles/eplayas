import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalisisComponent } from './analisis/analisis.component';

const routes: Routes = [
  {path: '', component: AnalisisComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AnalisisComponent]
})
export class AnalisisModule { }
