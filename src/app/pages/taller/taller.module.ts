import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TallerComponent } from './taller/taller.component';
import { KmComponent } from './km/km.component';
import { VehiculosService } from '../../shared/vehiculos.services';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { BdService } from '../../shared/bd.services';
import { RevisionComponent } from './revision/revision.component';
import { ReparacionComponent } from './reparacion/reparacion.component';
import { LoggedInGuard } from '../../shared/logged-in.guard';

const routes: Routes = [
  {path: '', component: TallerComponent, canActivate: [LoggedInGuard],},
  {path: 'km', component: KmComponent, canActivate: [LoggedInGuard],},
  {path: 'revision', component: RevisionComponent, canActivate: [LoggedInGuard],},
  {path: 'reparacion/:id', component: ReparacionComponent, canActivate: [LoggedInGuard],}
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        TallerComponent
    ],
    providers: [VehiculosService, BdService, provideHttpClient(withInterceptorsFromDi())]
})
export class TallerModule { }
