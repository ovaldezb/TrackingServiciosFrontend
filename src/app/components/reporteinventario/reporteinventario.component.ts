import { Component, OnInit } from '@angular/core';
import { Mercancia } from 'src/app/models/mercancia';
import { ServicioService } from 'src/app/services/servicios.service';
import { Router } from '@angular/router';
import {IAngularMyDpOptions,IMyDateModel} from 'angular-mydatepicker';
import swal from 'sweetalert';
@Component({
  selector: 'app-reporteinventario',
  templateUrl: './reporteinventario.component.html',
  styleUrls: ['./reporteinventario.component.css'],
  providers:[ServicioService]
})
export class ReporteinventarioComponent implements OnInit {

  public filtro:string='';
  public mercancias:Mercancia[];
  public highLightRow:number;
  fecIni: IMyDateModel = null;
  fecFin: IMyDateModel = null;
  fechaInicio:Date = new Date();
  fechaFin:Date=new Date();
  locale:string = "es";
  myDpOptions: IAngularMyDpOptions = {
    dateRange: false,
    dateFormat: 'dd/mm/yyyy'
    // other options are here...
  };
  constructor(private _router:Router , 
    private _servicioService: ServicioService) { }
    
  ngOnInit(): void {
    this._servicioService.getMercancias().subscribe((res)=>{
      this.mercancias = res.mercancias;
    },(err)=>{
      console.log(err);
    });
  }

  filtrarResultados(){    
    var td, found, i, j;
    var tabla = (<HTMLTableElement>document.getElementById('tblVentas'));
    for (i = 0; i <tabla.rows.length; i++){
        td = tabla.rows[i].cells;
        for (j = 0; j < td.length; j++) {
            if (td[j].innerHTML.toUpperCase().indexOf(this.filtro.toUpperCase()) > -1) {
                found = true;
            }
        }
        if (found) {
            tabla.rows[i].style.display = "";
            found = false;
        } else {
            tabla.rows[i].style.display = "none";
        }
    }
  }
  buscaPorFechas(){
  if(this.fecIni === null && this.fecFin === null){
      swal('Para hacer una búsqueda por fecha, debe ingresar al menos una','Fail','error');
      return;
    }
    
    this._servicioService.getMercVendidaByRangoFechas(this.fecIni===null?null:this.fechaInicio,this.fecFin===null?null:this.fechaFin)
    .subscribe((res)=>{
      console.log(res);
      if(res.mercancias.length > 0){
        this.mercancias = res.mercancias;
      }
    },(err)=>{
      console.log(err);
    });
  }

  onDateChangedIni(event: IMyDateModel): void {
    this.fechaInicio.setDate(event.singleDate.date.day);
    this.fechaInicio.setMonth(event.singleDate.date.month-1);
    this.fechaInicio.setFullYear(event.singleDate.date.year);
  }
  onDateChangedFin(event: IMyDateModel): void {
    this.fechaFin.setDate(event.singleDate.date.day);
    this.fechaFin.setMonth(event.singleDate.date.month-1);
    this.fechaFin.setFullYear(event.singleDate.date.year);
    
  }
  selectRow(index){
    this.highLightRow = index;
  }

}
