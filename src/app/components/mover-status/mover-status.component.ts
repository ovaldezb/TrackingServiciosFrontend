import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Servicio } from '../../models/servicio';
import  swal  from 'sweetalert';
import { Equipo } from '../../models/equipo';
import { ServicioService } from '../../services/servicios.service';

@Component({
  selector: 'app-mover-status',
  templateUrl: './mover-status.component.html',
  styleUrls: ['./mover-status.component.css'],
  providers:[ServicioService]
})
export class MoverStatusComponent implements OnInit {

  public servicio: Servicio;
  public canreapir: boolean;
  public actnnorepair:string;
  public devolver: string = "devolver";
  public resguardo: string = "resguardo";
  public enableBtn:boolean = true;
  public costoequipo: number = 0;
  public tecnico: string;
  private deltaGanancia:number = 1.2;
  public equipos:Equipo[];
  constructor(  
    private _router : Router,  private _servicioService: ServicioService
  ) { 
    this.canreapir = true;
    this.actnnorepair = 'devolver';
  }

  ngOnInit(): void {    
    this.servicio = history.state;    
    this._servicioService.getEquiposById(this.servicio._id).subscribe(res =>{      
      if(res.equipos.length > 0){
        this.equipos = res.equipos;
        this.equipos.forEach(equipo =>{
          this.costoequipo += equipo.costo;
        });
        this.tecnico = this.equipos[0].tecnico;
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
    console.log(stage2move);
    switch(stage2move){
      case 0:
        if(this.canreapir){
          //this.servicio.estatus = 'Enviado';
          this.servicio.etapa = 1;
        }else if(this.actnnorepair == this.devolver){
          //this.servicio.estatus = 'En espera cliente recoja';
          this.servicio.etapa = 7;
        }else if(this.actnnorepair == this.resguardo){
          //this.servicio.estatus = 'Resguardo';
          this.servicio.etapa = 2;
        }
        break;      
      case 1:
        //this.servicio.estatus = 'Recibido';
        this.servicio.etapa = 3;
        break;
      case 2:
        this.servicio.etapa = 1;
        break;
      case 3:
        //this.servicio.estatus = 'Diagnosticado';
        this.servicio.etapa = 4;
        break;
      case 4:
        if(this.servicio.cliautoriza){
            //this.servicio.estatus = 'En reaparación';
            this.servicio.etapa = 5;
          }else{
            //this.servicio.estatus = 'Devolución';
            this.servicio.etapa = 7;
          }
        break;
      case 5:
          //this.servicio.estatus = 'Devuelto a TDM';
          this.servicio.etapa = 6;
          break;
        case 6:
          //this.servicio.estatus = 'En espera cliente recoja';
          if(this.servicio.equipoprobado){
            this.servicio.etapa = 7;
          }else{
            this.servicio.etapa = 0;
          }
          
          break;
        case 7:
          //this.servicio.estatus = 'Entregado';
          this.servicio.etapa = 8;
        break;
    }
    this.servicio = this.servicio;
    this._servicioService.updateServicio(this.servicio._id,this.servicio)
        .subscribe(res=>{
          if(res.status=='success'){
            swal('El servicio ha cambiado de estatus','Estatus actualizado','success');
          }
        });
    
    this._router.navigate(['/home']);

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
            this.tecnico = this.equipos[0].tecnico;
          });
    };
  }

  
}
