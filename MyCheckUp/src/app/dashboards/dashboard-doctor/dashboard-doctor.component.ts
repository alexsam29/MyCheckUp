import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard-doctor',
  templateUrl: './dashboard-doctor.component.html',
  styleUrls: ['./dashboard-doctor.component.css'],
})
export class DashboardDoctorComponent implements OnInit {
  id: string = '';
  user: any;
  errors: boolean = false;
  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private userService: UserService
  ) {}
  ngOnInit() {
    this.id = localStorage.getItem('token') || '';
    this.userService.getDoctorProfile().subscribe(
      (profile) => {
        this.user = profile;
        console.log(this.user);
      },
      (error) => {
        this.errors = true;
      }
    );
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/signin']);
  }
}
