
import { Component,Inject} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CategoriesService } from '../../services/categories.service';
import { Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AngularFireDatabase } from '@angular/fire/compat/database';

import { ProductService } from 'src/app/services/product.service';
import {AngularFirestore,AngularFirestoreDocument} from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent {
products$!: any;
product$!: any;
private destroy$ = new Subject<void>();



  constructor(private ProductService :ProductService,private db:AngularFireDatabase,private route:ActivatedRoute,public afs: AngularFirestore)
  {
    this.afs.collection('/products').valueChanges().pipe(
      tap(data => {
        this.products$ = data;
      })
    ).subscribe(
      () => {
        console.log(this.products$);
      },
    );



    }
    ngOnInit() {}


}
