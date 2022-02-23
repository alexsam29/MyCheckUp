import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-view-doctors',
  templateUrl: './view-doctors.component.html',
  styleUrls: ['./view-doctors.component.css'],
})
export class ViewDoctorsComponent implements OnInit {
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

  deactivate(doctorID: string) {
    this.userService.deactivateDoctor(doctorID).subscribe();
    window.location.reload();
  }
}
