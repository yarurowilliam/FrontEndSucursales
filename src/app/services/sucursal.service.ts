import { Injectable } from '@angular/core';
import { Sucursal } from '../models/sucursal';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SucursalService {
  myAppUrl: string;
  myApiUrl: string;
  myApiUrl2: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = 'http://localhost:50451';
    this.myApiUrl = '/api/Sucursal/';
    this.myApiUrl2 = '/api/Sucursal';
  }

  saveSucursal(sucursal: Sucursal): Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiUrl2, sucursal);
  }

  getListSucursal(): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + 'GetListSucursal');
  }

  deleteSucursal(id: number): Observable<any> {
    return this.http.post(this.myAppUrl + this.myApiUrl  + 'EliminarSucursal/' + id, id);
  }

  getSucursal(codigoSucursal: number): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + codigoSucursal);
  }

  updateSucursal(sucursal: Sucursal): Observable<any> {
    return this.http.post(this.myAppUrl + this.myApiUrl  + 'ActualizarSucursal/'+ sucursal.codigo, sucursal);
  }

}
