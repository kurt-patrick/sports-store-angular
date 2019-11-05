import { SignInComponent } from '../sign-in/sign-in.component';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  constructor(public authService: AuthService, private router: Router) {
    // this.authService.isLoggedIn.subscribe(value => this.isLoggedIn$ = value);
  }

  @Input() searchValue: string;

  ngOnInit() {}

  // https://www.c-sharpcorner.com/article/components-menus-in-angular-6-part-two/
  search(): void {
    this.router.navigate(['search']);
  }


}
