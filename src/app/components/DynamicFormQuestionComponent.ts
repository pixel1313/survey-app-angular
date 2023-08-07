import { Component, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { QuestionBase } from "@app/models";


@Component({
    selector: 'app-question',
    templateUrl: './DynamicFormQuestionComponent.html'
})
export class DynamicFormQuestionComponent {
    @Input() question!: QuestionBase<string>;
    @Input() form!: FormGroup
    get isValid() { return this.form.controls[this.question.key].valid; }
}