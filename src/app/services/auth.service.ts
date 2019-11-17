import { Injectable } from '@angular/core';
import { UserAccount } from '../models/user-account';
import { Observable, of, BehaviorSubject, throwError } from 'rxjs';
import { tap, delay, map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<UserAccount>;
  public currentUser: Observable<UserAccount>;

  redirectUrl: string;

  constructor(private router: Router, private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<UserAccount>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get isLoggedIn(): boolean {
    return this.currentUserValue !== null && this.currentUserValue.id >= 1;
  }

  public get currentUserValue(): UserAccount {
      return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    return this.http.post<UserAccount>(`${environment.apiUrl}/users/authenticate`, { email, password })
      .pipe(map(model => {
        localStorage.setItem('currentUser', JSON.stringify(model));
        this.currentUserSubject.next(model);
        return model;
      }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    if (!this.redirectUrl || this.redirectUrl.trim().length === 0) {
      this.redirectUrl = '/home';
    }
    console.log(`this.router.navigate([${this.redirectUrl}]);`);
    this.router.navigate([this.redirectUrl]);
    this.redirectUrl = null;
  }

}
