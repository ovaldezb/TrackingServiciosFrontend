export class Tecnico{
    constructor(
        public _id : string,
        public nombre: string,
        public apellido:string,
        public telefono:string,
        public correo:string,
        public activo:boolean,
        public clave:string,
        public password: string,
        public rol: string,
        public rolnombre: string
    ){}
}