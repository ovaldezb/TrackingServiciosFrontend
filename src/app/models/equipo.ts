import { Imagen } from '../models/imagen';
import { Tecnico } from '../models/tecnico';

export class Equipo{
    constructor(
        public _id : string,
        public id_servicio: string,
        public marca:string,
        public modelo:string,
        public serie:string,
        public costo:number,
        public tecnico:Tecnico,
        public comentarios:string,
        public imagenes: Imagen[],
        public imagenesregreso: Imagen[],
        public nombretecnico:string,
        public diagnostico: string,
        public folioequipo: string
    ){}
}
