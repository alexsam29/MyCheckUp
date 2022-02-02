import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
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
    this.userService.getProfile().subscribe((profile) => {
      this.user = profile;
      this.fullAddress = this.user.address.split(',', 4);
    },
    error => {
      this.errors = true;
    });
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/signin']);
  }
}
