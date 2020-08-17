import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Servicio } from '../../models/servicio'; 
import { ServicioService } from '../../services/servicios.service';
import {PrintService } from '../../services/print.service';

@Component({
  selector: 'app-print-layout',
  templateUrl: './print-layout.component.html',
  styleUrls: ['./print-layout.component.css'],
  providers:[ServicioService]
})
export class PrintLayoutComponent implements OnInit {

  private serviceId: string;
  public servicio: Servicio;
  constructor(route: ActivatedRoute,private _servicioService: ServicioService,private printService: PrintService) {
    this.serviceId = route.snapshot.params['serviceId'];
    console.log(this.serviceId);
   }

  ngOnInit(): void {
    this._servicioService.getServicioById(this.serviceId).subscribe(res=>{
      this.servicio = res.servicio;
      this.printService.onDataReady();
    });
  }

}
