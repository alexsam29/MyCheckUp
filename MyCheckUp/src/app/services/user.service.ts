import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  register(
    first: string,
    last: string,
    email: string,
    psw: string,
    dob: string
  ) {
    return this.http
      .post<any>('https://mycheckup-api.herokuapp.com/patient/register', {
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
}
