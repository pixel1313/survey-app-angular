import { Component, Input, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { QuestionBase } from "@app/models";
import { AlertService, QuestionControlService, SurveyService } from "@app/services";
import { DynamicFormQuestionComponent } from "@app/components";
import { ActivatedRoute, Router } from "@angular/router";
import { first } from "rxjs";


@Component({ templateUrl: './ViewPage.html', providers: [QuestionControlService]})
export class ViewPage implements OnInit {
    @Input() questions: QuestionBase<string>[] | null = [];
    payload = '';

    form!: FormGroup;
    id?: string;
    title!: string;
    loading = false;
    submitting = false;
    submitted = false;

    constructor(
        private qcs: QuestionControlService,
        private route: ActivatedRoute,
        private router: Router,
        private surveyService: SurveyService,
        private alertService: AlertService
    ) {}

    ngOnInit(): void {
        this.id = this.route.snapshot.params['id'];

        //TODO: redirect on invalid survey id.
        if(!this.id) {
            this.id = '0';
        }

        this.surveyService.getById(this.id)
        .pipe(first())
        .subscribe(x => {

        });


        this.form = this.qcs.toFormGroup(this.questions as QuestionBase<string>[]);
    }

    onSubmit() {
        this.payload = JSON.stringify(this.form.getRawValue());
    }
}