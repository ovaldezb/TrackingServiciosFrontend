import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {routing, appRoutingProviders} from './app.routing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MomentModule } from 'angular2-moment';
import { AngularFileUploaderModule } from 'angular-file-uploader';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { TecnicosComponent } from './components/tecnicos/tecnicos.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { ServicioComponent } from './components/servicio/servicio.component';
import { ListaServiciosComponent } from './components/lista-servicios/lista-servicios.component';
import { EquiposComponent } from './components/equipos/equipos.component';
import { MoverStatusComponent } from './components/mover-status/mover-status.component';
import { MostrarEquiposComponent } from './components/mostrar-equipos/mostrar-equipos.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    TecnicosComponent,
    ReportesComponent,
    ServicioComponent,
    ListaServiciosComponent,
    EquiposComponent,
    MoverStatusComponent,
    MostrarEquiposComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule,
    MomentModule,
    AngularFileUploaderModule
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
