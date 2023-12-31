import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AccountService, AlertService } from "@app/services";
import { first } from "rxjs";

@Component({ templateUrl: 'RegisterPage.html' })
export class RegisterPage implements OnInit {
    form!: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService
    ) {
        // redirect to home if already logged in
        if(this.accountService.userValue) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            username: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(8)]],
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alert on submit
        this.alertService.clear();

        // stop here if form is invalid
        if(this.form.invalid) {
            return;
        }

        this.loading = true;
        this.accountService.register(this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login'], {queryParams: { registered: true }});
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }
}