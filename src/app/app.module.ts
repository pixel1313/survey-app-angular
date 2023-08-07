import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// interceptors
import { ErrorInterceptor, JsonInterceptor, TokenInterceptor } from './security';

// components
import { AlertComponent } from './components';

// pages
import { DashboardPage, HomePage, LoginPage, RegisterPage } from './pages';

@NgModule({
  declarations: [
    // components
    AlertComponent,
    //DynamicFormQuestionComponent,
    // pages
    AppComponent,
    LoginPage,
    RegisterPage,
    HomePage,
    DashboardPage,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JsonInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
