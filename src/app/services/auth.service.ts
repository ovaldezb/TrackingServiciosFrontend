import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import { Global } from './global';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url:string;

  constructor(private _http: HttpClient, private _router: Router) {
    this.url = Global.url;
   }

   signInUser(user):Observable<any> {
    return this._http.post(this.url + 'login', user);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    localStorage.removeItem('usuario');
    localStorage.removeItem('id');
    this._router.navigate(['/auth']);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getRol():number{
    return Number.parseInt(localStorage.getItem('rol'));
  }

  getIdUser(){
    return localStorage.getItem('id');
  }

  getUser(){
    return localStorage.getItem('usuario');
  }
}
