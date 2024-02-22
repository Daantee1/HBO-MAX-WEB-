import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterStepOneComponent } from './components/register-step-one/register-step-one.component';
import { RegisterStepTwoComponent } from './components/register-step-two/register-step-two.component';
import { RegisterOrLoginComponent } from './components/register-or-login/register-or-login.component';

import { ProfileSelectComponent } from './components/profile-select/profile-select.component';
import { ProfileAddComponent } from './components/profile-select/profile-add/profile-add.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { SearchComponent } from './components/search/search.component';


export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {path: 'home', component: HomeComponent},
    {path: 'login-page', component: LoginPageComponent},
    {path: 'register-step-one', component: RegisterStepOneComponent},
    {path: 'register-step-two',component: RegisterStepTwoComponent},
    {path: 'register-or-login', component: RegisterOrLoginComponent},
    {path: 'profile-select', component: ProfileSelectComponent},
    {path: 'profile-select/profile-add', component: ProfileAddComponent},
    {path: 'details/:id', component: MovieDetailComponent},
    {path: 'search', component: SearchComponent}
  
];
