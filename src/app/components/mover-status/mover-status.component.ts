import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Servicio } from '../../models/servicio';
import  swal  from 'sweetalert';
import { Equipo } from '../../models/equipo';
import { Mensajeria } from '../../models/mensajeria';
import { ServicioService } from '../../services/servicios.service';
import { Global } from '../../services/global';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-mover-status',
  templateUrl: './mover-status.component.html',
  styleUrls: ['./mover-status.component.css'],
  providers:[ServicioService, AuthService]
})
export class MoverStatusComponent implements OnInit {
  url:string;
  public servicio: Servicio;
  public canreapir: boolean;
  public actnnorepair:string;
  public devolver: string = "devolver";
  public resguardo: string = "resguardo";
  public enableBtn:boolean = true;
  public costoequipo: number = 0;
  public imageActive:boolean = false;
  public imgPath:string = "";
  public tecnico: string;
  private deltaGanancia:number = 1.2;
  public equipos:Equipo[];
  public mensajeria:Mensajeria[];
  
  constructor(  
    private _router : Router,  private _servicioService: ServicioService, public authService: AuthService) { 
    this.canreapir = true;
    this.actnnorepair = 'devolver';
    this.url = Global.url;
  }

  ngOnInit(): void {    
    this.servicio = history.state;    
    this._servicioService.getEquiposById(this.servicio._id).subscribe(res =>{      
      if(res.equipos.length > 0){
        this.equipos = res.equipos;              
        this.equipos.forEach(equipo =>{
          this.costoequipo += equipo.costo;
          this._servicioService.getImagesByEquipoId(equipo._id,0).subscribe(res =>{
            if(res.status == 'success'){
              equipo.imagenes = res.imagenes;
            }            
          });          
        });               
      }
    });
    this._servicioService.getMensajerias()
        .subscribe(res=>{
          if(res.status == 'success'){
            this.mensajeria = res.mensajeria;
          }
        });

    if(this.servicio.costotecnico > 0){
      this.servicio.pagoanticipotecnico = this.servicio.costotecnico * 0.7;
      this.servicio.costocliente = (this.servicio.costotecnico + this.servicio.costoenvio) * this.deltaGanancia;
    }else{
      this.servicio.pagoanticipotecnico = 0;
    }
    
  }

  Canrepair(flag):void{    
    this.canreapir = flag;    
    if(!flag){
      this.servicio.numeroguia = '';
      this.servicio = this.servicio;
      this.enableBtn = false;
    }else{
      this.enableBtn = this.servicio.numeroguia.length<1;    
    }
  }

  enviar(stage2move):void{    
    switch(stage2move){
      case 0: //Abierto
        if(this.canreapir){
          //'Enviado';
          this.servicio.etapa = 1;          
        }else if(this.actnnorepair == this.devolver){
          //'En espera cliente recoja';
          this.servicio.etapa = 7;
        }else if(this.actnnorepair == this.resguardo){
          //'Resguardo';
          this.servicio.etapa = 2;
        }
        break;      
      case 1: //Enviado
        //'Recibido';
        this.servicio.etapa = 3;
        break;
      case 2: //Resguardo
        //Enviado
        this.servicio.etapa = 1;
        break;
      case 3: //Recibido
        //'Diagnosticado';
        this.servicio.etapa = 4;
        break;
      case 4: //Diagnosticado
        if(this.servicio.cliautoriza){
            // 'En reaparación';
            this.servicio.etapa = 5;
          }else{
            //'Devolución a TDM';
            this.servicio.etapa = 6;
          }
        break;
      case 5: //En reparación
          //'Devuelto a TDM';
          this.servicio.etapa = 6;
          break;
        case 6: //Devuelto a TDM          
          if(this.servicio.equipoprobado){
            //'En espera cliente recoja';
            this.servicio.etapa = 7;
            this.enviaCorreoFinal();
          }else{
            //Abierto
            this.servicio.etapa = 0;
          }          
          break;
        case 7: //Espera cliente recoja
          //this.servicio.estatus = 'Entregado';          
          this.servicio.etapa = 8;
        break;
    }
    var fechaUltAct = new Date();    
    fechaUltAct.toLocaleString('es-MX', { timeZone: 'America/Chicago' })
    this.servicio.fechaactualizacion = fechaUltAct;    
    this.servicio = this.servicio;
    this._servicioService.updateServicio(this.servicio._id,this.servicio)
        .subscribe(res=>{
          if(res.status=='success'){
            swal('El servicio ha cambiado de estatus','Estatus actualizado','success');
          }
        });    
    this._router.navigate(['/lista']);
  }

  typenoguia(): void{    
    this.enableBtn = this.servicio.numeroguia.length<1;    
  }

  recibeEquipos(event):void{
    this.equipos = event.equipos;        
    for(var i=0; i<this.equipos.length;i++) {          
      this._servicioService.updateEquipoById(this.equipos[i]._id,this.equipos[i])
          .subscribe(res=>{
            this.equipos.forEach(equipo =>{
              this.costoequipo += equipo.costo;              
            });            
          });
    };
  }

  clickImage(imagePath):void{
    this.imageActive = true;
    this.imgPath = this.url+'get-image/'+imagePath;
  }

  closeModal(){
    this.imageActive = false;
  }


  enviaCorreoFinal():void{
    this._servicioService.enviaCorreoFinal(this.servicio).subscribe(res=>{
      //console.log(res);
    });
  }

}
