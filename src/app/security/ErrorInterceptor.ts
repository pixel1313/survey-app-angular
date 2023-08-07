import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AccountService } from "@app/services";
import { Observable, catchError, throwError } from "rxjs";


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private accountService: AccountService
    ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if([401].includes(err.status) && this.accountService.userValue) {
                // auto logout if 401 response returned from api
                const returnUrl = request.urlWithParams;
                this.accountService.relogin(returnUrl);
            }

            const error = err.error?.message || err.statusText;
            console.error(err);
            return throwError(() => error);
        }));
    }
}