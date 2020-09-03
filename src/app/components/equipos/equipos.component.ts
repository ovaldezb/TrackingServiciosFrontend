import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Equipo } from '../../models/equipo';
import { Tecnico } from '../../models/tecnico';
import { Global } from '../../services/global';
import { ServicioService } from '../../services/servicios.service';
import  swal  from 'sweetalert';
import { Servicio } from 'src/app/models/servicio';

export interface Marcas {
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
  @Output() recFolio = new EventEmitter();
  url:string;
  HighlightRow : number;
  isEdit:boolean = false;
  public btnAccion:string = 'Agregar';
  public imageActive:boolean = false;
  public imgPath:string = "";
  public equipo:Equipo;
  private folio: string;
  public equipos:Equipo[]=[];
  public tecnicos:Tecnico[];


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
      /*if(this.servicio.correo != ''){
        this._servicioService.enviaCorreoInicial(serUpdt.serviceUpdate)
          .subscribe(res=>{
            console.log(res);
          });
      }*/
      swal('Servicio creado',
        'El Servicio fue creado exitosamente',
        'success'
      );
      this.equipos = [];
      this.equipo = new Equipo('','',null,'','',0,null,'',[],[],'','','');
      //this._router.navigate(['/lista']);
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
