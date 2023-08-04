import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SurveyListComponent } from './pages/survey-list/SurveyListPage';
import { SurveyComponent } from './pages/survey/SurveyPage';
import { LoginPage } from './pages/login/LoginPage';
import { HomePage } from './pages/home/HomePage';
import { AuthGuard } from './security';
import { RegisterPage } from './pages/register/RegisterPage';
import { DashboardPage } from './pages/dashboard/DashboardPage';

const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'dashboard', component: DashboardPage },
  { path: 'login', component: LoginPage },
  { path: 'register', component: RegisterPage },
  { path: 'surveys', component: SurveyListComponent, canActivate: [AuthGuard] },
  { path: 'survey/:id', component: SurveyComponent },
  { path: '**', redirectTo: '/surveys', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
