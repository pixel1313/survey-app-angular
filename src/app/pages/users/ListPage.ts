import { Component, OnInit } from "@angular/core";
import { User } from "@app/models";
import { AccountService } from "@app/services";
import { first } from "rxjs";

@Component({ templateUrl: 'ListPage.html' })
export class ListPage implements OnInit {
    users?: any[];

    constructor(private accountService: AccountService) {}

    ngOnInit() {
        this.accountService.getAll()
            .pipe(first())
            .subscribe((response) => {
                console.log(response);
                this.users = response['hydra:member'];
            });
    }

    deleteUser(id: string) {
        const user = this.users!.find(x => x.id === id);
        user.isDeleting = true;
        this.accountService.delete(id)
            .pipe(first())
            .subscribe(() => this.users = this.users!.filter(x => x.id !== id));
    }
}