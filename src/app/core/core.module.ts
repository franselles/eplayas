import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationService } from '../shared/authentication.services';
import { CoreComponent } from './core.component';
import { LoggedInGuard  } from './../shared/logged-in.guard';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'dash', loadChildren: './../core/dash/dash.module#DashModule', canActivate: [LoggedInGuard]},
  {path: 'login', loadChildren: './../login/login.module#LoginModule'}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { enableTracing: false })
  ],
  exports: [
    CoreComponent
  ],
  declarations: [CoreComponent],
  providers: [ LoggedInGuard, AuthenticationService ]
})
export class CoreModule { }
