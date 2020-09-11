import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../../services/servicios.service';
import { Router } from '@angular/router';
import { Servicio } from '../../models/servicio';
import { Mensajeria } from '../../models/mensajeria'
import  swal  from 'sweetalert';
import { Global } from '../../services/global';
@Component({
  selector: 'app-envios',
  templateUrl: './envios.component.html',
  styleUrls: ['./envios.component.css'],
  providers:[ServicioService]
})
export class EnviosComponent implements OnInit {

  public url : string;
  public servicios : Servicio[];
  public mensajerias : Mensajeria[];
  public mensajeria : string = '';
  public numeroguia:string ='';
  public costoenvio:number = 0;
  constructor(private _servicioService: ServicioService,private _router : Router,) {
    this.url = Global.url;
  }

  ngOnInit(): void {
    this._servicioService.getservnoenv().subscribe(res => {
      if(res.status == 'success'){
        this.servicios = res.servicios;
      }
    });
    this._servicioService.getMensajerias().subscribe(res =>{
      if(res.status == 'success'){
        this.mensajerias = res.mensajeria;
      }
    });
  }

   onSubmit():void{
    var cnt =0;
    var costxserv = 0;
    this.servicios.forEach(serv =>{
      if(serv.seleccionado) cnt++;
    });

    if(cnt==0){
      swal('Debe seleccionar al menos un servicio','Seleccione un servicio','error');
      return;
    }
    costxserv = Number(this.costoenvio / cnt);
    this.servicios.forEach(serv =>{
      if(serv.seleccionado){
        serv.etapa = 1;
        serv.numeroguia = this.numeroguia;
        serv.costoenvio = costxserv;
        serv.mensajeria = this.mensajeria;
        serv.fechaactualizacion = new Date();
        this._servicioService.updtservngce(serv._id,serv).subscribe(res=>{
          console.log(res);
        });
      }
    });
    swal('Se han actualizado el/los servicio(s)','El/los servicio(s) se han movido de etapa','success');
     this._router.navigate(['/lista']);
  }

}
