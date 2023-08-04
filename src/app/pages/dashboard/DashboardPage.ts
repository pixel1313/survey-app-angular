import { Component } from "@angular/core";
import { User } from "@app/models";
import { AccountService } from "@app/services";


@Component({ templateUrl: 'DashboardPage.html' })
export class DashboardPage {
    user: User | null;

    constructor(private accountService: AccountService) {
        this.user = this.accountService.userValue;
    }
}