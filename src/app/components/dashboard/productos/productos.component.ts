import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { ToastrService } from 'ngx-toastr';
import { Sucursal } from 'src/app/models/sucursal';
import { SucursalService } from 'src/app/services/sucursal.service';
import { MonedaService } from 'src/app/services/moneda.service';
import { Moneda } from 'src/app/models/moneda';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  listSucursal: Sucursal[] = [];
  loading = false;
  page = 1;
  pageSize = 6;
  searchText: string;
  fechaActual: string = this.getFechaActual();
  moneda: any = {};

  constructor(private loginService: LoginService,
    private sucursalService: SucursalService,
    private toastr: ToastrService,
    private monedaService: MonedaService) {
      
     }

  ngOnInit(): void {
    this.getSucursal();
    this.searchText = "";

  }
  
  convertirFechaStringADate(fecha: string): string{

    const fechaObjeto = new Date(fecha);

    const dia = fechaObjeto.getDate().toString().padStart(2, '0');
    const mes = (fechaObjeto.getMonth() + 1).toString().padStart(2, '0');
    const anio = fechaObjeto.getFullYear().toString();

    const fechaFormateada = `${dia}/${mes}/${anio}`;

    return fechaFormateada;
  }

  getFechaActual(): string{ 
    const fecha = new Date();
    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1;
    const anio = fecha.getFullYear();
    return `${dia}/${mes < 10 ? '0' + mes : mes}/${anio}`;
  }

  getSucursal(): void {
    this.loading = true;
    this.sucursalService.getListSucursal().subscribe(data => {
      console.log(data);
      this.listSucursal = data;
      this.loading = false;
    }, error => {
      console.log(error);
      this.loading = false;
      this.toastr.error('Opss.. ocurrio un error', 'Error');
    });
  }

  eliminarSucursal(codigoSucursal: number): void {
    if (confirm('Esta seguro que desea eliminar la sucursal?')){
      this.loading = true;
      this.sucursalService.deleteSucursal(codigoSucursal).subscribe(data =>{
        this.loading = false;
        this.toastr.success('La sucursal fue eliminado con exito!', 'Registro eliminado');
        this.getSucursal();
      }, error => {
        this.loading = false;
        this.toastr.error('Opss.. ocurrio un error', 'Error');
      });
    }
  }

  anuncio(): void{
    this.toastr.info('Construcción', 'ESTAMOS TRABAJANDO!');
  }



}
