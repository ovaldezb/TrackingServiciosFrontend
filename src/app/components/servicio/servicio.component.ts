import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import  swal  from 'sweetalert';
import { Servicio } from '../../models/servicio';
import { Equipo } from '../../models/equipo';
import { Etapa } from '../../models/etapa';
import { ServicioService } from '../../services/servicios.service';
import { Global } from '../../services/global';


export interface Garantia {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.css'],
  providers:[ServicioService]
})
export class ServicioComponent implements OnInit {

  public servicio : Servicio;
  public url: string;
  public showGarantia:boolean;
  equipos: Equipo[] = [];
  etapas: Etapa[] = [];
  public errTel: Boolean = false;

  garantias: Garantia[] = [
    {value: 'true', viewValue: 'Si'},
    {value: 'false', viewValue: 'No'}
  ];

  constructor(
    private _router : Router,
    private _servicioService: ServicioService
  ) {
    this.servicio = new Servicio('','','','','','',0,null,'','',0,'',0,true,0,'',0,0,true,false,false,'',new Date(),null,'',null,'',0,null,[]);
    this.url = Global.url;
  }

  ngOnInit(): void {
    this.getFolio();
    this._servicioService.getetapas().subscribe(
      res=>{
      if(res.status=="success"){
        this.etapas = res.etapas;
      }
    });
  }

  getFolio(){
    this._servicioService.getFolio()
        .subscribe(
          res =>{
            if(res.status == 'success'){
              this.servicio.folio = res.folio;
            }
          }
        );
  }

  recFolio(event):void{
    this.servicio.folio = event.folio;
  }

  nuevoServicio(){
    this.servicio = new Servicio('','','','','','',0,null,'','',0,'',0,true,0,'',0,0,true,false,false,'',new Date(),null,'',null,'',0,null,[]);
    this.getFolio();
  }

  validaTel(){
    this.errTel = false;
    if(this.servicio.telefono.length != 10 || Number(this.servicio.telefono)==NaN){
      this.errTel = true;
      this.servicio.telefono = '';
    }
  }

}
