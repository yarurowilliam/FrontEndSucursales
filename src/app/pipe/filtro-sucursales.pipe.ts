import { Pipe, PipeTransform } from '@angular/core';
import { Sucursal } from '../models/sucursal';
@Pipe({
  name: 'filtroSucursales'
})
export class FiltroSucursalesPipe implements PipeTransform {

  transform(sucursales: Sucursal[], searchText: string) {
    if (searchText == null) return sucursales;
    return sucursales.filter(sucursal =>
      sucursal.descripcion.toLowerCase().indexOf(searchText.toLowerCase())  !== -1 ||
      sucursal.identificacion.toLowerCase().indexOf(searchText.toLowerCase())  !== -1
    );
  }

}
