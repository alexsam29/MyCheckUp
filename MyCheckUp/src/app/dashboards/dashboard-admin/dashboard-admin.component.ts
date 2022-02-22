import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css'],
})
export class DashboardAdminComponent implements OnInit {
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
    this.userService.getAdminProfile().subscribe(
      (profile) => {
        this.user = profile;
      },
      (error) => {
        this.errors = true;
      }
    );
  }
  logout() {
    this.authService.logout().subscribe();
    this.router.navigate(['/signin']);
  }
}
