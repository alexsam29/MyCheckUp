import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookAppointmentComponent } from './patient/book-appointment/book-appointment.component';
import { CreateAccountComponent } from './sign-up-page/create-account/create-account.component';
import { DashboardComponent } from './dashboards/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { PrescriptionComponent } from './patient/prescription/prescription.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { SelfAssessmentComponent } from './patient/self-assessment/self-assessment.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ViewAppointmentsComponent } from './patient/view-appointments/view-appointments.component';
import { ViewPrescriptionsComponent } from './view-prescriptions/view-prescriptions.component';
import { ApproveDoctorsComponent } from './admin/approve-doctors/approve-doctors.component';
import { ViewDoctorsComponent } from './admin/view-doctors/view-doctors.component';
import { RescheduleAppointmentComponent } from './patient/reschedule-appointment/reschedule-appointment.component';
import { ViewDoctorAppointmentsComponent } from './doctor/view-doctor-appointments/view-doctor-appointments.component';

const routes: Routes = [
  {
    path: 'view-doctor-appointments',
    component: ViewDoctorAppointmentsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'reschedule-appointments/:id/:doctorid/:date/:start/:end',
    component: RescheduleAppointmentComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'view-doctors',
    component: ViewDoctorsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'approve-doctors',
    component: ApproveDoctorsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'view-prescriptions',
    component: ViewPrescriptionsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'view-appointments',
    component: ViewAppointmentsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'prescription',
    component: PrescriptionComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'self-assessment/:id',
    component: SelfAssessmentComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'bookappointment',
    component: BookAppointmentComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    component: ProfilePageComponent,
    canActivate: [AuthGuard],
  },
  { path: 'signin', component: SignInComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  { path: 'createaccount', component: CreateAccountComponent },
  { path: '', component: LandingPageComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
