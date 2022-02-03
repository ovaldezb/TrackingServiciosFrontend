import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { Mercancia } from 'src/app/models/mercancia';
import { ServicioService } from '../../services/servicios.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menuinventario',
  templateUrl: './menuinventario.component.html',
  styleUrls: ['./menuinventario.component.css'],
  providers: [ServicioService]
})
export class MenuinventarioComponent implements OnInit {

  isEntradas:boolean;
  isSalidas:boolean;
  isLista:boolean=true;
  isReporte:boolean;
  isDesgloce:boolean;
  productos:Producto[];
  mercancias:Mercancia[];
  option:string;
  public filtro:string;
  constructor(private _router : Router,
    private _servicioService: ServicioService) { 

    }

  ngOnInit(): void {
    this.getProductos();
    this.getMercanciasDisponible();
  }

  habilita(entrada,salida,lista,reporte,desgloce){
    this.isEntradas = entrada;
    this.isSalidas = salida;
    this.isLista = lista;
    this.isReporte = reporte;
    this.isDesgloce = desgloce;
    if(this.isLista){
      this.getProductos();
      this.getMercanciasDisponible();
    }
  }
  tipoReporte(event){
    if(event==='resumen'){
      this.isLista = true;
      this.isDesgloce = false;
    }else{
      this.isLista = false;
      this.isDesgloce = true;
    }
  }

  getProductos(){
    this._servicioService.getProductos().subscribe((res)=>{
      if(res.status==='success'){
        this.productos = res.productos;
      }
    });
  }

  getMercanciasDisponible(){
    this._servicioService.getMercanciaDisponible()
    .subscribe((res)=>{
      if(res.status==='success'){
        this.mercancias = res.mercancias;
      }
    });
  }

  filtrar(){
    console.log(this.filtro);
  }
}
