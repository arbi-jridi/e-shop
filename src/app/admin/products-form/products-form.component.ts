
import { Component,Inject, Input} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CategoriesService } from '../../services/categories.service';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, take } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ChangeDetectorRef } from '@angular/core';

import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ProductService } from 'src/app/services/product.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrl: './products-form.component.css'
})
export class ProductsFormComponent {
  categories$:any;
  products:any
  product$:any;
  isExisting= false;

  private destroy$ = new Subject<void>();

  product: any = {
    id: '',
    title: '',
    price: '',
    category:'',
    imageUrl:''
  };


  constructor( categories: CategoriesService,private ProductService :ProductService, private router: Router,private db:AngularFireDatabase, private afs:AngularFirestore ,private route:ActivatedRoute,private cdr: ChangeDetectorRef,) 
  {  
    
    this.db.list('/categories').valueChanges().pipe(
      tap(data => {
        this.categories$ = data;
      })
    ).subscribe(
      () => {
        console.log(this.categories$);
      },
    );


    this.afs.collection('/products').valueChanges().pipe(
      tap(data => {
        this.products = data;
      })
    ).subscribe(
      () => {
        console.log(this.products);
      },
    );

    }
 

    ngOnInit() {
      this.isExisting = false;
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.ProductService.getProductWithKey(id).pipe(takeUntil(this.destroy$))
          .subscribe(productData => {
            this.isExisting = true;
            const productId = +id; 
            this.product = productData.find(product => product.id === productId);
          });
      }

    }

    async save(product:any){
      if(this.isExisting)
      {
        const id = this.route.snapshot.paramMap.get('id');
        this.ProductService.update(id, product); 
        await new Promise(resolve => setTimeout(resolve, 1000)); 
        await this.router.navigate(['/admin/products']);
      }
      else{
        this.ProductService.createProductWithId(product);
        await new Promise(resolve => setTimeout(resolve, 1000));
        await this.router.navigate(['/admin/products']);
      }
    }  


    deleteProduct(){
      const confirmDelete = confirm('Are you sure you want to delete this product?');
      if (confirmDelete) {
        const id = this.route.snapshot.paramMap.get('id');
        this.ProductService.delete(id);
      }
      
   
    }
   

  

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}


