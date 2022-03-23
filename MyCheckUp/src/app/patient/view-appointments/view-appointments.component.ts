import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-view-appointments',
  templateUrl: './view-appointments.component.html',
  styleUrls: ['./view-appointments.component.css'],
})
export class ViewAppointmentsComponent implements OnInit {
  user: any;
  errors: boolean = false;
  appointments: any;
  doctor: any;
  showDoctor = false;
  timeLabel = 'Available Times';
  dateOfApp: any;
  timePickerDisabled = true;
  startTime: any;
  endTime: any;
  submitDisabled: boolean = true;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.getPatientProfile().subscribe(
      (profile) => {
        this.user = profile;
        this.userService.getAppointments().subscribe(
          (appointments) => {
            this.appointments = appointments.sort((a: any, b: any) =>
              a.date < b.date ? -1 : 1
            );
          },
          (error) => {
            this.errors = true;
          }
        );
      },
      (error) => {
        this.errors = true;
      }
    );
  }

  timeSelected(start: string, end: string) {
    this.timeLabel = start.slice(0, -3) + ' - ' + end.slice(0, -3);
    this.startTime = start;
    this.endTime = end;
    this.submitDisabled = false;
  }

  reschedulePage(appointmendId: string, doctorId: string, date: string, start: string, end: string){
    this.router.navigate(['/reschedule-appointments', appointmendId, doctorId, date, start, end]);
  }

  deleteAppointment(appointmentId: string) {
    this.userService.deleteAppointment(appointmentId).subscribe();
    window.location.reload();
  }
}
