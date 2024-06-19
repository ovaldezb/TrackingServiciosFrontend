import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Equipo } from '../../models/equipo';
import { Tecnico } from '../../models/tecnico';
import { Global } from '../../services/global';
import { ServicioService } from '../../services/servicios.service';
import  swal  from 'sweetalert';
import { Servicio } from 'src/app/models/servicio';
import { Cliente } from 'src/app/models/cliente';

export interface Marcas {
  value: string;
  viewValue: string;
}
export interface Garantia {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.css'],
  providers:[ServicioService]
})
export class EquiposComponent implements OnInit {

  @Input() servicio : Servicio;
  @Input() cliente: Cliente;
  @Output() recFolio = new EventEmitter();
  url:string;
  HighlightRow : number;
  isEdit:boolean = false;
  public btnAccion:string = 'Agregar Equipo';
  public imageActive:boolean = false;
  public imgPath:string = "";
  public equipo:Equipo;
  private folio: string;
  public equipos:Equipo[]=[];
  public tecnicos:Tecnico[];
  private tieneGarantia:string;
  public costoRev:number;
  garantias: Garantia[] = [
    {value: 'true', viewValue: 'Si'},
    {value: 'false', viewValue: 'No'}
  ];

   public imgname:string;
   public imgIndex:number;


  constructor(private _servicioService:ServicioService) {
    this.equipo = new Equipo('','',null,'','',0,null,'',[],[],'','','');
    this.url = Global.url;
  }

  ngOnInit(): void {
    this._servicioService.getTecnicos(true)
    .subscribe(res=>{
      if(res.status == 'success'){
        this.tecnicos = res.tecnicos;
      }
    });
  }

  addEquipo():void{
    if(this.isEdit){
      this.equipos[this.HighlightRow] = this.equipo;
      this.isEdit = false;
      this.btnAccion = 'Agregar Equipo';
    } else{
      this.equipos.push(this.equipo);
      this.tieneGarantia = this.servicio.esgarantia;
      this.costoRev = this.servicio.costorevision;
      this.servicio.esgarantia = this.garantias[0].value;
      this.servicio.costorevision = 0;
    }
    this.equipo = new Equipo('','',null,'','',0,null,'',[],[],'','','');
  }

  editEquipo(index):void{
    this.btnAccion = 'Actualizar Equipo';
    this.isEdit = true;
    this.equipo = this.equipos[index];
  }

  eliminarEquipo():void{
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

  async onSubmit(){
    this.servicio.fechaactualizacion = new Date();
    this.servicio.esgarantia = this.tieneGarantia;
    this.servicio.costorevision = this.costoRev;
    this.servicio.cliente = this.cliente.nombre;
    this.servicio.telefono = this.cliente.telefono;
    this.servicio.correo = this.cliente.correo;
    if(this.cliente._id === "" || this.cliente._id === undefined){
      var nuevoCliente = await this._servicioService.guardaCliente(this.cliente).toPromise();
      this.servicio.clienteId = nuevoCliente.clienteSaved;
    }else{
      this.servicio.clienteId = this.cliente;
    }
    var servrec = await this._servicioService.create(this.servicio).toPromise();
    if(servrec.status == 'success'){
      for(var i=0;i<this.equipos.length;i++){
        var equi = this.equipos[i];
        if(this.equipos.length==1){
          equi.folioequipo = servrec.servicio.folio;
        }else{
          equi.folioequipo = servrec.servicio.folio+'-'+(i+1);
        }
        var serUpdt = await this._servicioService.createEquipo(equi,servrec.servicio._id).toPromise();
      }
      if(this.cliente.correo != ''){
        this._servicioService.enviaCorreoInicial(serUpdt.serviceUpdate)
          .subscribe(res=>{
         });
      }
      swal('Servicio creado',
        'El Servicio fue creado exitosamente',
        'success'
      );
      this.equipos = [];
      this.equipo = new Equipo('','',null,'','',0,null,'',[],[],'','','');
      this.getFolio();
    }
  }

  getFolio(){
    this._servicioService.getFolio()
        .subscribe(
          res =>{
            if(res.status == 'success'){
              this.folio = res.folio;
              this.recFolio.emit({folio:this.folio});
            }
          }
        );
  }


  closeModal(){
    this.imageActive = false;
  }

  changetecnico(event):void{
    this.equipo.nombretecnico = this.tecnicos[event.target.options.selectedIndex-1].nombre + ' ' +this.tecnicos[event.target.options.selectedIndex-1].apellido;
  }

}
