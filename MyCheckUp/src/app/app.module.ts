import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { DashboardComponent } from './dashboards/dashboard/dashboard.component';
import { CreateAccountComponent } from './sign-up-page/create-account/create-account.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './guards/auth.guard';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { BookAppointmentComponent } from './patient/book-appointment/book-appointment.component';
import { SelfAssessmentComponent } from './patient/self-assessment/self-assessment.component';
import { PrescriptionComponent } from './patient/prescription/prescription.component';
import { ViewAppointmentsComponent } from './patient/view-appointments/view-appointments.component';
import { ViewPrescriptionsComponent } from './view-prescriptions/view-prescriptions.component';
import { CreatePatientComponent } from './sign-up-page/create-patient/create-patient.component';
import { CreateDoctorComponent } from './sign-up-page/create-doctor/create-doctor.component';
import { CreateAdminComponent } from './sign-up-page/create-admin/create-admin.component';
import { DashboardPatientComponent } from './dashboards/dashboard-patient/dashboard-patient.component';
import { DashboardDoctorComponent } from './dashboards/dashboard-doctor/dashboard-doctor.component';
import { DashboardAdminComponent } from './dashboards/dashboard-admin/dashboard-admin.component';
import { ApproveDoctorsComponent } from './admin/approve-doctors/approve-doctors.component';
import { ViewDoctorsComponent } from './admin/view-doctors/view-doctors.component';
import { RescheduleAppointmentComponent } from './patient/reschedule-appointment/reschedule-appointment.component';
import { ViewDoctorAppointmentsComponent } from './doctor/view-doctor-appointments/view-doctor-appointments.component'; 

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    SignInComponent,
    DashboardComponent,
    CreateAccountComponent,
    HeaderComponent,
    FooterComponent,
    ProfilePageComponent,
    BookAppointmentComponent,
    SelfAssessmentComponent,
    PrescriptionComponent,
    ViewAppointmentsComponent,
    ViewPrescriptionsComponent,
    CreatePatientComponent,
    CreateDoctorComponent,
    CreateAdminComponent,
    DashboardPatientComponent,
    DashboardDoctorComponent,
    DashboardAdminComponent,
    ApproveDoctorsComponent,
    ViewDoctorsComponent,
    RescheduleAppointmentComponent,
    ViewDoctorAppointmentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
