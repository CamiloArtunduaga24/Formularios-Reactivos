import { Router, RouterModule, Routes } from "@angular/router";
import { ReactiveComponent } from "./pages/reactive/reactive.component";
import { TemplateComponent } from './pages/template/template.component';



const APP_ROUTES: Routes = [
    {path: '**', pathMatch:'full', redirectTo:'reactive'},
    {path: 'template', component: TemplateComponent},
    {path: 'reactive', component: ReactiveComponent},
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);