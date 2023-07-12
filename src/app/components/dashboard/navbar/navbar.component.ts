import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private loginService: LoginService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  logOut(): void{
    this.loginService.removeLocalStorge();
    this.router.navigate(['/inicio']);
    this.toastr.warning('Gracias por utilizar nuestros servicios', 'Sesion finalizada');

  }

}
