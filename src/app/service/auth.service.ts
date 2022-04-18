import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginurl = 'http://localhost:3000/api/users/login';
  user: any;
  userInfo: any = localStorage.getItem('currentUser') ? localStorage.getItem('currentUser') : [];
  usersdata = [{}];
  constructor(private router: Router, private http: HttpClient) {}

  setdata(user: any) {
    let new_user = {
      name: user.name,
      email: user.email,
      password: user.password,
      age: user.age,
    };

    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(new_user);
    this.user = this.http
      .post('http://localhost:3000/api/users', body, {
        headers: headers,
      })
      .subscribe((res) => {
        localStorage.clear();

        const token = Object.values(res)[1];

        localStorage.setItem('token', token);
      });
    this.usersdata.push(user);
  }

  getuser() {
    this.userInfo = localStorage.getItem('currentUser');
    this.userInfo = JSON.parse(this.userInfo);
    return JSON.stringify(this.userInfo);
  }
  setuser(token: string) {
    this.userInfo = {
      token: token,
    };
    localStorage.setItem('currentUser', JSON.stringify(this.userInfo));
  }

  login(username: any, password: any) {
    const token = localStorage.getItem('token');
    var params = {
      email: username,
      password: password,
    };
    const bearer = 'Bearer ' + token;
    const headers = {
      Authorization: bearer,
      'Content-Type': 'application/json',
    };

    this.http
      .post<any>('http://localhost:3000/api/users/login', params, {
        headers: headers,
      })
      .subscribe(
        (data) => {
          if (data) {
            this.setuser(data.token);
            this.router.navigate(['/dashboard']);
          }
        },
        (err) => {
          alert('Invalid email and password');
        }
      );
  }
  logout() {
    this.userInfo = [];
    localStorage.removeItem('currentUser');
    this.router.navigate(['']);
  }
}
