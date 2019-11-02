import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  private ngxLoadingComms = new BehaviorSubject(false);
  ngxLoading = this.ngxLoadingComms.asObservable();

  constructor() { }

  showNgxLoading(value: boolean) {
    this.ngxLoadingComms.next(value);
  }

}
