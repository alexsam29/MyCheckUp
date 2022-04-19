import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-view-prescription',
  templateUrl: './view-prescription.component.html',
  styleUrls: ['./view-prescription.component.css']
})
export class ViewPrescriptionComponent implements OnInit {
  user: any;
  errors: boolean = false;
  prescriptions: any;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  this.userService.getAllPatientPrescriptions().subscribe((prescrip)=>{
    this.prescriptions = prescrip;
    console.log(this.prescriptions);
  });
}

}
