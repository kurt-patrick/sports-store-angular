import {
  Injectable
} from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import {
  Observable
} from 'rxjs';
import {
  AuthService
} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url;
    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {

    console.log('AuthGuard.checkLogin() =======================================');

    console.log('this.authService.isLoggedIn: ' + this.authService.isLoggedIn);
    if (this.authService.isLoggedIn) {
      return true;
    }

    this.authService.redirectUrl = url;
    console.log('this.authService.redirectUrl: ' + this.authService.redirectUrl);

    console.log('this.router.navigate([/signin])');
    this.router.navigate(['/signin']);

    return false;
  }

}
