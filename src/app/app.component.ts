import { Component, OnInit } from '@angular/core';
import { MessagingService } from './services/messaging.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'sports-store-angular';
  loading: boolean;
  routerUrl: string;

  constructor(private messagingService: MessagingService, private router: Router) {
    this.setRouterUrl();
  }

  ngOnInit() {
    this.messagingService.ngxLoading.subscribe(value => this.loading = value);
    this.router.events.subscribe(value => this.setRouterUrl());
  }

  private setRouterUrl(): void {
    this.routerUrl = this.router.url;
  }

}
