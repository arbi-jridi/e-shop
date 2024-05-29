import { AuthService } from './services/auth.service';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AngularFireAuthGuard } from '@angular/fire/compat/auth-guard';
import {redirectUnauthorizedTo,redirectLoggedInTo} from '@angular/fire/auth-guard';


import { ManageProductsComponent } from './manage-products/manage-products.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { NoAccessComponent } from './no-access/no-access.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { LoginComponent } from './login/login.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';
import { ProductsFormComponent } from './admin/products-form/products-form.component';
import { CatalogComponent } from './catalog/catalog.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(["login"]);
const redirectUnauthorizedToHome = () => redirectUnauthorizedTo(["/"]);
const redirectLoggedInToHome = () => redirectLoggedInTo(["/"]);

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },
  { path: 'catalog/category:id', component: CatalogComponent },
  { path: 'catalog', component: CatalogComponent },
  { path: 'manage-products', component: ManageProductsComponent },
  { path: 'login', component: LoginComponent,canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToHome }},

// admin routes

  
  { path: 'admin/orders', component: AdminOrdersComponent ,canActivate:[AuthGuardService,AdminAuthGuardService,AngularFireAuthGuard],data: { authGuardPipe: redirectUnauthorizedToHome }},
  { path: 'admin/products/new', component: ProductsFormComponent,canActivate:[AuthGuardService,AdminAuthGuardService,AngularFireAuthGuard],data: { authGuardPipe: redirectUnauthorizedToHome } },
  { path: 'admin/products/:id', component: ProductsFormComponent ,canActivate:[AuthGuardService,AdminAuthGuardService,AngularFireAuthGuard],data: { authGuardPipe: redirectUnauthorizedToHome }},
  { path: 'admin/products', component: AdminProductsComponent ,canActivate:[AuthGuardService,AdminAuthGuardService,AngularFireAuthGuard],data: { authGuardPipe: redirectUnauthorizedToHome }  },
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
