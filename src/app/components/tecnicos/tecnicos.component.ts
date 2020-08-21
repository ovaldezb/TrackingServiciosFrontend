import { Component, OnInit } from '@angular/core';
import { Tecnico } from '../../models/tecnico';
import { Router, ActivatedRoute, Params } from '@angular/router';
import  swal  from 'sweetalert';
import { ServicioService } from '../../services/servicios.service';
import { Global } from '../../services/global';

export interface Rol {
  value: string;
  viewValue: string;
}

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
  public roles: Rol[] = [
    {value: '0', viewValue: 'Administrador'},
    {value: '1', viewValue: 'Técnico'}
  ];
  
  constructor(private _router : Router,
    private _servicioService: ServicioService) {
      this.tecnico = new Tecnico('','','','','',false,'','','0','');
      this.url = Global.url;
     }

  ngOnInit(): void {
    this._servicioService.getTecnicos(false).subscribe(res=>{
      if(res.tecnicos.length > 0){
        this.tecnicos = res.tecnicos;
        this.tecnicos.forEach(tecnico =>{
          tecnico.rolnombre = this.roles[tecnico.rol].viewValue;
        });
      }
    });
  }

  editTecnico(index):void{
    this.btnAccion = 'Actualizar';
    this.isEdit = true;
    this.tecnico = this.tecnicos[index];
    this.tecnico.password = '';
  }

  selectRow(index): void{
    this.HighlightRow = index;
  }

  onSubmit():void{
    if(!this.isEdit){
      this._servicioService.createTecnico(this.tecnico)
        .subscribe(res =>{
          if(res.status=='success'){
            this.tecnico = res.tecnico;
            this.tecnico.password = '';
            this.tecnico.rolnombre = this.roles[this.tecnico.rol].viewValue;
            this.tecnicos.push(this.tecnico);
            swal('Se ha creado el Técnico exitosamente','Felicidades!','success');
          }
        });
    }else{
      var tecnicoTmp = this.tecnico;
      if(this.tecnico.password == ''){
        delete tecnicoTmp.password;
      }
      this._servicioService.updateTecnico(tecnicoTmp._id,tecnicoTmp)
        .subscribe(res =>{
          if(res.status=='success'){
            swal('Se ha actualizado el Técnico exitosamente','Felicidades!','success');
            this.tecnico = new Tecnico('','','','','',false,'','',null,'');
            this.isEdit = false;
            this.btnAccion = 'Enviar';
          }
        });
    }    
  }

  changerol(event):void{
    this.tecnico.rolnombre = this.roles[event.target.options.selectedIndex-1].viewValue;
  }

}
