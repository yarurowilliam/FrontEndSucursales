import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  
  myAppUrl: string;
  myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = 'http://localhost:50451';
    this.myApiUrl = '/api/Usuario/';
  }
  // http://localhost:50451/api/Usuario -- POST
  saveUser(usuario: Usuario): Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiUrl, usuario);
  }

  changePassword(changePassword): Observable<any>{
    return this.http.put(this.myAppUrl + this.myApiUrl + 'CambiarPassword', changePassword);
  }

  getListUsuarios(): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + 'GetListUsuarios');
  }
  
  getUsuario(identificacion: string): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + identificacion);
  }

  cambiarRol(usuario: Usuario): Observable<any> {
    return this.http.put(this.myAppUrl + this.myApiUrl + usuario.id, usuario);
  }
}
