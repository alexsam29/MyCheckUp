import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {

url = 'https://mycheckup-api.herokuapp.com/';

  constructor(private http: HttpClient) {}

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
      .get<any>(this.url + 'patient/profile', {headers:
        new HttpHeaders (
        {   
            "Content-Type": "application/x-www-form-urlencoded"
        }), withCredentials: true})
      .pipe(
        map((res) => {
          console.log(res)
        })
      );
  }
}
