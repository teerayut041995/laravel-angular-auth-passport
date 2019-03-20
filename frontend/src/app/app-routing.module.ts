import { AuthGuard } from './auth/ault.guard';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { RequestConfirmEmailComponent } from './auth/request-confirm-email/request-confirm-email.component';
import { ResponseConfirmEmailComponent } from './auth/response-confirm-email/response-confirm-email.component';
import { ProfileComponent } from './profile/profile.component';
import { RequestResetPasswordComponent } from './auth/forgot-password/request-reset-password/request-reset-password.component';
import { ResponseResetPasswordComponent } from './auth/forgot-password/response-reset-password/response-reset-password.component';
import {
  RequestResetPasswordDoneComponent
} from './auth/forgot-password/request-reset-password-done/request-reset-password-done.component';


const routes: Routes = [
  { path: '' , component: HomeComponent },
  { path: 'profile' , component: ProfileComponent , canActivate: [AuthGuard] },
  { path: 'auth/signup' , component: SignupComponent },
  { path: 'auth/login' , component: LoginComponent },
  { path: 'auth/confirm-email' , component: RequestConfirmEmailComponent},
  { path: 'auth/confirm-email/:token' , component: ResponseConfirmEmailComponent},
  { path: 'auth/password/reset' , component: RequestResetPasswordComponent},
  { path: 'auth/password/reset/done' , component: RequestResetPasswordDoneComponent},
  { path: 'auth/password/reset/:token' , component: ResponseResetPasswordComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
