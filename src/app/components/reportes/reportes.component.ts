import { Component, OnInit } from '@angular/core';
import {ServicioService} from '../../services/servicios.service';
import { Servicio } from '../../models/servicio';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css'],
  providers:[ServicioService]
})
export class ReportesComponent implements OnInit {

  public tipo:string;
  public servicios:Servicio[];
  constructor(private _servicioService:ServicioService) { }

  ngOnInit(): void {
  }


  async enviar(){
    if(this.tipo=="html"){
      var respEtapas = await this._servicioService.getetapas().toPromise();
      this._servicioService.getreportehtml().subscribe(res=>{
        if(res.status="success"){
          this.servicios = res.servicios;
          this.servicios.forEach(servicio =>{
            servicio.estatus = respEtapas.etapas[servicio.etapa].nombre;
          });
        }      
      });
    }else if(this.tipo=="xls"){
      this.servicios = [];
      this._servicioService.getreportexls().subscribe(res=>{
        var fecha = new Date();        
        var fechaNombArchivo = fecha.getFullYear()+'-'+(fecha.getMonth()+1) +'-'+fecha.getDate()+'_'+fecha.getHours()+'-'+fecha.getMinutes()+'-'+fecha.getSeconds()+'.xlsx';
        console.log(fechaNombArchivo);
        let blob = new Blob([res], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});        
        saveAs(blob, fechaNombArchivo);
      });
    }
    
  }
}
