import { Component, Inject, OnInit, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  @Input() email: string;
  @Input() password: string;
  alertMessage: string;
  modalTitle: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private storeService: StoreService) {
    this.modalTitle = data.title;
    console.log(data);
  }

  ngOnInit() {
    this.email = '';
    this.password = '';
    this.alertMessage = '';
  }

  createAccount() {

  }

  signIn(): boolean {
    if (!this.validateDetails()) {
      return false;
    }
    const userAccount = this.storeService.getUserAccount(this.email, this.password);
    if (userAccount == null) {
      this.alertMessage = 'Invalid email or password';
      return false;
    }

    return true;
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
    const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return regexp.test(search);
  }

}
