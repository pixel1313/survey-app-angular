import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RoutingModule } from "./RoutingModule";
import { ListPage } from "./ListPage";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AddEditPage } from "./AddEditPage";
import { ViewPage } from "./ViewPage";
import { DynamicFormQuestionComponent } from "@app/components";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        RoutingModule,
    ],
    declarations: [
        //pages
        ListPage,
        AddEditPage,
        ViewPage,
        //components
        DynamicFormQuestionComponent,
    ],
})
export class SurveysModule {}