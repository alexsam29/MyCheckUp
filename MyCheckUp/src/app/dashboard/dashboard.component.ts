import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  id: string = '';
  constructor(private router: Router, private authService: AuthenticationService) {}
  ngOnInit() {
    this.id = localStorage.getItem('token') || '';
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/signin']);
  }
}
