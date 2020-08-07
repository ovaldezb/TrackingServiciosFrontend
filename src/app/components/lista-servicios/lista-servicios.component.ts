import { Component, OnInit, Input } from '@angular/core';
import { Servicio } from '../../models/servicio';
import { Global } from '../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ServicioService } from '../../services/servicios.service';
import { Etapa } from '../../models/etapa';

@Component({
  selector: 'app-lista',
  templateUrl: './lista-servicios.component.html',
  styleUrls: ['./lista-servicios.component.css'],
  providers:[ServicioService]
})
export class ListaServiciosComponent implements OnInit {
  HighlightRow : Number;    
  //ClickedRow:any;  
  public servicios: Servicio[];
  public url: string;
  private etapas: Etapa[];
  constructor(private _router : Router, private _servicioService: ServicioService) {     
    this.url = Global.url;    
  }

  ngOnInit(): void {
    this._servicioService.getServicios().subscribe(
      res =>{        
        if(res.servicios){
          this.servicios = res.servicios;
          this._servicioService.getetapas().subscribe(
            res=>{
            if(res.status=="success"){
              this.etapas = res.etapas;
              this.servicios.forEach(servicio =>{                
                servicio.estatus = this.etapas[servicio.etapa].nombre;
              });
            }
          });          
        }
      }
    );
    
    
  }

  ClickedRow(index) : void{      
    this.HighlightRow = index; 
  }

  DoubleClickRow(index):void{    
    this._router.navigateByUrl('/movserv',{ state: this.servicios[index] });        
  }

}
