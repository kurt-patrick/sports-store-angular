import { MatDialog, MatDialogConfig } from '@angular/material';
import { SignInComponent } from '../sign-in/sign-in.component';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public dialog: MatDialog, private router: Router) {}

  @Input() searchValue: string;

  ngOnInit() {}

  openModal() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '480px';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: 1,
      title: 'Sign In'
    };

    const dialogRef = this.dialog.open(SignInComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog was closed');
      console.log(result);
    });

  } // openModal()

  // https://www.c-sharpcorner.com/article/components-menus-in-angular-6-part-two/
  search(): void {
    this.router.navigate(['search']);
  }


}
