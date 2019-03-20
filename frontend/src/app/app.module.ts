import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './auth/login/login.component';
import { RequestConfirmEmailComponent } from './auth/request-confirm-email/request-confirm-email.component';
import { ResponseConfirmEmailComponent } from './auth/response-confirm-email/response-confirm-email.component';
import { AuthInterceptor } from './auth/auth-interceptor';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { RequestResetPasswordComponent } from './auth/forgot-password/request-reset-password/request-reset-password.component';
import { RequestResetPasswordDoneComponent } from './auth/forgot-password/request-reset-password-done/request-reset-password-done.component';
import { ResponseResetPasswordComponent } from './auth/forgot-password/response-reset-password/response-reset-password.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    HeaderComponent,
    LoginComponent,
    RequestConfirmEmailComponent,
    ResponseConfirmEmailComponent,
    HomeComponent,
    ProfileComponent,
    RequestResetPasswordComponent,
    RequestResetPasswordDoneComponent,
    ResponseResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS , useClass: AuthInterceptor , multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
