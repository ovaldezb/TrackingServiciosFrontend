import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../../services/servicios.service';
import { Global } from '../../services/global';
import { Producto } from 'src/app/models/producto';
import { Mercancia } from 'src/app/models/mercancia';
import { Router, ActivatedRoute } from '@angular/router';
import  swal  from 'sweetalert';


export interface Bodega {
  value: string;
  viewValue: string;
}

export interface Estado {
  value: string;
  viewValue: string;
}
export interface CantCapture{
  value:number
}
@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css'],
  providers:[ServicioService]
})
export class InventarioComponent implements OnInit {
  public mercancia:Mercancia;
  public producto: Producto;
  helperArray: Array<any>;
  cantMercCapturar:number;
  element: HTMLElement;
  bodegas: Bodega[] =[
    {value:'Toluca', viewValue:'Toluca'},
    {value:'CDMX',viewValue:'CDMX'}
  ];
  estados: Estado[] = [
    {value:'Nuevo', viewValue:'Nuevo'},
    {value:'Usado',viewValue:'Usado'},
    {value:'Reconstruido', viewValue:'Reconstruido'}
  ];
  constructor(private _router : Router,
    private _servicioService: ServicioService) { 
      this.producto = new Producto("","","","","","","",0);
      this.mercancia = new Mercancia("","","",null,0,false,"","",null);
      
  }

  ngOnInit(): void {
    this.helperArray = new Array();
    this.helperArray.push(0);
    this.cantMercCapturar = 1;
  }


  async nuevaMercancia(event){
    if(this.helperArray.length == 0){
      swal("Necesita capturar al menos un No de Serie");
      return;
    }
    this.producto.stock = this.producto.stock + this.helperArray.length;
    var servrec = await this._servicioService.createProducto(this.producto).toPromise();
    if(servrec.status == 'success'){
      for(let i=0;i<this.helperArray.length;i++){
        var element = (<HTMLInputElement>document.getElementById("noSerie"+i)).value
        this.mercancia.serie = element;
        this.mercancia.producto = servrec.productoSaved;
        this._servicioService.createMercancia(this.mercancia)
        .subscribe((res)=>{
          //console.log(res);
        },
        (err=>{
          console.log(err);
          swal('Hubo un error al guardar el Producto','Error','error');  
          return;
        }));
      }
      swal('Se ha creado el Producto exitosamente','Felicidades!','success');  
      this.producto = new Producto("","","","","","","",0);
      this.mercancia = new Mercancia("","","",null,0,false,"","",null);
      for(let i=0;i<this.helperArray.length;i++){
        (<HTMLInputElement>document.getElementById("noSerie"+i)).value = '';
      }
      this.helperArray = new Array();
      this.helperArray.push(0);
      this.cantMercCapturar = 1;
    }  
  }

  changeCantCapturar(event){
    this.helperArray = new Array();
    if(event.target.value <= 0 ){
      swal("El mínimo requerido de Números de Serie es 1");
      this.cantMercCapturar = 1;
      this.helperArray.push(0);
      return;
    }
    
    for(let i=0; i<event.target.value;i++ ){
      this.helperArray.push(i);
    }
  }

  buscaProducto(){
    this._servicioService.getProductoByNoParte(this.producto.noParte).subscribe((res)=>{
      this.producto = res.producto;
    },(err)=>{
      swal("No se encontro un producto con ese número de parte");
    });
  }

  limpiarForma(){
    this.helperArray = new Array();
    this.helperArray.push(0);
    this.cantMercCapturar = 1;
    this.producto = new Producto("","","","","","","",0);
    this.mercancia = new Mercancia("","","",null,0,false,"","",null);
  }
  
}
