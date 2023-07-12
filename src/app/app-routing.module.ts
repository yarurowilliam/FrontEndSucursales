import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NuevoProductoComponent } from './components/dashboard/productos/nuevo-producto/nuevo-producto.component';
import { ProductoComponent } from './components/dashboard/productos/producto/producto.component';
import { ProductosComponent } from './components/dashboard/productos/productos.component';
import { BienvenidaComponent } from './components/inicio/bienvenida/bienvenida.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/inicio/login/login.component';
import { RegisterComponent } from './components/inicio/register/register.component';
//Guards
import { AuthGuard } from './helpers/auth.guard';

const routes: Routes = [
  { path:'',redirectTo: '/inicio' , pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent, children: [
    { path: '',component: BienvenidaComponent },
    { path: 'login', component:LoginComponent }
  ]},
  { path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard], children: [
    { path: '', component: ProductosComponent},
    { path: 'register',component: RegisterComponent },
    { path: 'verArticulo/:referencia', component: ProductoComponent},
    { path: 'nuevoArticulo', component: NuevoProductoComponent}
  ]},
  { path: '**', redirectTo: '/inicio', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
