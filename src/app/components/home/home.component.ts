import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../../services/servicios.service';
import { Servicio } from '../../models/servicio';
import { Global } from '../../services/global';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[ServicioService]
})
export class HomeComponent implements OnInit {

    public url: string;

  constructor(private _serviciosService: ServicioService) {
    this.url = Global.url;
   }

  ngOnInit(): void {
    
  }

}
