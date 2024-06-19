import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {routing, appRoutingProviders} from './app.routing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
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
import { ImgRegresoComponent } from './components/img-regreso/img-regreso.component';
import { AuthUserComponent } from './components/auth-user/auth-user.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { ImgPagoTecnicoComponent } from './components/img-pago-tecnico/img-pago-tecnico.component';
import { PrintLayoutComponent } from './components/print-layout/print-layout.component';
import { EnviosComponent } from './components/envios/envios.component';
import { InventarioComponent } from './components/inventario/inventario.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuinventarioComponent } from './components/menuinventario/menuinventario.component';
import { SalidainventarioComponent } from './components/salidainventario/salidainventario.component';
import { ReporteinventarioComponent } from './components/reporteinventario/reporteinventario.component';
import {AngularMyDatePickerModule} from 'angular-mydatepicker';
import { ClienteComponent } from './components/cliente/cliente.component';

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
    MostrarEquiposComponent,
    ImgRegresoComponent,
    AuthUserComponent,
    LoginComponent,
    ImgPagoTecnicoComponent,
    PrintLayoutComponent,
    EnviosComponent,
    InventarioComponent,
    MenuinventarioComponent,
    SalidainventarioComponent,
    ReporteinventarioComponent,
    ClienteComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule,
    MomentModule,
    AngularFileUploaderModule,
    BrowserAnimationsModule,
    AngularMyDatePickerModule
  ],
  providers: [appRoutingProviders,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
