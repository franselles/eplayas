import { BdService } from '../../shared/bd.services';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AnalisisService } from '../../shared/analisis.services';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AnalisisComponent } from './analisis/analisis.component';
import { PesosMunComponent } from './pesos-mun/pesos-mun.component';
import { PesosPlaComponent } from './pesos-pla/pesos-pla.component';
import { EstadisticasMunComponent } from './estadisticas-mun/estadisticas-mun.component';
import { EstadisticasPlaComponent } from './estadisticas-pla/estadisticas-pla.component';

const routes: Routes = [
  {path: '', component: AnalisisComponent, children: [
    {path: 'pesos_mun/:fechad/:fechah/:municipio', component: PesosMunComponent},
    {path: 'pesos_pla/:fechad/:fechah/:municipio/:lugar', component: PesosPlaComponent},
    {path: 'estadisticas_mun/:fechad/:fechah/:municipio', component: EstadisticasMunComponent},
    {path: 'estadisticas_pla/:fechad/:fechah/:municipio/:lugar', component: EstadisticasPlaComponent}
  ]}
];

@NgModule({
    imports: [CommonModule,
        RouterModule.forChild(routes),
        FormsModule, AnalisisComponent,
        PesosMunComponent,
        PesosPlaComponent,
        EstadisticasMunComponent,
        EstadisticasPlaComponent], providers: [
        AnalisisService,
        BdService,
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AnalisisModule { }
