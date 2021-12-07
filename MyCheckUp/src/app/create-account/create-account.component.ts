import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css'],
})
export class CreateAccountComponent implements OnInit {
  fail: boolean = false;
  success: boolean = false;
  loading: boolean = true;
  message: string = '';

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {}

  onSubmit(signUpForm: NgForm) {
    if (signUpForm.valid) {
      this.userService
        .register(
          signUpForm.value.firstName,
          signUpForm.value.lastName,
          signUpForm.value.email,
          signUpForm.value.password,
          signUpForm.value.dateOfBirth
        )
        .subscribe(
          (data) => {
            this.success = true;
            this.message = "Account Successfully Created!"
            setTimeout( () => {
             this.router.navigate(['signin']);
          }, 3000);
          },
          (error) => {
            console.log(error);
            this.message = error.error.error;
            this.fail = true;
          }
        );
    }
  }
}
