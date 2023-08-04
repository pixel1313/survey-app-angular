import { Component } from "@angular/core";
import { Survey } from "../../models/Survey";
import { SurveyService } from "src/app/services/survey.service";

@Component({
    selector: 'app-survey-list',
    templateUrl: './survey-list.component.html'
})
export class SurveyListComponent {
    surveys: Survey[] = [];

    page = 1;
    pageSize = 5;

    constructor(
        private surveyService: SurveyService
    ) {
        this.refreshSurveys();
    }

    refreshSurveys() {
        this.surveyService.getSurveys(this.page, this.pageSize)
            .subscribe(surveys => {
                this.surveys = surveys;
            });
    }

    get collectionSize() {
        return this.surveyService.totalItems;
    }
}