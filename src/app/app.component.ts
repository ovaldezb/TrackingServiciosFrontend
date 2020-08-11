import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public authService: AuthService;
  constructor(private _authService: AuthService){
    this.authService = _authService;
  }

  title = 'Sistema de Rastreo de Servicios TDM';

  ngOnInit():void{

  }
}

