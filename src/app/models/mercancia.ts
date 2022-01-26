import { Producto } from "./producto";

export class Mercancia{
  constructor(
    public estado: String,
    public serie: String,
    public bodega: String,
    public fechaCompra:Date,
    public precioCompra:Number,
    public estatusVendido:Boolean,
    public capturoEntrada:String,
    public noFacturaCompra:String,
    public producto:Producto
  ){}
}