import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SurveyListComponent } from './pages/survey-list/survey-list.component';
import { SurveyComponent } from './pages/survey/survey.component';

const routes: Routes = [
  { path: 'surveys', component: SurveyListComponent },
  { path: 'survey/:id', component: SurveyComponent },
  { path: '', redirectTo: '/surveys', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
