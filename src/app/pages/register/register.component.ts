import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AccountService } from "@app/services";
import { first } from "rxjs";

@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit {
    form!: FormGroup;
    loading = false;
    submitted = false;
    error?: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService
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

    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        this.error = '';

        if(this.form.invalid) {
            return;
        }

        this.loading = true;
        this.accountService.register(this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.router.navigate(['/login'], {queryParams: { registered: true }});
                },
                error: error => {
                    this.error = error;
                    this.loading = false;
                }
            });
    }
}