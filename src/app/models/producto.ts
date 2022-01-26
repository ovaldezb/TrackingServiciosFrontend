export class Producto{
  constructor(
    public _id : string,
    public marca : string,
    public modelo: string,
    public familia: string,
    public noParte: string,
    public proveedor:string,
    public url: string,
    public stock:number
  ){}
}