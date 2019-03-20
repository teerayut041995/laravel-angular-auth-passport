import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

// const BACKEND_URL = environment.apiUrl + '/user/';
const BACKEND_URL = 'http://127.0.0.1:8000/api';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private token: string;
  private authStatusListener = new Subject<boolean>();
  private isAuthenticated = false;
  private tokenTimer: any;
  private errorListener = new Subject<any>();
  constructor(private http: HttpClient , private router: Router) {}

  getErrorListener() {
    return this.errorListener.asObservable();
  }

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListerner() {
    return this.authStatusListener.asObservable();
  }

  createUser(email: string , name: string , password: string , password_confirmation: string) {
    const data = {email: email , name: name , password: password , password_confirmation: password_confirmation};
    this.http.post(BACKEND_URL + '/register' , data)
      .subscribe(response => {
        this.router.navigate(['auth/confirm-email']);
        console.log('data' , response);
      } , error => {
        console.log(error.error.error);
        this.errorListener.next(error.error.error);
      });
  }

  verifyEmail(token: string) {
    const data = {token: token};
    console.log(data);
    this.http.post(BACKEND_URL + '/email/verify' , data)
      .subscribe(response => {
        console.log('data' , response);
      } , error => {
        console.log(error);
      });
  }

  login(email: string , password: string) {
    const data = {email: email, password: password};
    this.http.post<{access_token: string , expiresIn: number}>(BACKEND_URL + '/login' , data)
      .subscribe(response => {
        const token = response.access_token;
        this.token = token;
        if (token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          // console.log(expirationDate);
          this.saveAuthData(token , expirationDate);
          this.router.navigate(['/']);
          console.log(response);
        }
      } , error => {
        console.log(error);
      });
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout() {
    this.http.get<{access_token: string , expiresIn: number}>(BACKEND_URL + '/logout')
      .subscribe(response => {
        this.token = null;
        this.isAuthenticated = false;
        this.authStatusListener.next(false);
        clearTimeout(this.tokenTimer);
        this.clearAuthData();
        this.router.navigate(['/']);
        console.log(response);
      } , error => {
        console.log(error);
      });
  }

  private setAuthTimer(duration: number) {
    console.log('Setting timer: ' + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string , expirationDate: Date) {
    localStorage.setItem('token' , token);
    localStorage.setItem('expiration' , expirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    if (!token || !expirationDate) {
      return;
    } else {
      return {
        token: token,
        expirationDate: new Date(expirationDate)
      };
    }
  }

}
