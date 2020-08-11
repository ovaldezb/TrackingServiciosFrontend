import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { AuthService } from '../../services/auth.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[AuthService]
})
export class LoginComponent implements OnInit {

  user = {
    clave:'',
    password:''
  };
  constructor(private _router : Router, private _authService: AuthService) { }

  ngOnInit(): void {
  }

  signIn():void{
    this._authService.signInUser(this.user)
    .subscribe(res =>{      
      localStorage.setItem('token', res.dataUser.accessToken);
      localStorage.setItem('rol',res.dataUser.rol);
      localStorage.setItem('usuario',res.dataUser.clave);
      this._router.navigate(['/lista']);
    }, err=>{
      swal('Ooops! algo salió mal','Asegúrese que el usuario y la contraseña sean correctas','error');
    });
  }

}
