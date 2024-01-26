import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

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
import { User } from './user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;
  theUser$!:Observable<firebase.User> ;



  constructor(public afAuth: AngularFireAuth,public router : Router ,public afs: AngularFirestore,) {
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
  return this.AuthLogin(new auth.GoogleAuthProvider()).then(res=>{
    let returnUrl = localStorage.getItem('returnUrl')
    this.router.navigateByUrl(returnUrl?? '/');
    
  });
}

googleSignIn() {
  return this.afAuth.signInWithPopup(new GoogleAuthProvider).then(res => {
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





  


