import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../../services/servicios.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Producto } from 'src/app/models/producto';
import { Mercancia } from 'src/app/models/mercancia';
import * as moment from 'moment';
import  swal  from 'sweetalert';

export interface MotivoSalida{
  value:string,
  valueView:string
}
export interface FiltroBusqueda{
  value:string,
  valueView:string
}
@Component({
  selector: 'app-salidainventario',
  templateUrl: './salidainventario.component.html',
  styleUrls: ['./salidainventario.component.css'],
  providers: [ServicioService]
})
export class SalidainventarioComponent implements OnInit {

  public descripcion:String;
  public mercancia:Mercancia;
  public productos:Producto[];
  public mercancias:Mercancia[];
  public mercanciaSalida:Mercancia[];
  public HighlightRow : number;
  public HighlightRowMerc : number;
  public motivoSelect:String;
  public isEquipo:boolean;
  public nombreEquipo:string;
  public tiempoGarantia:number;
  public fechaVenceGarantia:string;
  public fechaVenceGarantiaSave:Date;
  public cliente:string="";
  public facturaVenta:string="";
  public observaciones:string="";
  public filtro:string='noParte';
  motivos:MotivoSalida[]=[
    {value:'Venta',valueView:'Venta'},
    {value:'Garantia',valueView:'Garantia'},
    {value:'Obsoleto',valueView:'Obsoleto'},
  ];
  filtroBusquedas:FiltroBusqueda[]=[
    {value:'marca',valueView:'Marca'},
    {value:'modelo',valueView:'Modelo'},
    {value:'familia',valueView:'Familia'},
    {value:'noParte',valueView:'NoParte'}
  ];
  constructor(private _router : Router,
    private _servicioService: ServicioService) { }

  ngOnInit(): void {
    this.productos = new Array();
    this.mercancias = new Array();
    this.mercanciaSalida = new Array();
    this.isEquipo=false;
    this.nombreEquipo="";
    this.tiempoGarantia = 0;
    this.fechaVenceGarantia = "";
  }

  buscaProductoByCaracteristica(event){
    this._servicioService.getMercanciaByNoSerie(this.filtro,this.descripcion).subscribe((res)=>{
      this.productos = res.productos;
      this.mercancias = [];
    },
    (err)=>{
      this.productos = [];
      this.mercancias = [];
    });
  }

  ClickedRow(index) : void{
    this.HighlightRow = index;
    this._servicioService.getMercanciaByProductoId(this.productos[index]._id).subscribe((res)=>{
      if(res.status==='success'){
        if(this.mercanciaSalida.length > 0){
          this.mercancias = this.filtrar(res.mercancias, this.mercanciaSalida);
        }else{
          this.mercancias = res.mercancias;
        }
      }
    });
  }

  filtrar(array1,array2){
    const filtradoIndex = new Array();
    for(var i=0;i<array1.length;i++){
      for(var j=0;j<array2.length;j++){
        if(array1[i]._id === array2[j]._id){
          filtradoIndex.push(i);
        }
      }
    }
    
    for(var i=filtradoIndex.length-1;i>=0;i--){
      array1.splice([filtradoIndex[i]],1);
    }
    return array1;
  }

  clickedRowMercancia(index){
    this.HighlightRowMerc = index;
  }

  seleccionaMercancia(index){

    this.mercanciaSalida.push(this.mercancias[index]);
    this.mercancias.splice(index,1);
    this.HighlightRowMerc = -1;
    this.HighlightRow = -1;
  }

  calculaGarantia(){
    var hoy = new Date();
    hoy.setMonth(hoy.getMonth() + this.tiempoGarantia);
    const momento = moment(hoy);
    this.fechaVenceGarantia = momento.format('DD-MMM-yyyy');
    this.fechaVenceGarantiaSave = momento.toDate();
  }

  eliminaMercancia(index){
    this.mercanciaSalida.splice(index,1);
  }

  submit(){
    for(var i=0;i<this.mercanciaSalida.length;i++){
      let costoVenta = (<HTMLInputElement>document.getElementById("mercancia"+i)).value;
      if(costoVenta===''){
        swal('El producto '+(i+1)+' no tiene precio de venta','Favor de Capturar','error');
        return;
      }
    }

    for(var i=0;i<this.mercanciaSalida.length;i++){
      let costoVenta = (<HTMLInputElement>document.getElementById("mercancia"+i)).value;
      let mercancia = this.mercanciaSalida[i];
      mercancia.precioVenta = Number(costoVenta);
      mercancia.capturoSalida = localStorage.getItem('usuario');
      mercancia.noFacturaVenta = this.facturaVenta;
      mercancia.fechaVenta = new Date();
      mercancia.cliente = this.cliente;
      mercancia.tiempoGarantia = this.tiempoGarantia;
      mercancia.fechaVencimientoGarantia = this.fechaVenceGarantiaSave;
      mercancia.motivo = this.motivoSelect;
      mercancia.observaciones = this.observaciones;
      if(mercancia.serie===''){
        this._servicioService.createPendiente(mercancia).subscribe((res)=>{
          console.log(res);
        },(err)=>{
          console.log(err);
          swal('Error al guardar la venta','Error','error');
        });
      }else{
        this._servicioService.createMercanciaVendida(mercancia).subscribe((res)=>{
          },
          (err)=>{
          console.log(err);
          swal('Error al guardar la venta','Error','error');
        });
      }
    }
    swal('Se guardo exitosamente la salida','Felicidades!!','success');
    this.cleanAll();
  }

  agregarSinExistencia(){
    this.mercancia = new Mercancia(null,null,"","","",0,0,null,"","",0,"","",null,"",0,null,"","");
    this.mercancia.producto = this.productos[this.HighlightRow];
    console.log(this.mercancia);
    this.mercanciaSalida.push(this.mercancia);
  }

  cleanAll(){
    this.facturaVenta="";
    this.cliente="";
    this.tiempoGarantia=0;
    this.fechaVenceGarantiaSave = new Date();
    this.motivoSelect = '';
    this.observaciones = '';
    this.mercanciaSalida = [];
    this.productos=[];
    this.mercancias=[];
  }
}
