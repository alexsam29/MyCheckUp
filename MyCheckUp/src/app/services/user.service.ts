import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  /* url = 'https://mycheckup-api.herokuapp.com/'; */
  url = 'http://localhost:5000/';

  constructor(private http: HttpClient) {}
  editprofile(
    id: string,
    email: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    address: string,
    gender: string
  ) {
    return this.http
      .post<any>(this.url + 'patient/edit', {
        id: id,
        email: email,
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        address: address,
        gender: gender,
      })
      .pipe(
        map((res) => {
          if (res) {
            return true;
          }
          return false;
        })
      );
  }

  registerPatient(
    first: string,
    last: string,
    email: string,
    psw: string,
    dob: string,
    healthCardNum: string,
    gender: string
  ) {
    return this.http
      .post<any>(
        this.url + 'patient/register',
        {
          email: email,
          password: psw,
          firstName: first,
          lastName: last,
          dateOfBirth: dob,
          healthCardNum: healthCardNum,
          gender: gender,
        },
        { withCredentials: true }
      )
      .pipe(
        map((res) => {
          if (res) {
            return true;
          }
          return false;
        })
      );
  }

  registerDoctor(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    license: string,
    specialty: string,
    title: string,
    phoneNumber: string
  ) {
    return this.http
      .post<any>(
        this.url + 'doctor/register',
        {
          email: email,
          password: password,
          firstName: firstName,
          lastName: lastName,
          license: license,
          specialty: specialty,
          title: title,
          phoneNumber: phoneNumber,
        },
        { withCredentials: true }
      )
      .pipe(
        map((res) => {
          if (res) {
            return true;
          }
          return false;
        })
      );
  }

  book(
    first: string,
    last: string,
    date: string,
    phone: string,
    time: string,
    doc: string,
    reason: string
  ) {
    return this.http
      .post<any>(
        this.url + 'patient/bookApp',
        {
          firstName: first,
          lastName: last,
          dateOfApp: date,
          phone: phone,
          timeOfApp: time,
          prefDoc: doc,
          reasonOfApp: reason,
        },
        { withCredentials: true }
      )
      .pipe(
        map((res) => {
          if (res) {
            return true;
          }
          return false;
        })
      );
  }

  getPatientProfile(): Observable<any> {
    return this.http
      .get<any>(this.url + 'patient/profile', { withCredentials: true })
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  getAllDoctorsProf(): Observable<any> {
    return this.http
      .get<any>(this.url + 'doctors', { withCredentials: true })
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  getAdminProfile(): Observable<any> {
    return this.http
      .get<any>(this.url + 'admin/profile', { withCredentials: true })
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  getDoctorProfile(): Observable<any> {
    return this.http
      .get<any>(this.url + 'doctor/profile', { withCredentials: true })
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  getDoctorbyID(doctorID: string): Observable<any> {
    return this.http
      .get<any>(this.url + `doctors/${doctorID}`, { withCredentials: true })
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  getDoctors(): Observable<any> {
    return this.http
      .get<any>(this.url + 'admin/doctors', { withCredentials: true })
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  getSelfAssessment(): Observable<any> {
    return this.http
      .get<any>(this.url + 'symptoms', { withCredentials: true })
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  approveDoctor(doctorID: string): Observable<any> {
    console.log(doctorID);
    return this.http
      .put<any>(
        this.url + `admin/doctors/${doctorID}/activate`,
        {},
        { withCredentials: true }
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  deactivateDoctor(doctorID: string): Observable<any> {
    return this.http
      .put<any>(
        this.url + `admin/doctors/${doctorID}/deactivate`,
        {},
        {
          withCredentials: true,
        }
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  deleteDoctor(doctorID: string) {
    return this.http
      .delete<any>(this.url + `admin/doctors/${doctorID}`, {
        withCredentials: true,
      })
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  getDoctorTimes(doctorID: string, date: string) {
    return this.http
      .get<any>(this.url + `doctor/${doctorID}/availabileTimes/${date}`, {
        withCredentials: true,
      })
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  bookedTimes(doctorID: string) {
    return this.http
      .put<any>(
        this.url + `doctors/${doctorID}/bookedTimes`,
        {},
        {
          withCredentials: true,
        }
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  getDoctorAvailabilityDay(doctorID: string, day: string) {
    return this.http
      .get<any>(this.url + `doctors/${doctorID}/availability/${day}`, {
        withCredentials: true,
      })
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  getDoctorAvailability(doctorID: string) {
    return this.http
      .get<any>(this.url + `doctors/${doctorID}/availability`, {
        withCredentials: true,
      })
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  bookAppointment(
    patientId: string,
    doctorId: string,
    date: string,
    startTime: string,
    endTime: string,
    doctorNotes: string
  ) {
    return this.http
      .post<any>(
        this.url + `patient/appointment`,
        {
          patientId: patientId,
          doctorId: doctorId,
          date: date,
          startTime: startTime,
          endTime: endTime,
          doctorNotes: doctorNotes,
        },
        { withCredentials: true }
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  getAppointments() {
    return this.http
      .get<any>(this.url + `patient/appointments`, {
        withCredentials: true,
      })
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  getDoctorAppointments(){
    return this.http
      .get<any>(this.url + `doctor/appointments`, {
        withCredentials: true,
      })
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  deleteAppointment(appointmentId: string) {
    return this.http
      .put<any>(
        this.url + `cancellingAppointment/${appointmentId}`,
        {},
        {
          withCredentials: true,
        }
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  rescheduleAppointment(
    appointmentId: string,
    date: string,
    start: string,
    end: string
  ) {
    return this.http
      .put<any>(
        this.url +
          `reschedulingAppointment/${appointmentId}/${date}/${start}/${end}`,
        {},
        {
          withCredentials: true,
        }
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  getAppointment(id: string) {
    return this.http
      .get<any>(this.url + `patient/appointments/${id}`, {
        withCredentials: true,
      })
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  sendSelfassessment(selfassessment: any, appointmentId: string) {
    return this.http
      .post<any>(
        this.url + `patient/appointments/${appointmentId}/assessment`,
        {
          notes: selfassessment.notes,
          symptomIds: selfassessment.symptomIds,
        },
        { withCredentials: true }
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
}
