import { ActivatedRouteSnapshot, Route, Router, RouterStateSnapshot,CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate{ 

  constructor(private auth:AuthService,private router :Router) { }


/* 
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.auth.theUser$.pipe(
      switchMap(user => {
        return this.auth.getUSer(user.uid).valueChanges();
      }),
      map(appUser => {
        if (appUser && appUser.isAdmin) {
          return true;
        } else {
          this.router.navigate(['/']);
          return false;
        }
      })
    );
  } */

  canActivate(): Observable<boolean> { 
    return this.auth.theUser$.pipe(
      switchMap(user => this.auth.getUser(user.uid).valueChanges()),
      map(appUser => !!appUser && appUser.isAdmin)
    );
  }



}







