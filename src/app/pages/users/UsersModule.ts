import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RoutingModule } from "./RoutingModule";
import { ListPage } from "./ListPage";
import { AddEditPage } from "./AddEditPage";


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RoutingModule,
    ],
    declarations: [
        ListPage,
        AddEditPage,
    ]
})
export class UsersModule {}