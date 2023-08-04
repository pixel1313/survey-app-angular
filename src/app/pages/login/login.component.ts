import { Component } from "@angular/core";
import { AuthenticationService } from "src/app/services/authentication.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
})
export class LoginComponent {
    isLoading = false;

    constructor(private authenticationService: AuthenticationService) {}

    handleLogin() {
        this.isLoading = true;

        // TODO: actual login logic.

        this.isLoading = false;
    }
}