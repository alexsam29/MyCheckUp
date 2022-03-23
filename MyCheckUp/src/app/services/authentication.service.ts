import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  /* url = 'https://mycheckup-api.herokuapp.com/'; */
  url = 'http://localhost:5000/';
  constructor(private http: HttpClient) {}

  login(role: string, username: string, password: string) {
    return this.http
      .post<any>(
        this.url + `auth/login`,
        {
          role: role,
          email: username,
          password: password,
        },
        { withCredentials: true }
      )
      .pipe(
        map((res) => {
          console.log(res);
          // login successful if response is 200
          if (res.sucess || res.success) {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('token', username);
            localStorage.setItem('role', role);
            return true;
          }
          return false;
        })
      );
  }

  logout() {
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    return this.http
      .post<any>(this.url + `auth/logout`, {}, { withCredentials: true })
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
}
