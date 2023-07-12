import { Moneda } from "./moneda";

export class Sucursal{
    codigo:number;
    descripcion:string;
    direccion?:string;
    identificacion?:string;
    fechaCreacion?:string;
    moneda?:Moneda;
    idMoneda?:number;
}