import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "@app/models/User";
import { environment } from "@environments/environment";
import { BehaviorSubject, Observable, map } from "rxjs";


@Injectable({ providedIn: 'root' })
export class AccountService {
    private userSubject: BehaviorSubject<User | null>;
    public user: Observable<User | null>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
        this.user = this.userSubject.asObservable();
    }

    public get userValue() {
        return this.userSubject.value;
    }

    login(email: string, password: string) {
        return this.http.post<User>(
            `${environment.apiUrl}/login`,
            {
                email: email,
                password: password
            },
            {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json'
                })
            }).pipe(map(user => {
                localStorage.setItem('user', JSON.stringify(user));
                this.userSubject.next(user);
                return user;
            }));
    }

    logout() {
        console.log('AccountService.logout()');
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/']);
    }
}