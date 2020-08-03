export class Equipo{
    constructor(
        public _id : string,
        public id_servicio: string,
        public marca:string,
        public modelo:string,
        public serie:string,
        public costo:number,
        public tecnico:string,
        public comentarios:string
    ){}
}