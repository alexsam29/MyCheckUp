import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.css'],
})
export class BookAppointmentComponent implements OnInit {
  fail: boolean = false;
  success: boolean = false;
  loading: boolean = true;
  message: string = '';
  errors: boolean = false;
  user: any;
  doctors: any;
  availability: any;
  doctorName: string = 'Select a Doctor';
  bookedTimes: any;
  availableTimes: any;
  minDate: any = '';
  calDisabled = true;
  doctorProfile: any;
  dateOfApp: any;
  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getPatientProfile().subscribe(
      (profile) => {
        this.user = profile;
      },
      (error) => {
        this.errors = true;
      }
    );

    this.userService.getAllDoctorsProf().subscribe(
      (profiles) => {
        this.doctors = profiles;
      },
      (error) => {
        this.errors = true;
      }
    );
    this.getDate();
  }

  getDate() {
    var date: any = new Date();
    var day: any = date.getDate();
    var month: any = date.getMonth() + 1;
    var year: any = date.getFullYear();

    if (day < 10) {
      day = '0' + day;
    }
    if (month < 10) {
      month = '0' + month;
    }
    this.minDate = year + '-' + month + '-' + day;
  }

  selectedDoctor(doctor: any) {
    this.doctorName = doctor.firstName + ' ' + doctor.lastName;
    this.userService.getDoctorbyID(doctor.id).subscribe(
      (profile) => {
        console.log(profile);
        this.doctorProfile = profile;
      }
    )
    this.calDisabled = false;
    /* this.userService.getDoctorAvailability(doctor.id).subscribe(
      (avail) => {
        this.availability = avail;
        this.calDisabled = false;
        console.log(this.availability);
      },
      (error) => {
        this.errors = true;
      }
    ); */
   /*  this.userService.bookedTimes(doctor.id).subscribe((booked) => {
      this.bookedTimes = booked;
    }); */
  }

  dateChange(){
    
  }

  onSubmit(bookAppForm: NgForm) {
    console.log(bookAppForm.value.firstName);
    if (bookAppForm.valid) {
      this.userService
        .book(
          bookAppForm.value.firstName,
          bookAppForm.value.lastName,
          bookAppForm.value.phone,
          bookAppForm.value.dateOfApp,
          bookAppForm.value.timeOfApp,
          bookAppForm.value.prefDoc,
          bookAppForm.value.reasonOfApp
        )
        .subscribe(
          (data) => {
            this.success = true;
            this.message = 'Appointment Successfully Booked!';
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
