import { Component, OnInit, Input, Output } from '@angular/core';
import { Equipo } from '../../models/equipo';
import { ServicioService } from '../../services/servicios.service';
import { Global } from '../../services/global';
import { Imagen } from '../../models/imagen';

@Component({
  selector: 'app-img-regreso',
  templateUrl: './img-regreso.component.html',
  styleUrls: ['./img-regreso.component.css'],
  providers:[ServicioService]
})
export class ImgRegresoComponent implements OnInit {

  @Input() equipo: Equipo;
  imagen: Imagen;
  public imageActive = false;
  public imgPath = '';
  public url:string;
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
      attachPinBtn: 'Selecciona tu imagen',
      afterUploadMsg_success: 'Successfully Uploaded !',
      afterUploadMsg_error: 'Upload Failed !',
      sizeLimit: 'Size Limit'
    }
  };
  constructor(private _servicioService:ServicioService) {
    this.url = Global.url;
   }

  ngOnInit(): void {    
    this.equipo.imagenesregreso = [];    
    this._servicioService.getImagesByEquipoId(this.equipo._id,1).subscribe(res =>{      
      if(res.imagenes.length > 0 ){
        this.equipo.imagenesregreso = res.imagenes;                
      }
    });    
  }

  clickImage(imagePath):void{
    this.imageActive = true;
    this.imgPath = this.url+'get-image/'+imagePath;
  }

  closeModal(){
    this.imageActive = false;
  }

  imageUpload(data):void{
    if(this.equipo.imagenesregreso == undefined){
      this.equipo.imagenesregreso = [];
    }
    this.imagen = data.body.imagen;
    this.equipo.imagenesregreso.push(this.imagen);
    this.imagen.id_equipo = this.equipo._id;
    this.imagen.tipo = 1;    
    this._servicioService.guardaImagenRegreso(this.imagen)
        .subscribe(res=>{
          //console.log(res);
        });
  }

}
