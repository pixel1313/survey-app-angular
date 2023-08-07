import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environments/environment";
import { Observable } from "rxjs";

@Injectable()
export class JsonInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const isApiUrl = request.url.startsWith(environment.apiUrl);

        if(isApiUrl) {
            request = request.clone({
                setHeaders: {
                    Accept: 'application/ld+json'
                }
            });
        }

        return next.handle(request);
    }
}