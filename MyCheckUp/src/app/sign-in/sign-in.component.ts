import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  loginSuccess: boolean = false;
  loginFail: boolean = false;
  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.authenticationService
        .login(form.value.email, form.value.psw)
        .subscribe(
          (data) => {
            this.loginSuccess = true;
          },
          (err) => {
            this.loginFail = true;
          }
        );
    }
  }
}
