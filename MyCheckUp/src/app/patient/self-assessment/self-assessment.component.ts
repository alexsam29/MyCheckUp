import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-self-assessment',
  templateUrl: './self-assessment.component.html',
  styleUrls: ['./self-assessment.component.css'],
})
export class SelfAssessmentComponent implements OnInit, OnDestroy {
  user: any;
  symptoms: any;
  symptomsID: any;
  symptomsSelected: any;
  appointment: any;
  appointmentId: any;
  doctor: any;
  complete: boolean = false;
  message: string = '';
  success: boolean = false;
  id: any;
  desc: any;
  errors: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnDestroy(): void {
    if (!this.complete) {
      this.userService.deleteAppointment(this.appointmentId).subscribe();
    }
  }

  ngOnInit(): void {
    this.userService.getPatientProfile().subscribe(
      (profile) => {
        this.user = profile;
      },
      (error) => {
        this.errors = true;
      }
    );
    this.userService.getSelfAssessment().subscribe(
      (sym) => {
        this.symptoms = sym;
        console.log(this.symptoms);
      },
      (error) => {
        this.errors = true;
      }
    );

    this.appointmentId = this.route.snapshot.paramMap.get('id');
    this.userService
      .getAppointment(this.appointmentId)
      .subscribe((appointment) => {
        this.appointment = appointment;
        this.userService
          .getDoctorbyID(this.appointment.doctorId)
          .subscribe((doctorInfo) => {
            this.doctor = doctorInfo;
          });
      });
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.complete = true;
      var assessment = {
        notes: form.value.note,
        symptomIds: form.value.symptomsSelected,
      };

      this.userService
        .sendSelfassessment(assessment, this.appointmentId)
        .subscribe((res) => {
          setTimeout(() => {
            this.success = true;
            this.message = 'Appointment Confirmed!'
            this.router.navigate(['dashboard']);
          }, 3000);
        });
    }
  }
}
