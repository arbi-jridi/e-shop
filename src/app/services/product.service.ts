import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import {AngularFirestore,AngularFirestoreDocument} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { tap, take,map} from 'rxjs/operators';
import { Product } from './Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  product$:any = {};

  constructor(private db:AngularFireDatabase,public afs: AngularFirestore) { 

  }

  create(product:any){
   this.db.list('/products').push(product).then(()=>{console.log(`New product added with ID: ${product.id}`);});
  this.afs.collection('/products').add(product).then(()=>{console.log(`New product added with ID: ${product.id}`);});
  } 

getAll(){
  return this.afs.collection('/products');
}


getProductWithKey(id: string) {
  return this.afs.collection<any>('/products').snapshotChanges().pipe(
    map(actions => actions.map(a => a.payload.doc.data()))
 );
}
}






