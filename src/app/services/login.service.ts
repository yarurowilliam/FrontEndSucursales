import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Usuario } from '../models/usuario';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  myAppUrl: string;
  myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = 'http://localhost:50451';
    this.myApiUrl = '/api/Login';
  }

  login(usuario: Usuario): Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiUrl, usuario);
  }

  setLocalStorage(data): void {
    localStorage.setItem('token', data);
  }

  removeLocalStorge(): void {
    localStorage.removeItem('token');
  }

  getTokenDecoded(): any{
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(localStorage.getItem('token'));
    return decodedToken;
  }

  getToken(): string{
    return localStorage.getItem('token');
  }

  hasRole(rol: string): boolean {
    let roles: string[]
    if(this.getTokenDecoded().sid=="ADMINISTRADOR"){
      roles =["ADMINISTRADOR"];
      return roles.indexOf(rol) >= 0;
    }else if(this.getTokenDecoded().sid=="EMPLEADO"){
        roles = ["EMPLEADO"];
        return roles.indexOf(rol) >= 0;
    }else{
      return false;
    }
  }


}
