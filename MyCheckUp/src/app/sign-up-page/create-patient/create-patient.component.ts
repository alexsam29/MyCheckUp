import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-create-patient',
  templateUrl: './create-patient.component.html',
  styleUrls: ['./create-patient.component.css']
})
export class CreatePatientComponent implements OnInit {
  fail: boolean = false;
  success: boolean = false;
  loading: boolean = true;
  message: string = '';

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {}

  onSubmit(signUpForm: NgForm) {
    console.log(signUpForm.value.gender);
    if (signUpForm.valid) {
      this.userService
        .registerPatient(
          signUpForm.value.firstName,
          signUpForm.value.lastName,
          signUpForm.value.email,
          signUpForm.value.password1,
          signUpForm.value.dateOfBirth,
          signUpForm.value.healthCardNum,
          signUpForm.value.gender
        )
        .subscribe(
          (data) => {
            this.success = true;
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
    }
  }
}
