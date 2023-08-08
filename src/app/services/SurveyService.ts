import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, map } from "rxjs";
import { Survey } from "@app/models";
import { environment } from "@environments/environment";

@Injectable({ providedIn: 'root' })
export class SurveyService {
    
    constructor(
        private http: HttpClient
    ) {}

    getSurveys(page: number, itemsPerPage: number = 10): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/api/surveys?page=${page}&itemsPerPage=${itemsPerPage}`);
    }

    getById(id: string): Observable<Survey> {
        return this.http.get<any>(`${environment.apiUrl}/api/surveys/${id}`);
    }

    update(id: string, params: any) {
        //TODO: update survey.
        return this.http.patch<any>(`${environment.apiUrl}/api/surveys/${id}`, params);
    }

    create(params: any) {
        return this.http.post<any>(`${environment.apiUrl}/api/surveys`, params);
    }

    delete(id: string) {
        return this.http.delete(`${environment.apiUrl}/api/surveys${id}`)
            .pipe(map(x => {
                return x;
            }));
    }
}