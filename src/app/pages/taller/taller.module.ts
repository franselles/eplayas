import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TallerComponent } from './taller/taller.component';

const routes: Routes = [
  {path: '', component: TallerComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TallerComponent]
})
export class TallerModule { }
