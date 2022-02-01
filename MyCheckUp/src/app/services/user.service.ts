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
    pName: string,
    email: string,
    gender: RadioNodeList,
    dob: string,
    healthcard: string,
    phone: string,
    adress: string,
    city: string,
    province: string,
    pcode: string,
  ) {
    return this.http
      .post<any>(this.url + 'patient/editprofile', {
        profileName: pName,
        email: email,
        gender: gender,
        dateOfBirth: dob,
        healthcardnumber: healthcard,
        phoneNumber: phone,
        adress: adress,
        city: city,
        province: province,
        postalCode: pcode,
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

  register(
    first: string,
    last: string,
    email: string,
    psw: string,
    dob: string
  ) {
    return this.http
      .post<any>(this.url + 'patient/register', {
        email: email,
        password: psw,
        firstName: first,
        lastName: last,
        dateOfBirth: dob,
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

  getProfile(): Observable<any>{
    return this.http
      .get<any>(this.url + 'patient/profile')
      .pipe(
        map((res) => {
          console.log(res)
        })
      );
  }
}
