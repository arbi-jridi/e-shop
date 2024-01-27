import { AuthService } from './services/auth.service';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuardService } from './services/auth-guard.service';
import {redirectUnauthorizedTo} from '@angular/fire/auth-guard';


import { ManageProductsComponent } from './manage-products/manage-products.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { NoAccessComponent } from './no-access/no-access.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { LoginComponent } from './login/login.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(["login"]);

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },
  { path: 'manage-products', component: ManageProductsComponent },
  { path: 'login', component: LoginComponent },

// admin routes

  { path: 'admin/products', component: AdminProductsComponent,canActivate:[AuthGuardService],data: { authGuardPipe: redirectUnauthorizedToLogin } },
  { path: 'admin/orders', component: AdminOrdersComponent ,canActivate:[AuthGuardService],data: { authGuardPipe: redirectUnauthorizedToLogin }},
  
  { path: 'check-out', component: CheckOutComponent,canActivate:[AuthGuardService],data: { authGuardPipe: redirectUnauthorizedToLogin } },
  { path: 'order-success', component: OrderSuccessComponent,canActivate:[AuthGuardService],data: { authGuardPipe: redirectUnauthorizedToLogin } },
  { path: 'my-orders', component: MyOrdersComponent,canActivate:[AuthGuardService] ,data: { authGuardPipe: redirectUnauthorizedToLogin }},
  { path: 'no-access', component:NoAccessComponent},
  { path: '**', redirectTo: '' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
