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
    this.servicio = new Servicio('','','','','','',0,null,'','',0,'',0,true,0,'',0,0,true,false,false,'',new Date(),null,'',null,'',0,null);
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

  async onSubmit(){    
    this.servicio.fechaactualizacion = new Date();
    var servrec = await this._servicioService.create(this.servicio).toPromise();    
    if(servrec.status == 'success'){      
      for(var i=0;i<this.equipos.length;i++){
        var equi = this.equipos[i];
        var serUpdt = await this._servicioService.createEquipo(equi,servrec.servicio._id).toPromise();            
      }        
      console.log(serUpdt);
      if(this.servicio.correo != ''){              
        this._servicioService.enviaCorreoInicial(serUpdt.serviceUpdate)
          .subscribe(res=>{
            console.log(res);
          });
      }
      swal('Servicio creado',
        'El Servicio fue creado exitosamente',
        'success'
      );
      this._router.navigate(['/lista']);
      
    }
        /*.subscribe(
          res => {
            if(res.status == 'success'){
              var id_servicio = res.servicio._id;
              for(var i=0;i<this.equipos.length;i++){
                var equi = this.equipos[i];
                equi.id_servicio = id_servicio;
                this._servicioService.createEquipo(equi)
                    .subscribe(
                      resp => {
                        //console.log(resp);
                      });
              }
              this.servicio = res.servicio;
              this.servicio.estatus = this.etapas[this.servicio.etapa].nombre;
              if(this.servicio.correo != ''){              
                this._servicioService.enviaCorreoInicial(this.servicio)
                  .subscribe(resp=>{
                    console.log(res);
                  });
              }
              swal('Servicio creado',
                'El Servicio fue creado exitosamente',
                'success'
              );
              this._router.navigate(['/lista']);
            }
          }
        );*/
  }

  recibeEquipos(event){
    this.equipos = event.equipos;    
  }

}
