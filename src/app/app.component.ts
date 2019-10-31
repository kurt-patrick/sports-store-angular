import { Component, OnInit } from '@angular/core';
import { MessagingService } from './services/messaging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'sports-store-angular';
  loading: boolean;

  constructor(private messagingService: MessagingService) { }

  ngOnInit() {
    this.messagingService.ngxLoading.subscribe(value => this.loading = value);
  }

}
