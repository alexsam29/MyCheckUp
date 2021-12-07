import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { ILogin } from 'src/app/interfaces/login';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  loginFail: boolean = false;
  message: string = '';
  returnUrl: string = '';
  model: ILogin = { userid: '', password: '' };

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.returnUrl = '/dashboard';
    this.authenticationService.logout();
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.authenticationService
        .login(form.value.email, form.value.psw)
        .subscribe(
          (data) => {
            this.router.navigate([this.returnUrl]);
          },
          (err) => {
            if(err.status == 400)
            {
              this.message = "Incorrect email and/or password."
            }
            else{
              this.message = "Server issue, unable to login at this time."
            }
            console.log(err)
            this.loginFail = true;
          }
        );
    }
  }
}
