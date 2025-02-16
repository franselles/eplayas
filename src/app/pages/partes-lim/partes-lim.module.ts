import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { BdService } from '../../shared/bd.services';
import { EstadisticasService } from '../../shared/estadisticas.services';
import { OperariosService } from './../../shared/operarios.services';
import { VehiculosService } from '../../shared/vehiculos.services';
import { LoggedInGuard } from '../../shared/logged-in.guard';
import { PartesService } from '../../shared/partes.services';
import { GlobalsPartes } from './../../shared/globalspartes.services';
import { PartesLimDetalleComponent } from './partes-lim-detalle/partes-lim-detalle.component';
import { PartesLimListaComponent } from './partes-lim-lista/partes-lim-lista.component';
import { PartesLimComponent } from './partes-lim/partes-lim.component';

const routes: Routes = [
    {
        path: '',
        component: PartesLimListaComponent,
        canActivate: [LoggedInGuard]
    },
    {
        path: 'detalle',
        component: PartesLimDetalleComponent,
        canActivate: [LoggedInGuard]
    },
    {
        path: 'detalle/:id',
        component: PartesLimDetalleComponent,
        canActivate: [LoggedInGuard]
    }
];

@NgModule({ declarations: [
        PartesLimComponent,
        PartesLimDetalleComponent,
        PartesLimListaComponent
    ], imports: [CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forChild(routes)], providers: [
        BdService,
        VehiculosService,
        EstadisticasService,
        OperariosService,
        PartesService,
        GlobalsPartes,
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class PartesLimModule {}
