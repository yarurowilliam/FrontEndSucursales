import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SucursalService } from 'src/app/services/sucursal.service';
import { Location } from '@angular/common';
import { Moneda } from 'src/app/models/moneda';
import { MonedaService } from 'src/app/services/moneda.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  referencia: number;
  loading = false;
  sucursal: any = {};
  listMonedas: Moneda[] = [];
  monedaBusqueda : Moneda;

  constructor(private sucursalService: SucursalService,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute,
    private location: Location,
    private router: Router,
    private monedaService: MonedaService) {
      this.referencia = parseInt(this.aRoute.snapshot.paramMap.get('referencia'));
  }
  ngOnInit(): void {
    this.getSucursal();
    this.getMonedas();
  }

  getSucursal(): void {
    this.loading = true;
    this.sucursalService.getSucursal(this.referencia).subscribe(data => {
      this.loading = false;
      this.sucursal = data;
    });
  }

  getMonedas(): void {
    this.loading = true;
    this.monedaService.getListMonedas().subscribe(data => {
      this.listMonedas = data;
      this.loading = false;
    }, error => {
      console.log(error);
      this.loading = false;
      this.toastr.error('Opss.. ocurrio un error', 'Error');
    });
  }


  convertirFechaADate(fechaAntigua:string): Date{
    const fecha = new Date(fechaAntigua);
    const dia = fecha.getDate() + 1;
    const mes = fecha.getMonth() + 1;
    const anio = fecha.getFullYear();
    return new Date(`${dia}/${mes}/${anio}`);
  }

  formatearFechaCon0enMes(fechaAntigua:string): string{
    const fecha = new Date(fechaAntigua);
    const dia = fecha.getDate() + 1;
    const mes = fecha.getMonth() + 1;
    const anio = fecha.getFullYear();
    return `${dia}/${mes < 10 ? '0' + mes : mes}/${anio}`;
  }

  update(): void {
    this.sucursal.idMoneda = this.sucursal.moneda.idMoneda; 
    this.loading = true;
    setTimeout(()=>{
      this.sucursalService.updateSucursal(this.sucursal).subscribe(data => {
        this.toastr.info("Se modifico la sucursal con exito", "Sucursal modificada");
        this.router.navigate(['/dashboard']);
      }, error => {
        this.loading = false;
        this.toastr.error(error.error.message, 'Error!');
      });
    },3000);
  }

  goBack(): void {
    this.location.back;
  }
}
