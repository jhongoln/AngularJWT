import { Routes } from '@angular/router';
import { LoginComponent} from './modules/auth/pages/login/login.component'
import { HomeComponent } from './modules/auth/pages/home/home.component'

import {authGuard} from './guards/auth.guard';


export const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'home',
        canActivate: [authGuard],
        component: HomeComponent
    }
];
