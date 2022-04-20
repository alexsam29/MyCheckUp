import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-view-prescriptions',
  templateUrl: './view-prescriptions.component.html',
  styleUrls: ['./view-prescriptions.component.css'],
})
export class ViewPrescriptionsComponent implements OnInit {
  user: any;
  errors: boolean = false;
  prescriptions: any;
  success: boolean = false;
  fail: boolean = false;
  message: string = '';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.getDoctorProfile().subscribe(
      (profile) => {
        this.user = profile;
      },
      (errors) => {
        this.errors = true;
      }
    );
    this.userService.getAllDoctorPrecriptions().subscribe((prescrip) => {
      this.prescriptions = prescrip;
      console.log(this.prescriptions);
    });
  }

  onSubmit(form: NgForm) {
    console.log(form);
    if (form.valid) {
      this.userService
        .createPrecription(
          form.value.patientEmail,
          this.user.id,
          form.value.description,
          form.value.numOfRefill
        )
        .subscribe(
          (data) => {
            this.success = true;
            this.fail = false;
            this.message = 'Prescription Created.';
            console.log(data);
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          },
          (error) => {
            this.message = error.error.error;
            this.fail = true;
          }
        );
    }
  }

  deletePrescription(id: string){
    this.userService.deletePrescription(id).subscribe();
    window.location.reload();
  }

  approve(id: string){
    this.userService.approvePrescription(id).subscribe();
    window.location.reload();
  }
}
