import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'sports-store-angular';
  loading: boolean;
  routerUrl: string;

  constructor(private router: Router) {
    router.events.subscribe((event: RouterEvent) => {
      this.checkRouterEvent(event);
    });
  }

  ngOnInit() {
  }

  private checkRouterEvent(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.loading = true;
    }

    const stopRouting =
      event instanceof NavigationEnd ||
      event instanceof NavigationCancel ||
      event instanceof NavigationError;

    if (stopRouting) {
      this.loading = false;
    }

    this.routerUrl = this.router.url;
  }

}
