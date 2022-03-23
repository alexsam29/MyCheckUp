import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-reschedule-appointment',
  templateUrl: './reschedule-appointment.component.html',
  styleUrls: ['./reschedule-appointment.component.css'],
})
export class RescheduleAppointmentComponent implements OnInit {
  user: any;
  errors: any;
  appointmentId: any;
  appointment: any;
  date: any;
  startTime: any;
  endTime: any;
  minDate: string = '';
  dateOfApp: any;
  doctorID: any;
  availableTimes: any[] = [];
  timePickerDisabled: any;
  doctor: any;
  days: string[] = [];

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.getPatientProfile().subscribe(
      (profile) => {
        this.user = profile;
        this.appointmentId = this.route.snapshot.paramMap.get('id');
        this.date = this.route.snapshot.paramMap.get('date');
        this.startTime = this.route.snapshot.paramMap.get('start');
        this.endTime = this.route.snapshot.paramMap.get('end');
        this.doctorID = this.route.snapshot.paramMap.get('doctorid');
        this.userService
          .getAppointment(this.appointmentId)
          .subscribe((appointment) => {
            this.appointment = appointment;
          });
        this.userService.getDoctorbyID(this.doctorID).subscribe((profile) => {
          this.doctor = profile;
          this.userService
            .getDoctorAvailability(this.doctor.id)
            .subscribe((available) => {
              for (var i = 0; i < available.length; ++i) {
                if (available[i].weekDay == 0 && available[i].isAvailable) {
                  this.days.push('Sunday');
                } else if (
                  available[i].weekDay == 1 &&
                  available[i].isAvailable
                ) {
                  this.days.push('Monday');
                } else if (
                  available[i].weekDay == 2 &&
                  available[i].isAvailable
                ) {
                  this.days.push('Tuesday');
                } else if (
                  available[i].weekDay == 3 &&
                  available[i].isAvailable
                ) {
                  this.days.push('Wednesday');
                } else if (
                  available[i].weekDay == 4 &&
                  available[i].isAvailable
                ) {
                  this.days.push('Thursday');
                } else if (
                  available[i].weekDay == 5 &&
                  available[i].isAvailable
                ) {
                  this.days.push('Friday');
                } else if (
                  available[i].weekDay == 6 &&
                  available[i].isAvailable
                ) {
                  this.days.push('Saturday');
                }
              }
            });
        });
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

  dateChange() {
    this.userService.getDoctorTimes(this.doctorID, this.dateOfApp).subscribe(
      (times) => {
        this.availableTimes = [];
        for (var i = 0; i < times.length; ++i) {
          if (times[i].Available) {
            this.availableTimes.push(times[i]);
          }
        }
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
      .getDoctorAvailabilityDay(this.doctorID, date.getDay().toString())
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
          }
        },
        (error) => {}
      );
  }

  onSubmit(bookAppForm: NgForm) {
    var time = bookAppForm.value.timeSelected.split('-');
    if (bookAppForm.valid) {
      this.userService
        .rescheduleAppointment(
          this.appointmentId,
          bookAppForm.value.dateOfApp,
          time[0] + ':00',
          time[1] + ':00'
        )
        .subscribe();
      this.router.navigate(['/view-appointments']);
    }
  }
}
