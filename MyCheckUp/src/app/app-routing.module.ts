import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookAppointmentComponent } from './book-appointment/book-appointment.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { PrescriptionComponent } from './prescription/prescription.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { SelfAssessmentComponent } from './self-assessment/self-assessment.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ViewAppointmentsComponent } from './view-appointments/view-appointments.component';
import { ViewPrescriptionsComponent } from './view-prescriptions/view-prescriptions.component';

const routes: Routes = [
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
    path: 'self-assessment',
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
