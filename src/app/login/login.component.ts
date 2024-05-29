import { AuthService } from './../services/auth.service';
import { Component, Inject } from '@angular/core';

import { Auth } from '@firebase/auth';
import { signInWithPopup, GoogleAuthProvider,getAuth } from "firebase/auth";
import { AngularFireAuth} from '@angular/fire/compat/auth';
import * as firebase from 'firebase/compat';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  
  constructor(public AuthService: AuthService) {
  }

  signInWithGoogle() {
    this.AuthService.GoogleAuth()
  }

  signInWithFacebook(){
    this.AuthService.signInWithFacebook()
  }


}
