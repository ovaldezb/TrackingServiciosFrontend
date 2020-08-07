import { Component, OnInit } from '@angular/core';
import { Tecnico } from '../../models/tecnico';
import { Router, ActivatedRoute, Params } from '@angular/router';
import  swal  from 'sweetalert';
import { ServicioService } from '../../services/servicios.service';
import { Global } from '../../services/global';

@Component({
  selector: 'app-tecnicos',
  templateUrl: './tecnicos.component.html',
  styleUrls: ['./tecnicos.component.css'],
  providers:[ServicioService]
})
export class TecnicosComponent implements OnInit {

  HighlightRow : number; 
  public url:string;
  public btnAccion:string = 'Enviar';
  public isEdit:boolean = false;
  public tecnicos: Tecnico[]=[];
  public tecnico: Tecnico;
  
  constructor(private _router : Router,
    private _servicioService: ServicioService) {
      this.tecnico = new Tecnico('','','','','',false,'');
      this.url = Global.url;
     }

  ngOnInit(): void {
    this._servicioService.getTecnicos().subscribe(res=>{
      if(res.tecnicos.length > 0){
        this.tecnicos = res.tecnicos;
      }
    });
  }

  editTecnico(index):void{
    this.btnAccion = 'Actualizar';
    this.isEdit = true;    
    this.tecnico = this.tecnicos[index];
  }

  selectRow(index): void{
    this.HighlightRow = index;
  }

  onSubmit():void{
    if(!this.isEdit){
      this._servicioService.createTecnico(this.tecnico)
        .subscribe(res =>{
          if(res.status=='success'){
            swal('Se ha creado el Técnico exitosamente','Felicidades!','success');
          }
        });
    }else{
      this._servicioService.updateTecnico(this.tecnico._id,this.tecnico)
        .subscribe(res =>{
          if(res.status=='success'){
            swal('Se ha actualizado el Técnico exitosamente','Felicidades!','success');
            this.tecnico = new Tecnico('','','','','',false,'');
            this.isEdit = false;
            this.btnAccion = 'Enviar';
          }
        });
    }
    
  }

}
