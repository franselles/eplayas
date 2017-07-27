import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartesManComponent } from './partes-man/partes-man.component';

const routes: Routes = [
  {path: '', component: PartesManComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PartesManComponent]
})
export class PartesManModule { }
