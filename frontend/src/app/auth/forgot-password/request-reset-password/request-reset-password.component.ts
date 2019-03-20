import { ResetPasswordService } from './../reset-password.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-request-reset-password',
  templateUrl: './request-reset-password.component.html',
  styleUrls: ['./request-reset-password.component.scss']
})
export class RequestResetPasswordComponent implements OnInit {

  constructor(private resetPasswordService: ResetPasswordService) { }

  ngOnInit() {
  }

  onSendEmail(form: NgForm) {
    if(form.invalid) {
      return;
    }
    this.resetPasswordService.sendEmail(form.value.email);
  }

}
