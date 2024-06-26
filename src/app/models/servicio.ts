import { Cliente } from './cliente';
import { Equipo } from './equipo';
import { Imagen } from './imagen';

export class Servicio{
    constructor(
        public _id : string,
        public clienteId:Cliente ,
        public receptor: string,
        public folio : string,
        public telefono: string,
        public cliente : string,
        public correo : string,
        public costorevision:number,
        public esgarantia : string,
        public estatus : string,
        public numeroguia: string,
        public costotecnico:number,
        public diagnostico: string,
        public costoenvio: number,
        public cliautoriza: boolean,
        public pagoanticipotecnico: number,
        public condregreso: string,
        public costocliente: number,
        public etapa: number,
        public puedereparar: boolean,
        public tecrecequ: boolean,
        public equipoprobado: boolean,
        public mensajeria: string,
        public fechaactualizacion: Date,
        public fechaIngreso: Date,
        public semaforo: string,
        public equipos:Equipo[],
        public linkpago:string,
        public pagofinal:number,
        public metodopago:string,
        public imgpagotecnico:Imagen[],
        public seleccionado:boolean
    ){}
}
