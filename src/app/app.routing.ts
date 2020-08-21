//Importar los modulos del router de angular
import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
//Importar componentes
import { HomeComponent } from './components/home/home.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { TecnicosComponent } from './components/tecnicos/tecnicos.component';
import { ServicioComponent } from './components/servicio/servicio.component';
import { MoverStatusComponent } from './components/mover-status/mover-status.component';
import { ListaServiciosComponent } from './components/lista-servicios/lista-servicios.component';
import { LoginComponent } from './components/login/login.component';
import { PrintLayoutComponent } from './components/print-layout/print-layout.component';

//Array de Componentes
const appRoutes: Routes = [
    //{path:'', redirectTo:'/auth', pathMatch: 'full'},
    {path:'',  component:LoginComponent },    
    {path:'auth',  component:LoginComponent },    
    {path:'lista',component:ListaServiciosComponent},
    {path:'reportes',component:ReportesComponent},
    {path:'tecnicos',component:TecnicosComponent},
    {path:'servicio',component:ServicioComponent},
    {path:'movserv',component:MoverStatusComponent},
    {path:'print/:serviceId',outlet: 'print',component:PrintLayoutComponent}
];

// Exportar el modulo de rutas
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);