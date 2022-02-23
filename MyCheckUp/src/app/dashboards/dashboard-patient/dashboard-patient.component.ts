import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard-patient',
  templateUrl: './dashboard-patient.component.html',
  styleUrls: ['./dashboard-patient.component.css'],
})
export class DashboardPatientComponent implements OnInit {
  id: string = '';
  user: any;
  fullAddress: string[] = [];
  errors: boolean = false;
  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private userService: UserService
  ) {}
  ngOnInit() {
    this.id = localStorage.getItem('token') || '';
    this.userService.getPatientProfile().subscribe(
      (profile) => {
        this.user = profile;
        this.fullAddress = this.user.address.split(',', 4);
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
