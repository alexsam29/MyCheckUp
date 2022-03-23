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
  doctor: any;
  showDoctor = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getPatientProfile().subscribe(
      (profile) => {
        this.user = profile;
        this.userService
          .getAppointments(profile.id)
          .subscribe((appointments) => {
            console.log('hello')
            this.appointments = appointments.sort((a: any, b: any) =>
              a.date < b.date ? -1 : 1
            );
          },(error) => {
            this.errors = true;
          });
      },
      (error) => {
        this.errors = true;
      }
    );
  }

  doctorDetails(doctorId: string){
    this.showDoctor = true;
    this.userService.getDoctorbyID(doctorId).subscribe(
      (profile)=>{
        this.doctor = profile;
      }
    )
  }

  deleteAppointment(appointmentId: string){
    this.userService.deleteAppointment(appointmentId).subscribe();
    window.location.reload();
  }
}
