import { Component, OnInit } from "@angular/core";
import { Survey } from "@app/models";
import { SurveyService } from "@app/services";
import { first } from "rxjs";

@Component({ templateUrl: './SurveyListPage.html' })
export class SurveyListPage implements OnInit {
    surveys?: Survey[] = [];
    totalItems = 0;

    page = 1;
    pageSize = 5;

    constructor(
        private surveyService: SurveyService
    ) {}

    ngOnInit(): void {
        this.refreshSurveys();
    }

    refreshSurveys() {
        this.surveyService.getSurveys(this.page, this.pageSize)
            .pipe(first())
            .subscribe(response => {
                console.log(response);
                this.surveys = response['hydra:member'];
                this.totalItems = response['hydra:totalItems'];
            });
    }

    get collectionSize() {
        return this.totalItems;
    }
}