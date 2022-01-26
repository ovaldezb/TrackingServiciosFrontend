import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
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
  productos:Producto[];
  constructor(private _router : Router,
    private _servicioService: ServicioService) { 

    }

  ngOnInit(): void {

    this._servicioService.getProductos().subscribe((res)=>{
      if(res.status==='success'){
        this.productos = res.productos;
      }
    });
  }

  habilita(entrada,salida,lista){
    this.isEntradas = entrada;
    this.isSalidas = salida;
    this.isLista = lista;
    if(this.isLista){
      this._servicioService.getProductos().subscribe((res)=>{
        if(res.status==='success'){
          this.productos = res.productos;
        }
      });
    }
  }
}
