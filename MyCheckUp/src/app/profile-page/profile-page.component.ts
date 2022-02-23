import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
})
export class ProfilePageComponent implements OnInit {
  fail: boolean = false;
  success: boolean = false;
  loading: boolean = true;
  message: string = '';
  errors: boolean = false;
  user: any;
  doc:any;
  fullAddress: string[] = [];

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getPatientProfile().subscribe(
      (profile) => {
        this.user = profile;
        this.fullAddress = this.user.address.split(',', 4);
      },
      (error) => {
        this.errors = true;
      }
    );
  }

  onSubmit(EditProForm: NgForm) {
    var address =
      EditProForm.value.address +
      ',' +
      EditProForm.value.city +
      ',' +
      EditProForm.value.province +
      ',' +
      EditProForm.value.pcode;

    if (EditProForm.valid) {
      this.userService
        .editprofile(
          this.user.id,
          EditProForm.value.email,
          EditProForm.value.firstName,
          EditProForm.value.lastName,
          EditProForm.value.phone,
          address,
          EditProForm.value.gender
        )
        .subscribe(
          (data) => {
            this.success = true;
            this.message = 'Profile Successfully Updated!';
            setTimeout(() => {
              this.router.navigate(['dashboard']);
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
