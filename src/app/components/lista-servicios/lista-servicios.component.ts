import { Component, OnInit, Input } from '@angular/core';
import { Servicio } from '../../models/servicio';
import { Global } from '../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ServicioService } from '../../services/servicios.service';
import { Etapa } from '../../models/etapa';
import { Tecnico } from '../../models/tecnico';
import { Equipo } from '../../models/equipo';
import swal from 'sweetalert';

@Component({
  selector: 'app-lista',
  templateUrl: './lista-servicios.component.html',
  styleUrls: ['./lista-servicios.component.css'],
  providers:[ServicioService]
})
export class ListaServiciosComponent implements OnInit {
  HighlightRow : Number;    
  public tecnico: Tecnico;
  public permiso: Boolean = false;;
  public servicios: Servicio[];
  public serviciosTmp: Servicio[];
  public serviciosFiltro: Servicio[];
  public url: string;
  private etapas: Etapa[];
  private equipos: Equipo[];

  constructor(private _router : Router, private _servicioService: ServicioService) {     
    this.url = Global.url;    
    this.servicios =  [];
  }

  async ngOnInit() {
    
    const user = localStorage.getItem('usuario');    
    const res =  await this._servicioService.getTecnico(user).toPromise();
    this.tecnico = res.tecnico;   
    try{
      const resServicios = await this._servicioService.getServicios().toPromise();
      this.serviciosTmp = resServicios.servicios;            
    } catch(error){
      console.log(error);
      swal("La sesión ha caducado, por favor conéctese nuevamente","Alerta sesión expirada","warning");
      this._router.navigate(['/auth']);
    }
    const resEtapas = await this._servicioService.getetapas().toPromise();
    this.etapas = resEtapas.etapas;
    this.serviciosTmp.forEach(servicio =>{
    
      servicio.estatus = this.etapas[servicio.etapa].nombre;
      var diffdays = (Math.abs(new Date().getTime() - new Date(servicio.fechaIngreso).getTime())/1000/3600/24);                
      if(diffdays <= 10){
        servicio.semaforo = 'g';
      }else if(diffdays > 10 && diffdays <= 14 ){
        servicio.semaforo = 'y';
      }else if(diffdays >= 15){
        servicio.semaforo = 'r';
      }
      this._servicioService.getEquiposById(servicio._id).subscribe(res =>{        
        if(res.equipos.length >0){
          this.equipos = res.equipos;
          var index =0;
          var flag = true;
          if(this.tecnico.rol=='1'){
            for(index=0;index<this.equipos.length;index++){
              if(this.equipos[index].tecnico.clave!=this.tecnico.clave && flag ){
                this.serviciosTmp.splice(index,1);
                flag = false;
              }else if(servicio.etapa ==0 || servicio.etapa == 2  || servicio.etapa == 4 || servicio.etapa == 6 || servicio.etapa == 7 ){
                this.serviciosTmp.splice(index,1);
                flag = false;
              }else{
                servicio.equipo = {marca:this.equipos[0].marca,modelo:this.equipos[0].modelo,serie:this.equipos[0].serie};
                this.servicios.push(servicio);
              }
            }
          }else{
            servicio.equipo = {marca:this.equipos[0].marca,modelo:this.equipos[0].modelo,serie:this.equipos[0].serie};
            this.servicios.push(servicio);
          }
        }
      });
     });
  }

  ClickedRow(index) : void{      
    this.HighlightRow = index; 
  }

  DoubleClickRow(index):void{    
    this._router.navigateByUrl('/movserv',{ state: this.servicios[index] });        
  }



}
