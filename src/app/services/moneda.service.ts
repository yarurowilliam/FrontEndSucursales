import { Injectable } from '@angular/core';
import { Moneda } from '../models/moneda';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MonedaService {
  myAppUrl: string;
  myApiUrl: string;
  myApiUrl2: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = 'http://localhost:50451';
    this.myApiUrl = '/api/Moneda/';
  }

  saveMoneda(moneda: Moneda): Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiUrl2, moneda);
  }

  getListMonedas(): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + 'GetListMonedas');
  }

  getMoneda(idMoneda: number): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + idMoneda);
  }
}
