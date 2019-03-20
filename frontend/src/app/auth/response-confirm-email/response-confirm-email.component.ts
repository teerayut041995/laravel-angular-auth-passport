import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth.service';
import { ActivatedRoute , ParamMap } from '@angular/router';

@Component({
  selector: 'app-response-confirm-email',
  templateUrl: './response-confirm-email.component.html',
  styleUrls: ['./response-confirm-email.component.scss']
})
export class ResponseConfirmEmailComponent implements OnInit {
  private token: string;

  constructor(private authService: AuthService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('token')) {
        this.token = paramMap.get('token');
        this.authService.verifyEmail(this.token);
      }
    });
  }

}
