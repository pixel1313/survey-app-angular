import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    constructor(
        private http: HttpClient
    )
    {}

    public login(email: string, password: string) {
        return this.http.post(
            '/login',
            {
                email: email,
                password: password,
            },
            { headers: new HttpHeaders(
                {'Content-Type': 'application/json'})
            }
        );
    }
}