import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Servicio } from '../../models/servicio';
import  swal  from 'sweetalert';
import { Equipo } from '../../models/equipo';
import { Mensajeria } from '../../models/mensajeria';
import { ServicioService } from '../../services/servicios.service';
import { Global } from '../../services/global';
import { AuthService } from '../../services/auth.service';
import { PrintService } from '../../services/print.service';

export interface Metodopago {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-mover-status',
  templateUrl: './mover-status.component.html',
  styleUrls: ['./mover-status.component.css'],
  providers:[ServicioService, AuthService, PrintService]
})
export class MoverStatusComponent implements OnInit {
  url:string;
  public servicio: Servicio;
  public canreapir: boolean;
  public actnnorepair:string;
  public devolver: string = "devolver";
  public resguardo: string = "resguardo";
  public enableBtn:boolean = true;
  public costoequipo: number = 0;
  public imageActive:boolean = false;
  public imgPath:string = "";
  public tecnico: string;
  private deltaGanancia:number = 1.2;
  public equipos:Equipo[];
  public mensajeria:Mensajeria[];
  public img_id: string;
  public equipoIndex: number;
  public imgIndex:number;
  public pagosaldo:boolean=false;
  public iscobrar:boolean=false;
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

  public metodopago: Metodopago[] = [
    {value: 'Contado', viewValue: 'Contado'},
    {value: 'Tarjeta', viewValue: 'Tarjeta'},
    {value: 'Mercadopago', viewValue: 'Mercadopago'},
    {value: 'Otro', viewValue: 'Otro'}
  ];
  constructor(
    private _router : Router,  private _servicioService: ServicioService, public authService: AuthService,private printService: PrintService) {
    this.canreapir = true;
    this.actnnorepair = 'devolver';
    this.url = Global.url;
  }

  ngOnInit(): void {
    this.servicio = history.state;
    console.log(this.servicio);
    this._servicioService.getEquiposById(this.servicio._id).subscribe(res =>{
      if(res.equipos.length > 0){
        this.equipos = res.equipos;
        this.equipos.forEach(equipo =>{
          this.costoequipo += equipo.costo;
          this._servicioService.getImagesByEquipoId(equipo._id,0).subscribe(res =>{
            if(res.status == 'success'){
              equipo.imagenes = res.imagenes;
            }
          });
        });
      }
    });
    this._servicioService.getMensajerias()
        .subscribe(res=>{
          if(res.status == 'success'){
            this.mensajeria = res.mensajeria;
          }
        });

    if(this.servicio.costotecnico > 0 && this.servicio.costocliente == 0){
      this.servicio.pagoanticipotecnico = this.servicio.costotecnico * 0.7;
      this.servicio.costocliente = (this.servicio.costotecnico + this.servicio.costoenvio) * this.deltaGanancia;
    }
  }

  Canrepair(flag):void{
    this.canreapir = flag;
    if(!flag){
      this.servicio.numeroguia = '';
      this.servicio = this.servicio;
      this.enableBtn = false;
    }else{
      this.enableBtn = this.servicio.numeroguia.length<1;
    }
  }

  enviar(stage2move):void{
    switch(stage2move){
      case 0: //Abierto
        if(this.canreapir){
          //'Enviado';
          this.servicio.etapa = 1;
        }else if(this.actnnorepair == this.devolver){
          //'En espera cliente recoja';
          this.servicio.etapa = 7;
        }else if(this.actnnorepair == this.resguardo){
          //'Resguardo';
          this.servicio.etapa = 2;
        }
        break;
      case 1: //Enviado
        //'Recibido';
        this.servicio.etapa = 3;
        break;
      case 2: //Resguardo
        //Enviado
        this.servicio.etapa = 1;
        break;
      case 3: //Recibido
        //'Diagnosticado';
        this.servicio.etapa = 4;
        break;
      case 4: //Diagnosticado
        if(this.servicio.cliautoriza){
            // 'En reaparación';
            this.servicio.etapa = 5;
          }else{
            //'Devolución a TDM';
            this.servicio.etapa = 6;
          }
        break;
      case 5: //En reparación
          //'Devuelto a TDM';
          this.servicio.etapa = 6;
          break;
        case 6: //Devuelto a TDM
          if(this.servicio.equipoprobado){
            //'En espera cliente recoja';
            this.servicio.etapa = 7;
            this.enviaCorreoFinal();
          }else{
            //Abierto
            this.servicio.etapa = 0;
          }
          break;
        case 7: //Espera cliente recoja
          //'Entregado';
          this.servicio.etapa = 8;
        break;
        case 8: //Entregado
          //Pendiente pago técnico
          this.servicio.etapa = 9;
          break;
    }
    var fechaUltAct = new Date();
    fechaUltAct.toLocaleString('es-MX', { timeZone: 'America/Chicago' })
    this.servicio.fechaactualizacion = fechaUltAct;
    this.servicio = this.servicio;
    this._servicioService.updateServicio(this.servicio._id,this.servicio)
        .subscribe(res=>{
          if(res.status=='success'){
            swal('El servicio ha cambiado de estatus','Estatus actualizado','success');
          }
        });
    this._router.navigate(['/lista']);
  }

  typenoguia(): void{
    this.enableBtn = this.servicio.numeroguia.length<1;
  }

  recibeEquipos(event):void{
    this.equipos = event.equipos;
    for(var i=0; i<this.equipos.length;i++) {
      this._servicioService.updateEquipoById(this.equipos[i]._id,this.equipos[i])
          .subscribe(res=>{
            this.equipos.forEach(equipo =>{
              this.costoequipo += equipo.costo;
            });
          });
    };
  }

  imageUpload(data,i) {
    this._servicioService.createImagenByEquipoId(this.equipos[i]._id,data.body.imagen)
        .subscribe(res => {
          this.equipos[i].imagenes.push(res.imagenSaved);
        });
  }

  clickImage(imageName,img_id,equipoIndex,imgIndex):void{
    this.imageActive = true;
    this.imgPath = this.url+'get-image/'+imageName;
    this.img_id = img_id;
    this.equipoIndex = equipoIndex;
    this.imgIndex = imgIndex;

  }

  eliminarImg(img_id,equipoIndex,imgIndex){
    swal({
      title: "Esta seguro que desea eliminar la imagen",
      text: "Una vez eliminada, no se podrá recuperar!",
      icon: "warning",
      buttons: [true,true],
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        this._servicioService.eliminaImg(img_id).subscribe(res=>{
          this.equipos[equipoIndex].imagenes.splice(imgIndex,1)
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

  enviaCorreoFinal():void{
    this._servicioService.enviaCorreoFinal(this.servicio).subscribe(res=>{
    });
  }

  imprimir() {
    this.printService.printDocument(this.servicio._id, this.servicio);
  }

  cobrar(){
    if(this.servicio.pagofinal > 0){
      swal({
        title: "Esta seguro que desea hacer el cobro de esta reparación",
        text: "Una vez hecho el cobro, el servicio se cerrará!",
        icon: "warning",
        buttons: [true,true],
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          this.enviar(7);
        }
      });
    }else if(this.servicio.pagofinal ==0){
      swal("La cantidad a cobrar debe ser mayor a $0");
    }else{
      swal("Solo se aceptan numeros");
      this.servicio.pagofinal = 0;
    }
  }

}
