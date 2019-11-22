import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  private ngxLoadingComms = new BehaviorSubject(false);
  private searchByNameComms = new BehaviorSubject('');

  ngxLoading = this.ngxLoadingComms.asObservable();
  searchByName$ = this.searchByNameComms.asObservable();

  constructor() { }

  showNgxLoading(value: boolean) {
    this.ngxLoadingComms.next(value);
  }

  searchByName(value: string) {
    this.searchByNameComms.next(value);
  }

}
