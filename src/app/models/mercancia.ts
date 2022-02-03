import { Producto } from "./producto";

export class Mercancia{
  constructor(
    public producto:Producto,
    public estado: String,
    public bodega: String,
    public serie: String,
    public precioCompra:Number,
    public precioDolares:Number,
    public fechaCompra:Date,
    public capturoEntrada:String,
    public capturoSalida:String,
    public precioVenta:Number,
    public noFacturaCompra:String,
    public noFacturaVenta:String,
    public fechaVenta:Date,
    public cliente:String,
    public tiempoGarantia:Number,
    public fechaVencimientoGarantia:Date,    
    public motivo:String,
    public observaciones:String
  ){}
}