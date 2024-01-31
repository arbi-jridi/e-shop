import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
   constructor(private router: Router, private auth:AuthService){
auth.theUser$.subscribe(user =>{
  if(user) {
    this.auth.saveUser(user);
    this.auth.SetUserData(user);
  }
})

  } 
}
