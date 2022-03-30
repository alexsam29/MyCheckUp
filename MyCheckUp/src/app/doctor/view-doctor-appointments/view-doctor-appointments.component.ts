import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-view-doctor-appointments',
  templateUrl: './view-doctor-appointments.component.html',
  styleUrls: ['./view-doctor-appointments.component.css'],
})
export class ViewDoctorAppointmentsComponent implements OnInit {
  user: any;
  appointments: any;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getDoctorProfile().subscribe((profile) => {
      this.user = profile;
    });
    this.userService.getDoctorAppointments().subscribe((appointments) => {
      this.appointments = appointments;
    });
  }
}
