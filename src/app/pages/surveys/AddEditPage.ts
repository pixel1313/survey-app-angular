import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AccountService, AlertService, SurveyService } from "@app/services";
import { first } from "rxjs";


@Component({ templateUrl: 'AddEditPage.html' })
export class AddEditPage implements OnInit {
    form!: FormGroup;
    id?: string;
    title!: string;
    loading = false;
    submitted = false;
    submitting = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private surveyService: SurveyService,
        private accountService: AccountService,
        private alertService: AlertService
    ) {}

    ngOnInit(): void {
        this.id = this.route.snapshot.params['id'];

        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            // TODO: add questions.
        });

        this.title = 'Add Survey';

        if(this.id) {
            // edit mode
            this.title = 'Edit Survey';
            this.loading = true;
            this.surveyService.getById(this.id)
                .pipe(first())
                .subscribe(x => {
                    this.form.patchValue(x);
                    this.loading = false;
                });
        }
    }


    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if(this.form.invalid) {
            return;
        }

        this.submitting = true;
        this.saveSurvey()
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Survey saved', true);
                    this.router.navigateByUrl('/surveys');
                },
                error: error => {
                    this.alertService.error(error);
                    this.submitting = false;
                }
            });
    }

    private saveSurvey() {
        var params = { ...this.form.value, owner: this.accountService.userValue?.id };
        // create or update survey based on id param
        return this.id
            ? this.surveyService.update(this.id!, params)
            : this.surveyService.create(params);
    }
}