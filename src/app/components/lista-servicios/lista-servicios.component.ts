import { Component, OnInit, Input } from '@angular/core';
import { Servicio } from '../../models/servicio';
import { Global } from '../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ServicioService } from '../../services/servicios.service';
import { AuthService } from '../../services/auth.service';
import { Etapa } from '../../models/etapa';
import { Tecnico } from '../../models/tecnico';
import { Equipo } from '../../models/equipo';
import swal from 'sweetalert';

@Component({
  selector: 'app-lista',
  templateUrl: './lista-servicios.component.html',
  styleUrls: ['./lista-servicios.component.css'],
  providers:[ServicioService,AuthService]
})
export class ListaServiciosComponent implements OnInit {
  public HighlightRow : number;
  public tecnico: Tecnico;
  public permiso: Boolean = false;;
  public servicios: Servicio[];
  public serviciosTmp: Servicio[];
  public serviciosFiltro: Servicio[];
  public url: string;
  private etapas: Etapa[];
  private hayDatos: Boolean = false;

  constructor(private _router : Router, private _servicioService: ServicioService, private authservice:AuthService) {
    this.url = Global.url;
    this.servicios =  [];
  }

  async ngOnInit() {
    const idUser = localStorage.getItem('id');
    const user = localStorage.getItem('usuario');
    const res =  await this._servicioService.getTecnico(user).toPromise();
    this.tecnico = res.tecnico;
    try{
      const resServicios = await this._servicioService.getServicios().toPromise();
      this.serviciosTmp = resServicios.servicios;
      this.hayDatos = true;
    } catch(error){
      if(error.status==401){
        swal("La sesión ha caducado, por favor conéctese nuevamente","Alerta sesión expirada","warning");
        this._router.navigate(['/auth']);
        this.hayDatos = false;
      }else if(error.status==404){
        this.hayDatos = false;
        this.servicios = [];
      }
    }
    if(this.hayDatos){
      const resEtapas = await this._servicioService.getetapas().toPromise();
      this.etapas = resEtapas.etapas;
      this.serviciosTmp.forEach(servicio =>{
        servicio.estatus = this.etapas[servicio.etapa].nombre;
        var diffdays = (Math.abs(new Date().getTime() - new Date(servicio.fechaIngreso).getTime())/1000/3600/24);
        if(diffdays <= 15){
          servicio.semaforo = 'g';
        }else if(diffdays > 15 && diffdays <= 30 ){
          servicio.semaforo = 'y';
        }else if(diffdays >= 31){
          servicio.semaforo = 'r';
        }
        if(this.tecnico.rol=='1' && servicio.equipos[0].tecnico.toString()==idUser){
          this.servicios.push(servicio);
        }else{
          this.servicios.push(servicio);
        }
      });
    }
  }

  ClickedRow(index) : void{
    this.HighlightRow = index;
  }

  DoubleClickRow(index):void{
    if(this.authservice.getRol()==0){
      this._router.navigateByUrl('/movserv',{ state: this.servicios[index] });
    }else{
      if(this.servicios[index].etapa == 1 || this.servicios[index].etapa == 3 || this.servicios[index].etapa == 5){
        this._router.navigateByUrl('/movserv',{ state: this.servicios[index] });
      }
    }

  }



}
