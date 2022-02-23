import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-approve-doctors',
  templateUrl: './approve-doctors.component.html',
  styleUrls: ['./approve-doctors.component.css'],
})
export class ApproveDoctorsComponent implements OnInit {
  doctors: any;
  user: any;
  errors: boolean = false;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getAdminProfile().subscribe(
      (profile) => {
        this.user = profile;
      },
      (error) => {
        this.errors = true;
      }
    );
    this.userService.getDoctors().subscribe(
      (doctorsList) => {
        this.doctors = doctorsList;
      },
      (error) => {
        this.errors = true;
      }
    );
  }

  approve(doctorID: string) {
    this.userService.approveDoctor(doctorID).subscribe();
    window.location.reload();
  }

  decline(doctorID: string) {
    this.userService.deleteDoctor(doctorID).subscribe();
    window.location.reload();
  }
}
