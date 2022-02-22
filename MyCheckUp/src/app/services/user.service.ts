import { HttpClient, HttpHeaders } from '@angular/common/http';
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
      .post<any>(this.url + 'patient/bookApp', {
        firstName: first,
        lastName: last,
        dateOfApp: date,
        phone: phone,
        timeOfApp: time,
        prefDoc: doc,
        reasonOfApp: reason
      }, {withCredentials: true})
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
}
