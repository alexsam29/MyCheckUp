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
  errors: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getDoctorProfile().subscribe((profile) => {
      this.user = profile;
    }, (errors)=>{
      this.errors = true;
    });
    this.userService.getDoctorAppointments().subscribe((appointments) => {
      this.appointments = appointments;
    });
  }

  deleteAppointment(appointmentId: string){
    this.userService.deleteAppointment(appointmentId).subscribe();
    window.location.reload();
  }
}
