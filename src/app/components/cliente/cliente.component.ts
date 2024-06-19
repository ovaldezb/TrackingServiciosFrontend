import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente';
import { ServicioService } from 'src/app/services/servicios.service';
import  swal from 'sweetalert';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css'],
  providers:[ServicioService]
})
export class ClienteComponent implements OnInit {

  public listaClientes : Cliente[] = [];
  public cliente : Cliente = new Cliente('','','','');
  public HighlightRow: number = -1;
  public accion:string = 'Agregar';
  public filtro:string='';
  constructor(private _servicioService:ServicioService) { }

  ngOnInit(): void {
    this.getAllClientes();
  }

  getAllClientes(){
    this._servicioService.getAllClientes()
    .subscribe(res=>{
      if(res.status=='success'){
        this.listaClientes = res.listaClientes;
      }
    })
  }

  agregaActualizaCliente(){
    if(this.accion === 'Agregar'){
      this.agregaCliente();
    }else{
      this.actualizaCliente();
    }
  }

  agregaCliente(){
    swal({
      title: "Esta seguro que desea hacer agregar a este cliente ",
      text: this.cliente.nombre+"",
      icon: "warning",
      buttons: [true,true],
      dangerMode: true,
    })
    .then((willAdd) => {
      if (willAdd) {
        this._servicioService.guardaCliente(this.cliente)
        .subscribe(res=>{
          if(res.status==="success"){
            swal('Cliente creado',
            'El Cliente fue creado exitosamente',
            'success');
            this.getAllClientes();
            this.limpiar();
          }
        });
      }
    });
  }

  actualizaCliente(){
    swal({
      title: "Esta seguro que desea actualizar este cliente ",
      text: this.cliente.nombre+"",
      icon: "warning",
      buttons: [true,true],
      dangerMode: true,
    })
    .then((willAdd) => {
      if (willAdd) {
        this._servicioService.actualizaCliente(this.cliente)
        .subscribe(res=>{
          if(res.status==="success"){
            swal('Cliente actualizado',
            'El Cliente se actualizo exitosamente',
            'success');
            this.getAllClientes();
            this.limpiar();
            this.accion ="Agregar";
          }
        });
      }
    });
  }

  seleccionaCliente(index){
    this.HighlightRow = index;
    this.cliente = this.listaClientes[index];
    this.accion = "Actualizar";
  }

  filtraCliente(){
    var td, found, i, j;
    var tabla = (<HTMLTableElement>document.getElementById('tblClientes'));
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

  limpiar(){
    this.HighlightRow = -1;
    this.accion = "Agregar";
    this.cliente = new Cliente('','','','');
  }

}
