import { Injectable } from '@angular/core';
import { UserAccount } from '../models/user-account';
import { MOCK_USERS } from '../models/mock-user-accounts';
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = false;
  redirectUrl: string;

  constructor(private router: Router) {}

  login(user: UserAccount): Observable<boolean> {

    console.log('AuthService.login() =======================================');

    const match = MOCK_USERS.find( ({email: username, password}) =>
      username === user.email && password === user.password);

    this.isLoggedIn = match !== null;
    console.log('authenticated: ' + this.isLoggedIn);

    console.log('this.redirectUrl: ' + this.redirectUrl);
    if (this.redirectUrl) {
      this.router.navigate([this.redirectUrl]);
      this.redirectUrl = null;
    } else {
      this.router.navigate(['/home']);
    }

    return of(this.isLoggedIn).pipe(
      delay(2000)
    );

    /*
    return of(this.isLoggedIn).pipe(
      delay(2000),
      tap(value => this.isLoggedIn = authenticated)
    );
    */

  }

  logout() {
    this.isLoggedIn = false;
    this.redirectUrl = null;
    // this.router.navigate(['/home']);
  }

}
