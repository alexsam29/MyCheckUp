import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

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
  doctorName: string = 'Select a Doctor';
  availableTimes: any;
  minDate: any = '';
  calDisabled = true;
  timePickerDisabled = true;
  submitDisabled = true;
  doctorProfile: any;
  timeLabel: string = 'Available Times';
  dateOfApp: any;
  startTime: any;
  endTime: any;
  days: string[] = [];
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
    this.days = [];
    this.userService.getDoctorbyID(doctor.id).subscribe((profile) => {
      this.doctorProfile = profile;
    });
    this.userService.getDoctorAvailability(doctor.id).subscribe((available) => {
      for (var i = 0; i < available.length; ++i) {
        if (available[i].weekDay == 0 && available[i].isAvailable) {
          this.days.push('Sunday');
        } else if (available[i].weekDay == 1 && available[i].isAvailable) {
          this.days.push('Monday');
        } else if (available[i].weekDay == 2 && available[i].isAvailable) {
          this.days.push('Tuesday');
        } else if (available[i].weekDay == 3 && available[i].isAvailable) {
          this.days.push('Wednesday');
        } else if (available[i].weekDay == 4 && available[i].isAvailable) {
          this.days.push('Thursday');
        } else if (available[i].weekDay == 5 && available[i].isAvailable) {
          this.days.push('Friday');
        } else if (available[i].weekDay == 6 && available[i].isAvailable) {
          this.days.push('Saturday');
        }
      }
    });
    this.calDisabled = false;
  }

  dateChange() {
    this.userService
      .getDoctorTimes(this.doctorProfile.id, this.dateOfApp)
      .subscribe(
        (times) => {
          this.availableTimes = times;
        },
        (error) => {
          if (
            error.error.error ==
            'No appointment time has been found for this doctor!'
          ) {
            this.getAvailability();
          }
        }
      );
    this.timePickerDisabled = false;
  }

  getAvailability() {
    var year = this.dateOfApp.substring(0, 4);
    var month = this.dateOfApp.substring(5, 7);
    var day = this.dateOfApp.substring(8, 10);
    var date = new Date(year, month - 1, day);

    this.userService
      .getDoctorAvailabilityDay(this.doctorProfile.id, date.getDay().toString())
      .subscribe(
        (available) => {
          if (available.isAvailable) {
            var availableFrom = available.availableFrom.split(':');
            var availableTo = available.availableTo.split(':');
            var times = [];
            var startTime = new Date(
              year,
              month - 1,
              day,
              availableFrom[0],
              availableFrom[1],
              availableFrom[2],
              0
            );
            var endTime = new Date(
              year,
              month - 1,
              day,
              availableTo[0],
              availableTo[1],
              availableTo[2],
              0
            );

            while (
              startTime.toLocaleTimeString('en-US') !=
              endTime.toLocaleTimeString('en-US')
            ) {
              var from =
                (startTime.getHours() < 10
                  ? '0' + startTime.getHours().toString() + ':'
                  : startTime.getHours().toString() + ':') +
                (startTime.getMinutes() < 10
                  ? '0' + startTime.getMinutes().toString() + ':'
                  : startTime.getMinutes().toString() + ':') +
                (startTime.getMilliseconds() < 10
                  ? '0' + startTime.getMilliseconds().toString()
                  : startTime.getMilliseconds().toString());

              startTime.setMinutes(startTime.getMinutes() + 30);

              var to =
                (startTime.getHours() < 10
                  ? '0' + startTime.getHours().toString() + ':'
                  : startTime.getHours().toString() + ':') +
                (startTime.getMinutes() < 10
                  ? '0' + startTime.getMinutes().toString() + ':'
                  : startTime.getMinutes().toString() + ':') +
                (startTime.getMilliseconds() < 10
                  ? '0' + startTime.getMilliseconds().toString()
                  : startTime.getMilliseconds().toString());

              var slot = {
                Available: true,
                From: from,
                To: to,
              };
              times.push(slot);
            }
            this.availableTimes = times;
          } else {
            this.fail = true;
            this.message = 'This doctor is not avaialble on the selected day.';
            this.timePickerDisabled = true;
            this.submitDisabled = true;
          }
        },
        (error) => {
          this.fail = true;
          this.message =
            'This doctor has not made their schedule available. Please choose another one';
          this.timePickerDisabled = true;
          this.submitDisabled = true;
        }
      );
  }

  timeSelected(start: string, end: string) {
    this.timeLabel = start.slice(0, -3) + ' - ' + end.slice(0, -3);
    this.startTime = start;
    this.endTime = end;
    this.submitDisabled = false;
  }

  onSubmit(bookAppForm: NgForm) {
    if (
      bookAppForm.valid &&
      this.dateOfApp &&
      this.timeLabel != 'Available Times' &&
      this.startTime &&
      this.endTime
    ) {
      this.userService
        .bookAppointment(
          this.user.id,
          this.doctorProfile.id,
          this.dateOfApp,
          this.startTime,
          this.endTime,
          bookAppForm.value.reasonOfApp
        )
        .subscribe(
          (data) => {
            this.success = true;
            this.fail = false;
            this.message = 'Appointment Successfully Booked!';
            console.log(data);
            setTimeout(() => {
              this.router.navigate(['self-assessment', data.id]);
            }, 3000);
          },
          (error) => {
            this.message = error.error.error;
            this.fail = true;
          }
        );
    } else {
      this.message = 'Please fill out all fields.';
      this.fail = true;
    }
  }
}
