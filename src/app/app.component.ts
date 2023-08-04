import { Component } from '@angular/core';
import { User } from './models';
import { AccountService } from './services';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'survey-app-angular';
  user?: User | null;

  constructor(private accountService: AccountService) {
    this.accountService.user.subscribe(x => this.user = x);
  }

  logout() {
    console.log('appComponent.logout');
    this.accountService.logout();
  }

}
