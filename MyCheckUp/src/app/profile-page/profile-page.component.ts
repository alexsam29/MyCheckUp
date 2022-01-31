import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  fail: boolean = false;
  success: boolean = false;
  loading: boolean = true;
  message: string = '';

  constructor(private router: Router, private userService: UserService) {}


  ngOnInit(): void {}

  onSubmit(EditProForm: NgForm) {
    if (EditProForm.valid) {
      this.userService
        .editprofile(
          EditProForm.value.firstName,
          EditProForm.value.email,
          EditProForm.value.gender,
          EditProForm.value.dateOfBirth,
          EditProForm.value.healthcard,
          EditProForm.value.phone,
          EditProForm.value.adress,
          EditProForm.value.city,
          EditProForm.value.province,
          EditProForm.value.pcode,
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

