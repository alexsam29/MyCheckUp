import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-self-assessment',
  templateUrl: './self-assessment.component.html',
  styleUrls: ['./self-assessment.component.css']
})
export class SelfAssessmentComponent implements OnInit {
  user: any;
  symptoms:any;
  symptomsID: any;
  message: string = '';
  id: any;
  desc: any;
  errors: boolean = false;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getSelfAssessment().subscribe(
      (profile) => {
        this.user = profile;
        console.log ("works!!");
      },
      (error) => {
        this.errors = true;

        console.log ("doesnt work" + error);

      }
    );
  }

}
