import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  /* url = 'https://mycheckup-api.herokuapp.com/'; */
  url = 'http://localhost:5000/'
  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http
      .post<any>(this.url + `patient/login`, {
        email: username,
        password: password,
      }, {withCredentials: true})
      .pipe(
        map((res) => {
          console.log(res);
          // login successful if response is 200
          if (res.sucess) {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('token', username);
            return true;
          }
          return false;
        })
      );
  }

  logout() {
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('token');
    this.http.post<any>(this.url + `patient/logout`, {}, {withCredentials: true});
  }
}
