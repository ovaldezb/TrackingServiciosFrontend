import { Component, Directive, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import  swal  from 'sweetalert';
import { Servicio } from '../../models/servicio';
import { Equipo } from '../../models/equipo';
import { Etapa } from '../../models/etapa';
import { ServicioService } from '../../services/servicios.service';
import { Global } from '../../services/global';
import { Cliente } from 'src/app/models/cliente';


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
  public listaClientes: Cliente[] = [];
  public cliente:Cliente = new Cliente('','','','');
  public HighlightRow: number = -1;

  garantias: Garantia[] = [
    {value: 'true', viewValue: 'Si'},
    {value: 'false', viewValue: 'No'}
  ];

  constructor(
    private _router : Router,
    private _servicioService: ServicioService
  ) {
    this.servicio = new Servicio('',new Cliente('','','',''),'','','','','',0,null,'','',0,'',0,true,0,'',0,0,true,false,false,'',new Date(),null,'',null,'',0,null,[],false);
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

  buscaCliente(){
    
    this._servicioService.getClientesByName(this.cliente.nombre)
      .subscribe(res=>{
        console.log(res);
        if(res.status=='success'){
          
          this.listaClientes = res.listaClientes;
        }else{
          console.log("error")
        }
      },err=>{
        this.cierraLista();
      });
    
  }

  cierraLista(){
    this.listaClientes = [];
  }

  singleClickRow(index:number){
    this.HighlightRow = index;
  }

  DoubleClickRow(index:number){
   this.cliente = this.listaClientes[this.HighlightRow];
   this.listaClientes = [];
   this.HighlightRow = -1;
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
    //console.log('nuevo '+ flag);
    this.servicio = new Servicio('',new Cliente('','','',''),'','','','','',0,null,'','',0,'',0,true,0,'',0,0,true,false,false,'',new Date(),null,'',null,'',0,null,[],false);
    this.cliente = new Cliente('','','','');
    this.getFolio();
  }

  validaTel(){
    this.errTel = false;
    if(this.cliente.telefono.length != 10 || Number.isNaN(Number(this.cliente.telefono))){
      this.errTel = true;
      this.cliente.telefono = '';
    }
  }

}
