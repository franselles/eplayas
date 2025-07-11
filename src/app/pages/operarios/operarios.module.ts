import { BdService } from "../../shared/bd.services";
import { OperariosService } from "../../shared/operarios.services";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { LoggedInGuard } from "../../shared/logged-in.guard";
import { OperariosDetalleComponent } from "./operarios-detalle/operarios-detalle.component";
import { OperariosListaComponent } from "./operarios-lista/operarios-lista.component";
import { OperariosHorarioComponent } from "./operarios-horario/operarios-horario.component";

const routes: Routes = [
    {
        path: "",
        component: OperariosListaComponent,
        canActivate: [LoggedInGuard],
    },
    {
        path: "detalle",
        component: OperariosDetalleComponent,
        canActivate: [LoggedInGuard],
    },
    {
        path: "detalle/:id",
        component: OperariosDetalleComponent,
        canActivate: [LoggedInGuard],
    },
    {
        path: "horario",
        component: OperariosHorarioComponent,
        canActivate: [LoggedInGuard],
    },
];

@NgModule({
    imports: [CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forChild(routes), OperariosDetalleComponent,
        OperariosListaComponent,
        OperariosHorarioComponent], providers: [OperariosService, BdService, provideHttpClient(withInterceptorsFromDi())] })
export class OperariosModule {}
