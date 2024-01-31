import { Auth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{
 

  constructor(public auth :AuthService , private router:Router ,private route :ActivatedRoute) { }


  canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot){
    return this.auth.theUser$.pipe(map(user=>{
    if (user) return true ;
    let returnUrl = state.url;
    localStorage.setItem('returnUrl', returnUrl);
    console.log(returnUrl);
     this.router.navigate(['/login'],{queryParams:{returnUrl :state.url}});
    
     return false;
    }))
  }
  



}
