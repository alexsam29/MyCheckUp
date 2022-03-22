import { Component, OnInit } from '@angular/core';
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

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getPatientProfile().subscribe(
      (profile) => {
        this.user = profile;
        this.userService
          .getAppointments(this.user.id)
          .subscribe((appointments) => {
            this.appointments = appointments.sort((a: any, b: any) =>
              a.date < b.date ? -1 : 1
            );
          });
      },
      (error) => {
        this.errors = true;
      }
    );
  }
}
