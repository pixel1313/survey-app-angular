import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListPage } from "./ListPage";
import { AddEditPage } from "./AddEditPage";


const routes: Routes = [
    { path: '', component: ListPage },
    { path: 'add', component: AddEditPage },
    { path: 'edit/:id', component: AddEditPage },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RoutingModule {}