import { User } from '../models/user';
import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';



@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  user$=this.authService.theUser$;
  constructor(public authService: AuthService) {}


}
