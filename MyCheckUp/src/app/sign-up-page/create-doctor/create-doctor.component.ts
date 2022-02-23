import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-doctor',
  templateUrl: './create-doctor.component.html',
  styleUrls: ['./create-doctor.component.css'],
})
export class CreateDoctorComponent implements OnInit {
  fail: boolean = false;
  success: boolean = false;
  loading: boolean = true;
  message: string = '';

  constructor(private router: Router, private userService: UserService) {}
  ngOnInit() {}

  onSubmit(signUpForm: NgForm) {
    console.log(signUpForm.value.gender);
    if (
      signUpForm.valid &&
      signUpForm.value.password1 == signUpForm.value.password2
    ) {
      this.userService
        .registerDoctor(
          signUpForm.value.email,
          signUpForm.value.password1,
          signUpForm.value.firstName,
          signUpForm.value.lastName,
          signUpForm.value.license,
          signUpForm.value.specialty,
          signUpForm.value.title,
          signUpForm.value.phone
        )
        .subscribe(
          (data) => {
            this.success = true;
            this.fail = false;
            this.message = 'Account Successfully Created!';
            setTimeout(() => {
              this.router.navigate(['signin']);
            }, 3000);
          },
          (error) => {
            console.log(error);
            this.message = error.error.error;
            this.fail = true;
          }
        );
    } else {
      this.fail = true;
    }
  }
}
