import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, map } from "rxjs";
import { parseTemplate } from "url-template";

export abstract class AbstractService {
    private baseUrl = 'http://localhost:8000';
    private urlTemplate = '';
    private httpOptions = {};

    totalItems = 0;

    constructor(protected http: HttpClient, urlTemplate: string, httpHeaders?: HttpHeaders) {
        this.urlTemplate = this.baseUrl + urlTemplate;

        if(httpHeaders) {
            this.httpOptions = { httpHeaders };
        }
    }

    protected getCollection<T>(page: number, itemsPerPage: number = 10): Observable<T[]> {
        let urlTemplate = parseTemplate(this.urlTemplate);
        let url = urlTemplate.expand({
            page: page,
            itemsPerPage: itemsPerPage,
        });

        return this.http.get<any>(url, this.httpOptions).pipe(
            map(res => {
                this.totalItems = res['hydra:totalItems'];
                console.log(res);
                return res['hydra:member'] as T[];
            })
        );
    }

    protected getOne<T>(id: number|string): Observable<T> {
        let urlTemplate = parseTemplate(this.urlTemplate);
        let url = urlTemplate.expand({
            id: id,
        });

        return this.http.get<any>(url).pipe(
            map(res => {
                console.log(res);
                return res as T;
            })
        );
    }
}