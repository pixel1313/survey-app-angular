import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RoutingModule } from "./RoutingModule";
import { ListPage } from "./ListPage";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        RoutingModule,
    ],
    declarations: [
        ListPage,
    ],
})
export class SurveysModule {}