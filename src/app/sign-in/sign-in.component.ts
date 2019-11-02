import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  @Input() email: string;
  @Input() password: string;
  alertMessage: string;
  form: FormGroup;
  private formSubmitAttempt: boolean;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.email = '';
    this.password = '';
    this.alertMessage = '';
  }

  createAccount() {

  }

  signIn(): boolean {

    this.formSubmitAttempt = true;

    if (!this.validateDetails()) {
      return false;
    }

    const authenticated = this.authService.login({
      id: 0,
      email: this.email,
      password: this.password
    });

    if (!authenticated) {
      this.alertMessage = 'Invalid email or password';
    }

    return false;
  }

  private validateDetails() {
    this.alertMessage = '';
    if (!this.isEmail(this.email)) {
      this.alertMessage = 'Email address is required';
      return false;
    }

    if (!this.password) {
      this.alertMessage = 'Password is required';
      return false;
    }

    if (this.password.length < 6) {
      this.alertMessage = 'Password must be at least 6 characters';
      return false;
    }

    return true;
  }

  private isEmail(search: string): boolean {
    // tslint:disable-next-line: max-line-length
    const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return regexp.test(search);
  }

}
