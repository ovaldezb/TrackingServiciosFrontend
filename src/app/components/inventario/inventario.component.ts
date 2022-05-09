import { Component, OnInit, Input } from '@angular/core';
import { ServicioService } from '../../services/servicios.service';
import { Producto } from 'src/app/models/producto';
import { Mercancia } from 'src/app/models/mercancia';
import { Marca } from 'src/app/models/marca';
import { Familia } from 'src/app/models/familia';
import { Router, ActivatedRoute } from '@angular/router';
import  swal  from 'sweetalert';
import {IAngularMyDpOptions,IMyDateModel} from 'angular-mydatepicker';
import { Eqinvent } from 'src/app/models/eqinvent';

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
  @Input() idproducto: string;
  public producto: Producto;
  public stock:number;
  fechaCompra: IMyDateModel = null;
  public isSubmit:boolean = true;
  locale:string="es";
  equipoinventario: Eqinvent[];
  cantMercCapturar:number;
  element: HTMLElement;
  //mercancias:Mercancia[];
  marcas:Marca[];
  familias:Familia[];
  bodegas: Bodega[];
  estados: Estado[] = [
    {value:'Nuevo', viewValue:'Nuevo'},
    {value:'Usado',viewValue:'Usado'},
    {value:'Reconstruido', viewValue:'Reconstruido'}
  ];
  myDpOptions: IAngularMyDpOptions = {
    dateRange: false,
    dateFormat: 'dd/mm/yyyy'
    // other options are here...
  };
  constructor(private _router : Router,
    private _servicioService: ServicioService) { 
      this.producto = new Producto("","","","","","","",0);
      this.mercancia = new Mercancia("",null,"","","",0,0,null,"","",0,"","",null,"",0,null,"","");
      
  }

  ngOnInit(): void {
    this.producto = new Producto("","","","","","","",0);
    this.mercancia = new Mercancia("",null,"","","",0,0,null,"","",0,"","",null,"",0,null,"","");
    this.equipoinventario = new Array();
    if(this.idproducto != undefined){
      this._servicioService.getMercanciaByProductoId(this.idproducto).subscribe(res=>{
        if(res.status === 'success'){
          this.producto = res.mercancias[0].producto;
          this.mercancia = res.mercancias[0];
          this.cantMercCapturar = res.mercancias.length;
          let index = 0;
          this.isSubmit = false;
          res.mercancias.forEach((merc: Mercancia) => {
            this.equipoinventario.push(new Eqinvent(merc._id,index++,merc.serie.toString()))
          });
        }
      });
      this.idproducto = null;
    }else{
      const eqInvent = new Eqinvent(null,0,"");
      this.equipoinventario.push(eqInvent);
      this.cantMercCapturar = 1;
    }
    this.getMarcas();
    this.getFamilias();
    this._servicioService.getBodegas()
    .subscribe((res)=>{
      if(res.status==='success'){
        this.bodegas = res.bodegas;
      }
    });
  }

  getMarcas(){
    this._servicioService.getMarcas()
    .subscribe((res)=>{
      if(res.status === "success"){
        this.marcas = res.marcas;
      }
    });
  }

  getFamilias(){
    this._servicioService.getFamilias()
    .subscribe((res)=>{
      if(res.status === "success"){
        this.familias = res.familias;
      }
    });
  }

  async nuevaMercancia(event){
      if(this.equipoinventario.length == 0){
        swal("Necesita capturar al menos un No de Serie");
        return;
      }
      this.stock = this.producto.stock;
      this.producto.stock = this.producto.stock + this.equipoinventario.length;
      var servrec = await this._servicioService.createProducto(this.producto).toPromise();
      if(servrec.status == 'success'){
        for(let i=0;i<this.equipoinventario.length;i++){
          var numeroSerie = this.equipoinventario[i].serie;
          this.mercancia.serie = numeroSerie=='' ? 'NA' : numeroSerie;
          this.mercancia.producto = servrec.productoSaved;
          this.mercancia.capturoEntrada = localStorage.getItem('usuario');
          if(this.stock < 0 ){
            this.stock++;
            this._servicioService.createIncreasePendiente(this.mercancia)
            .subscribe((res)=>{
              
            });
          }else{
            this._servicioService.createMercancia(this.mercancia)
            .subscribe((res)=>{
              //console.log(res);
            },
            (err=>{
              swal('Hubo un error al guardar el Producto','Error','error');  
              return;
            }));
          }
        }
        swal('Se ha creado el Producto exitosamente','Felicidades!','success');  
        this.limpiarForma();
      }  
  }

  async actualizarMercancia(event){
    if(this.equipoinventario.length == 0){
      swal("Necesita capturar al menos un No de Serie");
      return;
    }
    this.stock = this.producto.stock;
    this.producto.stock = this.equipoinventario.length;
    var servrec = await this._servicioService.updateProducto(this.producto).toPromise();
    
    if(servrec.status == 'success'){
      for(let i=0;i<this.equipoinventario.length;i++){
        var numeroSerie = this.equipoinventario[i].serie;
        this.mercancia._id = this.equipoinventario[i]._id;
        this.mercancia.serie = numeroSerie=='' ? 'NA' : numeroSerie;
        this.mercancia.producto = servrec.productSaved;
        this.mercancia.capturoEntrada = localStorage.getItem('usuario');
        if(this.stock < 0 ){
          this.stock++;
          this._servicioService.createIncreasePendiente(this.mercancia)
          .subscribe((res)=>{
            
          });
        }else{
          if(this.equipoinventario[i]._id != undefined){
            this._servicioService.updateMercancia(this.mercancia)
            .subscribe((res)=>{
              //console.log(res);
            },
            (err=>{
              swal('Hubo un error al actualizar el Producto','Error','error');  
              return;
            }));
          }else{
            this._servicioService.createMercancia(this.mercancia)
          .subscribe((res)=>{
            //console.log(res);
          },
          (err=>{
            swal('Hubo un error al crear el Producto','Error','error');  
            return;
          }));
          }
        }
      }
      swal('Se ha actualizado el Producto exitosamente','Felicidades!','success');  
      this.limpiarForma();
    }
  }

  changeCantCapturar(event){
    if(event.target.value <= 0 ){
      swal("El mínimo requerido de Números de Serie es 1");
      this.cantMercCapturar = 1;
      return;
    }
    if(event.target.value > this.equipoinventario.length){
      for(let i=this.equipoinventario.length; i<event.target.value;i++ ){
        let eqInvent = new Eqinvent(null,i,"");
        this.equipoinventario.push(eqInvent);
      }
    }else if(event.target.value < this.equipoinventario.length){
      for(let i=this.equipoinventario.length; i > Number(event.target.value);i-- ){
        this.equipoinventario.splice(i-1,1);
      }
    }
  }

  buscaProducto(){
    this._servicioService.getProductoByNoParte(this.producto.noParte).subscribe((res)=>{
      this.producto = res.producto;
    },(err)=>{
      swal("No se encontro un producto con ese número de parte");
    });
  }
  onDateChanged(event: IMyDateModel): void {
    this.mercancia.fechaCompra = event.singleDate.jsDate;
  }

  limpiarForma(){
    this.cantMercCapturar = 1;
    this.producto = new Producto("","","","","","","",0);
    this.mercancia = new Mercancia("",null,"","","",0,0,null,"","",0,"","",null,"",0,null,"","");
    this.equipoinventario = new Array();
    const eqInvent = new Eqinvent(null,0,"");
    this.equipoinventario.push(eqInvent);
    this.cantMercCapturar = 1;
    this.isSubmit = true;
  }
  
}
