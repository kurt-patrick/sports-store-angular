import { Injectable } from '@angular/core';
import { UserAccount } from '../models/user-account';
import { MOCK_USERS } from '../models/mock-user-accounts';
import { throwError, BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(false);
  private loggedInUser = new BehaviorSubject<UserAccount>(null);

  constructor(private router: Router) {}

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  login(user: UserAccount): boolean {
    const match = MOCK_USERS.find( ({email: username, password}) =>
      username === user.email && password === user.password);

    const authenticated = match !== null;

    this.loggedIn.next(authenticated);
    this.loggedInUser.next(match);

    this.router.navigate(['/home']);

    return authenticated;
  }

  logout() {
    this.loggedIn.next(false);
    this.router.navigate(['/home']);
  }

}
