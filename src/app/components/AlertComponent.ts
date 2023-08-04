import { Component, OnDestroy, OnInit } from "@angular/core";
import { AlertService } from "@app/services";
import { Subscription } from "rxjs";


@Component({
    selector: 'alert',
    templateUrl: 'AlertComponent.html'
})
export class AlertComponent implements OnInit, OnDestroy {
    private subscription!: Subscription;
    alert: any;

    constructor(private alertService: AlertService) {}

    ngOnInit(): void {
        this.subscription = this.alertService.onAlert()
            .subscribe(alert => {
                switch(alert?.type) {
                    case 'success':
                        alert.cssClass = 'alert alert-success';
                        break;
                    case 'error':
                        alert.cssClass = 'alert alert-danger';
                        break;
                }

                this.alert;
            });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}