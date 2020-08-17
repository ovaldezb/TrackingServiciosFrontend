import { Component, OnInit, Input } from '@angular/core';
import { Servicio } from '../../models/servicio';
import { ServicioService } from '../../services/servicios.service';
import { Global } from '../../services/global';
import { Imagen } from '../../models/imagen';
import swal from 'sweetalert';

@Component({
  selector: 'app-img-pago-tecnico',
  templateUrl: './img-pago-tecnico.component.html',
  styleUrls: ['./img-pago-tecnico.component.css'],
  providers:[ServicioService]
})
export class ImgPagoTecnicoComponent implements OnInit {

  @Input() servicio: Servicio;
 
  
  public imageActive = false;
  public imgPath = '';
  public url:string;
  public imagen:Imagen;
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
      
  }

  clickImage(imagePath,imgIndex):void{
    this.imageActive = true;
    this.imgPath = this.url+'get-image/'+imagePath;    
    this.imgIndex = imgIndex;
    this.imgname = imagePath;
  }

  closeModal(){
    this.imageActive = false;
  }

  imageUpload(data):void{    
    this.imagen = data.body.imagen;
    this._servicioService.guardaImgPagTec(this.imagen,this.servicio._id).subscribe(res=>{
      this.servicio = res.servicio;      
    });
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
          this.servicio.imgpagotecnico.splice(imgIndex,1);
          this._servicioService.updateServicio(this.servicio._id,this.servicio).subscribe(resp=>{
            console.log(resp);
          });
          swal(" El archivo ha sido eliminado!", {
            icon: "success",
          });
          this.closeModal();
        });
      }
    });    
  }

}
