import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Equipo } from '../../models/equipo';
import { Tecnico } from '../../models/tecnico';
import { Global } from '../../services/global';
import { ServicioService } from '../../services/servicios.service';
import  swal  from 'sweetalert';

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

  @Output() enviaEquipos = new EventEmitter();
  url:string;
  HighlightRow : number; 
  isEdit:boolean = false;
  public btnAccion:string = 'Agregar';
  public imageActive:boolean = false;
  public imgPath:string = "";
  public equipo:Equipo;
  public equipos:Equipo[]=[];
  public tecnicos:Tecnico[];  
  public marcas: Marcas[] = [
    {value: 'Apple', viewValue: 'Apple'},
    {value: 'Bose', viewValue: 'Bose'},
    {value: 'Supermicro', viewValue: 'Supermicro'},
    {value: 'WebDT', viewValue: 'WebDT'}        
  ];
   
   public imgname:string;
   public imgIndex:number;
  afuConfig = {
    multiple: true,
    formatsAllowed: ".jpg,.png,.gif,.jpeg",
    maxSize: "50",
    uploadAPI: {
      url: Global.url + 'upload-img'  
    },
    theme: "attachPin",
    hideProgressBar: true,
    hideResetBtn: true,
    hideSelectBtn: false,
    fileNameIndex: true,
    replaceTexts: {
      selectFileBtn: 'Select Files',
      resetBtn: 'Reset',
      uploadBtn: 'Upload',
      dragNDropBox: 'Drag N Drop',
      attachPinBtn: 'Sube tu imagen...',
      afterUploadMsg_success: 'Successfully Uploaded !',
      afterUploadMsg_error: 'Upload Failed !',
      sizeLimit: 'Size Limit'
    }
  };

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
      this.btnAccion = 'Agregar';
    } else{
      this.equipos.push(this.equipo);      
    }   
    this.equipo = new Equipo('','',null,'','',0,null,'',[],[],'','','');
    this.enviaEquipos.emit({equipos:this.equipos});
  }

  editEquipo(index):void{
    this.btnAccion = 'Actualizar';
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

  imageUpload(data) {    
    this.equipo.imagenes.push(data.body.imagen);    
  }

  clickImage(imagePath,imgIndex){    
    this.imageActive = true;
    this.imgPath = this.url+'get-image/'+imagePath;    
    this.imgIndex = imgIndex;
    this.imgname = imagePath;
  }

  eliminarImg(imgname,imgIndex){
    swal({
      title: "Esta seguro que desea eliminar la imagen",
      text: "Una vez eliminada, no se podrá recuperar!",
      icon: "warning",
      buttons: [true,true],
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {        
        this._servicioService.eliminaImgbyName(imgname).subscribe(res=>{
          this.equipo.imagenes.splice(imgIndex,1)
          swal(" El archivo ha sido eliminado!", {
            icon: "success",
          });
          this.closeModal();
        });
      }
    });    
  }

  closeModal(){
    this.imageActive = false;
  }

  changetecnico(event):void{    
    this.equipo.nombretecnico = this.tecnicos[event.target.options.selectedIndex-1].nombre + ' ' +this.tecnicos[event.target.options.selectedIndex-1].apellido;
  }

}
