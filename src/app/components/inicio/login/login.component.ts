import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from '../../../models/usuario';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading = false;
  login: FormGroup;

  constructor(private fb: FormBuilder,
              private toastr: ToastrService,
              private router: Router,
              private loginService: LoginService) {
    this.login = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  log(): void{
    this.loading = true;
    setTimeout(()=>{
      const usuario: Usuario = {
        nombreUsuario: this.login.value.usuario,
        rolUser: 'ADMINISTRADOR',
        password: this.login.value.password
      };
      this.loading = true;
      this.loginService.login(usuario).subscribe(data => {
        console.log(data);
        this.loading = false;
        this.loginService.setLocalStorage(data.token);
        this.toastr.success('Ingreso fue exitoso, bienvenido ' + usuario.nombreUsuario , 'Operacion exitosa!');
        this.router.navigate(['/dashboard']);
      }, error => {
        console.log(error);
        this.loading = false;
        this.toastr.error(error.error.message, 'Error');
        this.login.reset();
      });
    },3000);
  }
}
