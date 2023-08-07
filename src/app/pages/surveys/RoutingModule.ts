import { RouterModule, Routes } from "@angular/router";
import { ListPage } from "./ListPage";
import { NgModule } from "@angular/core";
import { ViewPage } from "./ViewPage";


const routes: Routes = [
    { path: '', component: ListPage },
    { path: ':id', component: ViewPage },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RoutingModule {}