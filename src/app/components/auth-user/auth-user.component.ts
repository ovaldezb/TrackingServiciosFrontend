import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../../services/servicios.service';
import swal from 'sweetalert';
import { Global } from '../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-auth-user',
  templateUrl: './auth-user.component.html',
  styleUrls: ['./auth-user.component.css'],
  providers:[ServicioService]
})
export class AuthUserComponent implements OnInit {
  url:String;  
  public usuario:String;
  constructor(private _router : Router, private _servicioService: ServicioService) {     
  }

  ngOnInit(): void {
  }

  enviar():void{
    try{
      this._servicioService.getTecnico(this.usuario).subscribe(res =>{
        
        if(res.status=='error'){
          swal('EL usuario no existe!','Error','error');
          return;
        }        
        this._router.navigateByUrl('/lista',{ state:res.tecnico });
      });
    }catch(exc){
    console.log('Error');
    }
    
  }

}
