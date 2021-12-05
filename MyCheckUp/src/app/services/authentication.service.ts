import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http
      .post<any>(`https://mycheckup-api.herokuapp.com/login`, {
        username,
        password,
      })
      .pipe(
        map((res) => {
          // login successful if response is 200
          if (res.status == 200) {
            return true;
          }
          return false;
        })
      );
  }
}
