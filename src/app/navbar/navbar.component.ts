import { AppUser } from './../models/user';
import { AuthService } from './../services/auth.service';
import { User } from '../models/user';
import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { map, switchMap } from 'rxjs/operators';
import { AdminAuthGuardService } from '../services/admin-auth-guard.service';


@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  user$=this.authService.theUser$;
  appUser!:AppUser;
  isadmin$ =this.adminguard.canActivate();
  //private unsubscribe$ = new Subject<void>();

  
  constructor(public authService: AuthService ,public adminguard:AdminAuthGuardService) {}
   /*  this.authService.AppUser$.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe({
      next: (appUser) => {
        this.appUser = appUser;
      },
      error: (error) => {
        console.error('Failed to fetch AppUser', error);
        // Handle the error appropriately
      }
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  } */
}