
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product } from '../services/Product';
import { Subscription } from 'rxjs/internal/Subscription';
import { map, switchMap, tap } from 'rxjs';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})


export class CatalogComponent implements OnInit, OnDestroy {
  isToggled:boolean = false;
  products: Product[] = [];
  filteredProducts: Product[] = [];
  
  category!:string|null ;
  subscription: Subscription = new Subscription();
  
  constructor( private ProductService :ProductService,private db:AngularFireDatabase,private route:ActivatedRoute,public afs: AngularFirestore ,public cartService: ShoppingCartService)
  { }

ngOnInit(){
  
  this.loadProducts();
}


loadProducts(){
  this.subscription.add(
    this.ProductService.getAll().valueChanges().pipe(
      map((products: any[]) => products as Product[]),
      switchMap(products=>{this.products=products;
        console.log(this.products);
        return this.route.queryParamMap;
      }),map(params=>{
        this.category= params.get('category');
        console.log(this.category);
        this.filteredProducts = (this.category) ? this.products.filter(p=>p.category===this.category) : this.products;
      })).subscribe());

}


toggle(){
this.isToggled=!this.isToggled;
if (this.isToggled) {
  document.querySelector('.btn')!.setAttribute('style', 'transform: rotate(90deg); transition: transform 0.3s ease-in-out;');
} else {
  document.querySelector('.btn')!.setAttribute('style', 'transform: rotate(0deg); transition: transform 0.3s ease-in-out;');
}

}

addToCart(product:Product){
  this.cartService.addToCart(product);
}







ngOnDestroy(){
  this.subscription.unsubscribe();
}



}
