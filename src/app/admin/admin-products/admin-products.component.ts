
import { Component,Inject} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CategoriesService } from '../../services/categories.service';
import { Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { tap ,map} from 'rxjs/operators';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';



import { AngularFireDatabase } from '@angular/fire/compat/database';

import { ProductService } from 'src/app/services/product.service';
import {AngularFirestore,AngularFirestoreDocument} from '@angular/fire/compat/firestore';
import { Product } from 'src/app/services/Product';


import * as $ from 'jquery';
//declare var $: any;
declare var jQuery: any;
/// <reference types="datatables.net" />

interface JQuery {
  dataTable: DataTables.StaticFunctions;
  DataTable: DataTables.StaticFunctions;
  isDataTable(selector: any): boolean;
}

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent {
products: Product[]= [];
filtredProducts: any[]= [];
product$!: any;



ngAfterViewInit(): void {
if  ($('#table').hasClass('dataTable')) {
  if (($.fn as any).DataTable.isDataTable('#table')) {
    $('#table').DataTable().clear().destroy();
  }
  $('#table').DataTable(this.dtOptions);
}
}

private destroy$ = new Subject<void>();
subscription!:Subscription;

dtOptions: DataTables.Settings = {};


  constructor(private ProductService :ProductService,private db:AngularFireDatabase,private route:ActivatedRoute,public afs: AngularFirestore,private renderer: Renderer2)
  {
    this.subscription = this.ProductService.getAll().valueChanges().pipe(
      map((products: any[]) => products as Product[]),
      tap((products: Product[]) => {
        this.filtredProducts = this.products = products;
      })
    ).subscribe(
      () => {
        console.log(this.products);
      },
    );
   
    }



    ngOnInit(): void {
      this.dtOptions = {
        pagingType: 'full_numbers',
        //searching: false
      };
   
    }

    ngOnDestroy(){
      this.subscription.unsubscribe();
    }

 filter(query:string){
this.filtredProducts = (query) ? this.products.filter(p => p.title?.toLowerCase().includes(query.toLowerCase())) : this.products;}
} 
