import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  categories$ :any;

  constructor(private db:AngularFireDatabase) { 

     this.db.object('/categories').valueChanges().subscribe(res=>{console.log(res);this.categories$=res;})
 
  }


  get Categories(){
    return this.db.list('/categories')
  }
  
  

}
