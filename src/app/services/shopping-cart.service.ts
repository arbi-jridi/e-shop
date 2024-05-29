
import { setDoc,updateDoc} from '@angular/fire/firestore';
import { takeUntil } from 'rxjs/operators';
import { product } from './../models/product';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Product } from './Product';
import { take } from 'rxjs/operators';


interface CartItem {
  quantity: number;
  product?: Product;
}

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {


  constructor(public afs: AngularFirestore) {
  
   }

  

   private create() {
    const now = new Date();
    const orderId = `ordertime:${now.getHours()}_${now.getMinutes()}--orderdate:${now.getDate()}_${now.getMonth() + 1}_${now.getFullYear()}`;
    return this.afs.collection('/shopping-carts').doc(orderId).set({ creationDate: now.getTime() }).then(()=>orderId);
  }

private getCart(cartId:string){
  return this.afs.collection('/shopping-carts'+cartId)
}


 private async getOrCreateCartId()
 {
  let cartId = localStorage.getItem('cartId')
 
  if (cartId) return cartId;
  
let result = await this.create();

localStorage.setItem('cartId',result);
console.log(cartId) ;
return result;
  
}

async addToCart(product: Product) {
  let cartId = await this.getOrCreateCartId();
  let itemRef = this.afs.doc(`/shopping-carts/${cartId}/items/${product.id}`);

  itemRef.valueChanges().pipe(take(1)).subscribe((item) => {
    const cartItem = item as CartItem | null; // Type assertion

    if (cartItem) {
      itemRef.update({ quantity: cartItem.quantity + 1 });
    } else {
      itemRef.set({ product: product, quantity: 1 });
    }
  });
}


}
