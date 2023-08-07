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

    relogin(returnUrl: string) {
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigateByUrl(returnUrl);
    }

    logout() {
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/']);
    }

    register(user: User) {
        return this.http.post(`${environment.apiUrl}/api/users`, user);
    }

    getAll() {
        return this.http.get<any>(`${environment.apiUrl}/api/users`);
    }

    getById(id: string) {
        return this.http.get<User>(`${environment.apiUrl}/api/users/${id}`);
    }

    update(id: string, params: any) {
        return this.http.patch(`${environment.apiUrl}/api/users/${id}`, params, { headers: new HttpHeaders({'Content-Type': 'application/merge-patch+json'})})
            .pipe(map(x => {
                // update stored user if the logged in user updated their own record
                if(id == this.userValue?.id) {
                    //update local storage
                    const user = { ...this.userValue, ...params};
                    localStorage.setItem('user', JSON.stringify(user));

                    // publish updated user to subscribers
                    this.userSubject.next(user);
                }
                return x;
            }));
    }

    delete(id: string) {
        return this.http.delete(`${environment.apiUrl}/api/users/${id}`)
            .pipe(map(x => {
                // auto logout if the logged in user deleted their own record
                if(id == this.userValue?.id) {
                    this.logout();
                }
                return x;
            }));
    }
}