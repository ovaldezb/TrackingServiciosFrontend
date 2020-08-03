import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Equipo } from '../../models/equipo';
import { Global } from '../../services/global';
import  swal  from 'sweetalert';

export interface Marcas {
  value: string;
  viewValue: string;
}

export interface Tecnico {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.css']
})
export class EquiposComponent implements OnInit {

  @Output() enviaEquipos = new EventEmitter();

  HighlightRow : number; 
  isEdit:boolean = false;
  public btnAccion:string = 'Agregar';
  public equipo:Equipo;
  public equipos:Equipo[]=[];
  public marcas: Marcas[] = [
    {value: 'Apple', viewValue: 'Apple'},
    {value: 'Bose', viewValue: 'Bose'},
    {value: 'Supermicro', viewValue: 'Supermicro'},
    {value: 'WebDT', viewValue: 'WebDT'}        
  ];

  public tecnicos: Marcas[] = [
    {value: 'Juan Perez', viewValue: 'Juan Perez'},
    {value: 'Marco Martinez', viewValue: 'Marco Martinez'},
    {value: 'Pedro Sanchez', viewValue: 'Pedro Sanchez'},
    {value: 'Armando Aguilar', viewValue: 'Armando Aguilar'}        
  ];

  constructor() { 
    this.equipo = new Equipo('','','','','',0,'','');
  }

  ngOnInit(): void {
  }

  addEquipo():void{
    if(this.isEdit){
      this.equipos[this.HighlightRow] = this.equipo;
      this.isEdit = false;
      this.btnAccion = 'Agregar';
    } else{
      this.equipos.push(this.equipo);      
    }   
    this.equipo = new Equipo('','','','','',0,'','');
    this.enviaEquipos.emit({equipos:this.equipos});
  }

  editEquipo(index):void{
    this.btnAccion = 'Actualizar';
    this.isEdit = true;    
    this.equipo = this.equipos[index];
  }

  eliminarEquipo():void{
    console.log('Eliminar');
    if(this.HighlightRow<0 || this.HighlightRow==null){
      swal('Oops...', 'Debe elegir un equipo!', 'error');
      return;
    }else{
      this.equipos.splice(this.HighlightRow,1);
    }
    
  }

  selectRow(index): void{
    this.HighlightRow = index;
  }

}
