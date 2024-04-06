import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import {AngularFirestore,AngularFirestoreDocument, DocumentReference} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { tap, take,map} from 'rxjs/operators';
import { Product } from './Product';
import { Router, ActivatedRouteSnapshot,ActivatedRoute } from '@angular/router';
import { doc, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  [x: string]: any;
  
  product$:any = {};


  

  constructor(private db:AngularFireDatabase,public afs: AngularFirestore,private router: Router,public snapshot:ActivatedRoute) { 

  }



update(id: any, product: any) {
  
  if (!id) {
    console.error('Invalid ID provided for update:', id);
    return;
  }

  this.afs.collection('/products/').doc(id).update(product)
    .then(() => {
      alert(`Edited Successfully`);
    })
    .catch((error) => {
     
      console.error('Error updating product:', error);
      alert('Error updating product. Please make sure the product exists.');
    });
}


delete(id: any) {

  this.afs.collection('/products/').doc(id).delete()
    .then(() => {
      alert(`Deleted Successfully !`);
    }).then(() => {
      this.router.navigate(['/admin/products']);
     
    })
    .catch((error) => {
     
      console.error('Error deleting Product:', error);
      alert('Error deleting product. Please make sure the product exists.');
    });
}



getAll(){
  return this.afs.collection('/products');
}


getProductWithKey(id: string) {
  return this.afs.collection<any>('/products').snapshotChanges().pipe(
    map(actions => actions.map(a => a.payload.doc.data()))
 );
}

async createProductWithId(product: any): Promise<void> {
  try {
    // Create a reference to the specific document in the 'products' collection with the given productId
    const productRef = doc(this.afs.firestore, `/products/${product.id}`);
    
    // setDoc() to create or overwrite the document with your specific ID
    await setDoc(productRef, product);
    console.log(`Product added with ID: ${product.id}`);
    alert(`Product added succefully`);
  } catch (error) {
    console.error("Error adding document with custom ID: ", error);
    throw error; 
  }
}

}




