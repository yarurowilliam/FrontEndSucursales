import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Sucursal } from 'src/app/models/sucursal';
import { SucursalService } from 'src/app/services/sucursal.service';
import { Moneda } from 'src/app/models/moneda';
import { MonedaService } from 'src/app/services/moneda.service';

@Component({
  selector: 'app-nuevo-producto',
  templateUrl: './nuevo-producto.component.html',
  styleUrls: ['./nuevo-producto.component.css']
})
export class NuevoProductoComponent implements OnInit {
  datosSucursal: FormGroup;
  loading = false;
  listMonedas: Moneda[] = [];
  monedaBusqueda : Moneda;
  constructor(private fb: FormBuilder, private router: Router,private sucursalService: SucursalService, private toastr: ToastrService, private monedaService: MonedaService) 
  { 
    this.datosSucursal = this.fb.group({
      codigo: ['', Validators.required],
      descripcion: ['',[Validators.required, Validators.maxLength(250)]],
      direccion: ['',[Validators.required, Validators.maxLength(250)]],
      identificacion: ['',[Validators.required, Validators.maxLength(50)]],
      fechaCreacion: [''],
      moneda: ['']
    });
  }

  ngOnInit(): void {
    this.getMonedas();
  }

  formatearFechaCon0enMes(): string{
    const fecha = new Date(this.datosSucursal.value.fechaCreacion);
    const dia = fecha.getDate() + 1;
    const mes = fecha.getMonth() + 1;
    const anio = fecha.getFullYear();
    return `${mes < 10 ? '0' + mes : mes}/${dia}/${anio}`;
  }

  convertirFechaADate(): Date{
    const fecha = new Date(this.datosSucursal.value.fechaCreacion);
    const dia = fecha.getDate() + 1;
    const mes = fecha.getMonth() + 1;
    const anio = fecha.getFullYear();
    return new Date(`${dia}/${mes}/${anio}`);
  }

  registrarSucursal(): void{


    const sucursal: Sucursal ={
      codigo: this.datosSucursal.value.codigo,
      descripcion: this.datosSucursal.value.descripcion,
      direccion: this.datosSucursal.value.direccion,
      identificacion: this.datosSucursal.value.identificacion,
      fechaCreacion:  this.formatearFechaCon0enMes(),
      moneda: null,
      idMoneda:  this.datosSucursal.value.moneda
    };

    
    this.loading = true;
    setTimeout(()=>{
      this.sucursalService.saveSucursal(sucursal).subscribe(data => {
        console.log(data);
        this.toastr.success(data.message, 'Sucursal Registrada!');
        this.router.navigate(['/dashboard']);
        this.loading = false;
      }, error => {
        this.loading = false;
        console.log(error);
        this.toastr.error(error.error.message, 'Error!');
        this.datosSucursal.reset();

      });
   },3000);
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


}
