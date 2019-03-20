import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from './../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public error = {
    email: '',
    name: '',
    password: ''
  };
  private errorStatusSub: Subscription;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.errorStatusSub = this.authService.getErrorListener().subscribe(
      errorStatus => {
        this.error = errorStatus;
      }
    );
  }

  onSignup(form: NgForm) {
    if(form.invalid) {
      return;
    }
    this.authService.createUser(form.value.email,form.value.name,form.value.password,form.value.password_confirmation);
    // console.log(form);
  }

  onKeyEmail(event: any) {
    this.error.email = '';
  }
  onKeyName(event: any) {
    this.error.name = '';
  }
  onKeyPassword(event: any) {
    this.error.password = '';
  }

}
