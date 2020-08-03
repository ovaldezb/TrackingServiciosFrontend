import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
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

  garantias: Garantia[] = [
    {value: 'true', viewValue: 'Si'},
    {value: 'false', viewValue: 'No'}    
  ];

  constructor(
    private _router : Router,
    private _servicioService: ServicioService
  ) { 
    this.servicio = new Servicio('','','','','','',0,'false','','',0,'',0,true,0,'',0,0,true,false,false);
    this.url = Global.url;    
  }

  ngOnInit(): void {     
    this._servicioService.getFolio()
        .subscribe(
          res =>{
            if(res.status == 'success'){
              this.servicio.folio = res.folio;
            }
          }
        );
    this._servicioService.getetapas().subscribe(
      res=>{
      if(res.status=="success"){
        this.etapas = res.etapas;        
      }
    });
  }

  onSubmit(){    
    this._servicioService.create(this.servicio)
        .subscribe(
          res => {
            if(res.status == 'success'){
              var id_servicio = res.servicio._id;
              for(var i=0;i<this.equipos.length;i++){
                var equi = this.equipos[i];
                equi.id_servicio = id_servicio;
                this._servicioService.createEquipo(equi)
                    .subscribe(
                      resp => {
                        console.log(resp);
                      });
              }
              this.servicio.estatus = this.etapas[this.servicio.etapa].nombre;
              swal('Servicio creado',
                'El Servicio fue creado exitosamente',
                'success'
              );
              this._router.navigate(['/home']);
            }
          }
        );
  }

  recibeEquipos(event){
    this.equipos = event.equipos;    
  }

}
