import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  isLoggedIn$: boolean;

  constructor(private authService: AuthService, private router: Router) {
    console.log('AuthGuard.constructor()');
    this.authService.isLoggedIn.subscribe(value => this.isLoggedIn$ = value);
  }

  canActivate(): boolean {
    console.log('AuthGuard.canActivate()');
    if (this.isLoggedIn$) {
      console.log('isLoggedIn: true');
      return true;
    }
    console.log('isLoggedIn: false');
    this.router.navigate(['/signin']);
    return false;
  }

}
