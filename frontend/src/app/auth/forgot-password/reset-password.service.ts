import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
const BACKEND_URL = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {
  private errorListener = new Subject<any>();

  constructor(private http: HttpClient , private route: Router) { }

  getErrorListener() {
    return this.errorListener.asObservable();
  }

  sendEmail(email: string) {
    const data = {email: email};
    this.http.post(BACKEND_URL+'/sendPasswordResetLink',data)
      .subscribe(response => {
        console.log(response);
        this.route.navigate(['/auth/password/reset/done']);
      } , error => {
        console.log(error);
      });
  }

  chamgePassword(email: string , password: string,password_confirmation: string , token: string) {
    const data = {email: email, password: password,password_confirmation,token: token};
    console.log(data);
    this.http.post(BACKEND_URL+'/resetPassword' , data)
      .subscribe(response => {
        console.log(response);
        this.route.navigate(['/auth/login']);
      } , error => {
        console.log(error);
        this.errorListener.next(error.error.error);
      });
  }
}
