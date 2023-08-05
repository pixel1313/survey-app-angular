import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SurveyListPage } from './pages/survey-list/SurveyListPage';
import { SurveyComponent } from './pages/survey/SurveyPage';
import { LoginPage } from './pages/login/LoginPage';
import { HomePage } from './pages/home/HomePage';
import { AuthGuard } from './security';
import { RegisterPage } from './pages/register/RegisterPage';
import { DashboardPage } from './pages/dashboard/DashboardPage';

const usersModule = () => import('./pages/users/UsersModule').then(x => x.UsersModule);

const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'dashboard', component: DashboardPage },
  { path: 'login', component: LoginPage },
  { path: 'register', component: RegisterPage },
  
  { path: 'users', loadChildren: usersModule, canActivate: [AuthGuard]},

  { path: 'surveys', component: SurveyListPage, canActivate: [AuthGuard] },
  { path: 'survey/:id', component: SurveyComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '/surveys', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
