
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap ,filter,tap} from 'rxjs/operators';



import { Injectable } from '@angular/core';
import { Auth ,signInWithPopup, user, } from '@angular/fire/auth';
import {  GoogleAuthProvider,getAuth, signInWithRedirect } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { from } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {AngularFirestore,AngularFirestoreDocument} from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import * as auth from 'firebase/auth';
import { AppUser, User } from '../models/user';
import { AngularFireDatabase,AngularFireObject } from '@angular/fire/compat/database';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;
  theUser$!:Observable<firebase.User> ;



  constructor(public afAuth: AngularFireAuth,public router : Router ,public afs: AngularFirestore,public db:AngularFireDatabase) {
     /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
        console.log(user);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
    this.theUser$ = afAuth.authState as Observable<firebase.User>;

  }
  
// SAVE USER TO REALTIME DATABSE

saveUser(user:firebase.User) {
this.db.object('/users/'+ user.uid).update({
    user:user.displayName,
    email:user.email
})
}

getUser(uid:string):AngularFireObject<AppUser>{
  return this.db.object('/users/' + uid)
}

//didn't work nevermind
/* get AppUser$(): Observable<AppUser> {
  return this.theUser$.pipe(
    switchMap(user => this.getUser(user.uid).valueChanges()),
    map(user => ({...user, isAdmin: user?.isAdmin ?? false})), // Default isAdmin to false if undefined
    tap(user => console.log(user)), // Add this line to log the user object
    filter((user): user is AppUser => user !== null)
  );
} */

  
// SAVE USER TO FIRESTORE DATABSE
  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }



// Sign in with Google this work
GoogleAuth() {
  return this.AuthLogin(new auth.GoogleAuthProvider()).then((res:any)=>{
    let returnUrl = localStorage.getItem('returnUrl');
    this.router.navigateByUrl(returnUrl?? '/');
    this.saveUser(res.user);
    this.SetUserData(user);
  });
}

googleSignIn() {
  return this.afAuth.signInWithPopup(new GoogleAuthProvider).then((res:any) => {
    localStorage.setItem('token',JSON.stringify(res.user));
  }, err => {
    alert(err.message);
  })
}



// Auth logic to run auth providers
AuthLogin(provider: any) {
  return this.afAuth.signInWithPopup(provider).then((result) => {
 
      //alert('You have been successfully logged in!');
      this.SetUserData(result.user);
      alert(this.userData.displayName);
      localStorage.setItem('logged', JSON.stringify(this.userData));
      console.table(user);
  }).catch((error) => {
      console.log(error);
  });
}




// Sign out

  // sign out
  logout() {
    this.afAuth.signOut().then( () => {
      localStorage.removeItem('token');
      localStorage.removeItem('logged');
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
    })
  }






  }





  


