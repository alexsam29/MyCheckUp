import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.css']
})
export class BookAppointmentComponent implements OnInit {
  fail: boolean = false;
  success: boolean = false;
  loading: boolean = true;
  message: string = '';
  user: any;
  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {}

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
