import { Injectable } from "@angular/core";
import { AbstractService } from "./abstract.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Survey } from "../models/Survey";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class SurveyService extends AbstractService {
    
    constructor(
        http: HttpClient
    ) {
        super(
            http,
            '/api/surveys{.format}{/id}{?page,itemsPerPage}',
            new HttpHeaders({'Content-Type': 'application/json'})
        );
    }

    getSurveys(page: number, itemsPerPage: number = 10): Observable<Survey[]> {
        return this.getCollection<Survey>(page, itemsPerPage);
    }

    getSurvey(id: number|string): Observable<Survey> {
        return this.getOne<Survey>(id);
    }
}