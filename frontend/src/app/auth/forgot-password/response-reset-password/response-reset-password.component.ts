import { ActivatedRoute, ParamMap } from '@angular/router';
import { ResetPasswordService } from './../reset-password.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-response-reset-password',
  templateUrl: './response-reset-password.component.html',
  styleUrls: ['./response-reset-password.component.scss']
})
export class ResponseResetPasswordComponent implements OnInit {
  private token: string;
  private errorStatusSub: Subscription;
  public error = {
    email: '',
    password: ''
  };
  constructor(private resetPasswordService: ResetPasswordService , private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('token')) {
        this.token = paramMap.get('token');
      }
    });
    this.errorStatusSub = this.resetPasswordService.getErrorListener().subscribe(
      errorStatus => {
        this.error = errorStatus;
      }
    );
  }

  onChangePassword(form: NgForm) {
    if(form.invalid) {
      return;
    }
    this.resetPasswordService.chamgePassword(form.value.email , form.value.password , form.value.password_confirmation,this.token);
  }

}
