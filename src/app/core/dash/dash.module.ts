import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TopBarComponent } from "./top-bar/top-bar.component";
import { MainContentComponent } from "./main-content/main-content.component";
import { DashComponent } from "./dash.component";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    {
        path: "",
        component: DashComponent,
        children: [
            {
                path: "operarios",
                loadChildren: () =>
                    import("./../../pages/operarios/operarios.module").then(
                        (m) => m.OperariosModule
                    ),
            },
            {
                path: "asistencia",
                loadChildren: () =>
                    import("./../../pages/asistencia/asistencia.module").then(
                        (m) => m.AsistenciaModule
                    ),
            },
            {
                path: "incidencias",
                loadChildren: () =>
                    import(
                        "./../../pages/estadisticas/estadisticas.module"
                    ).then((m) => m.EstadisticasModule),
            },
            {
                path: "limpieza",
                loadChildren: () =>
                    import("./../../pages/partes-lim/partes-lim.module").then(
                        (m) => m.PartesLimModule
                    ),
            },
            {
                path: "informeslimpieza",
                loadChildren: () =>
                    import(
                        "./../../pages/informes-lim/informes-lim.module"
                    ).then((m) => m.InformesLimModule),
            },
            {
                path: "analisis",
                loadChildren: () =>
                    import("./../../pages/analisis/analisis.module").then(
                        (m) => m.AnalisisModule
                    ),
            },
            {
                path: "mantenimiento",
                loadChildren: () =>
                    import("./../../pages/partes-man/partes-man.module").then(
                        (m) => m.PartesManModule
                    ),
            },
            {
                path: "taller",
                loadChildren: () =>
                    import("./../../pages/taller/taller.module").then(
                        (m) => m.TallerModule
                    ),
            },
            {
                path: "hamacas",
                loadChildren: () =>
                    import("./../../pages/hamacas/hamacas.module").then(
                        (m) => m.HamacasModule
                    ),
            },
        ],
    },
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    declarations: [TopBarComponent, MainContentComponent, DashComponent],
})
export class DashModule {}
