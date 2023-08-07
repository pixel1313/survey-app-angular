import { Component, Input, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { QuestionBase } from "@app/models";
import { QuestionControlService } from "@app/services";
import { DynamicFormQuestionComponent } from "@app/components";


@Component({ templateUrl: './ViewPage.html', providers: [QuestionControlService]})
export class ViewPage implements OnInit {
    @Input() questions: QuestionBase<string>[] | null = [];
    form!: FormGroup;
    payload = '';

    constructor(private qcs: QuestionControlService) {}

    ngOnInit(): void {
        this.form = this.qcs.toFormGroup(this.questions as QuestionBase<string>[]);
    }

    onSubmit() {
        this.payload = JSON.stringify(this.form.getRawValue());
    }
}