import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationService } from '../shared/authentication.services';
import { CoreComponent } from './core.component';
import { LoggedInGuard } from './../shared/logged-in.guard';

const routes: Routes = [
    {
        path: 'dash',
        loadChildren: () => import('./../core/dash/dash.module').then(m => m.DashModule),
        canActivate: [LoggedInGuard]
    },
    { path: 'login', loadChildren: () => import('./../login/login.module').then(m => m.LoginModule) },
    { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot(routes, { enableTracing: false, useHash: true })
    ],
    exports: [CoreComponent],
    declarations: [CoreComponent],
    providers: [LoggedInGuard, AuthenticationService]
})
export class CoreModule {}
