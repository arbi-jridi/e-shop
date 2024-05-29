import { Component, Input } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from '../../services/Product';
import { Subscription } from 'rxjs/internal/Subscription';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrl: './product-filter.component.css'
})
export class ProductFilterComponent {
constructor(private CategoriesService :CategoriesService){}

categories$: any;
@Input('category') category:any;
subscription: Subscription = new Subscription();

  ngOnInit(){
    this.loadCategories();
  }

  
  loadCategories(){
    this.subscription.add(
  this.CategoriesService.getAll().valueChanges().subscribe(data => {this.categories$=data;console.log(this.categories$)}))
    
  }
}
