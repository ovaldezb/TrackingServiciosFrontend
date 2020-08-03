//Importar los modulos del router de angular
import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

//Importar componentes
import { HomeComponent } from './components/home/home.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { TecnicosComponent } from './components/tecnicos/tecnicos.component';
import { ServicioComponent } from './components/servicio/servicio.component';
import { MoverStatusComponent } from './components/mover-status/mover-status.component';

//Array de Componentes
const appRoutes: Routes = [
    {path:'',component:HomeComponent},
    {path:'home',component:HomeComponent},
    {path:'reportes',component:ReportesComponent},
    {path:'tecnicos',component:TecnicosComponent},
    {path:'servicio',component:ServicioComponent},
    {path:'movserv',component:MoverStatusComponent}
];

// Exportar el modulo de rutas
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);