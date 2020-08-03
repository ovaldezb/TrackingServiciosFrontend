import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Servicio } from '../../models/servicio';
import { Equipo } from '../../models/equipo';
import { ServicioService } from '../../services/servicios.service';


@Component({
  selector: 'app-mostrar-equipos',
  templateUrl: './mostrar-equipos.component.html',
  styleUrls: ['./mostrar-equipos.component.css'],
  providers:[ServicioService]
})
export class MostrarEquiposComponent implements OnInit {

  @Output() enviaEquipos = new EventEmitter();
  public equipos : Equipo[];
  @Input() servicio: Servicio;
  constructor(private _servicioService: ServicioService) { }

  ngOnInit(): void {        
    this._servicioService.getEquiposById(this.servicio._id).subscribe(res =>{      
      if(res.equipos.length > 0){
        this.equipos = res.equipos;
      }
    });    
  }

  retornaequipos():void{    
    this.enviaEquipos.emit({equipos:this.equipos});
  }

}
