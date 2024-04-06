import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router, RouterModule } from '@angular/router';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule} from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from "angular-datatables";








import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';



import { ManageProductsComponent } from './manage-products/manage-products.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NoAccessComponent } from './no-access/no-access.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { ProductsFormComponent } from './admin/products-form/products-form.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';
import { CategoriesService } from './services/categories.service';
import { ProductService } from './services/product.service';

 

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MyOrdersComponent,
    ProductsFormComponent,
    ManageProductsComponent,
    NavbarComponent,
    NoAccessComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    ShoppingCartComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    
    LoginComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule,
  
    AngularFireModule.initializeApp(environment.firebaseConfig), 
    
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    FormsModule,
    CommonModule,
    DataTablesModule
   
  ],
  providers: [
    AuthService,
    AuthGuardService,
    AdminAuthGuardService,
    CategoriesService,
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
