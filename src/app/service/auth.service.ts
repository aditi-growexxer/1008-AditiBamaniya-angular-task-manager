import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginurl = 'http://localhost:3000/api/users/login';
  user: any;
  userInfo: any = [];
  usersdata = [{}];
  constructor(private router: Router, private http: HttpClient) {}

  setdata(user: any) {
    let new_user = {
      name: user.name,
      email: user.email,
      password: user.password,
      age: user.age,
    };

    const body = JSON.stringify(new_user);

    this.user = this.http
      .post('http://localhost:3000/api/users', body)
      .subscribe((res) => {
        const token = Object.values(res)[1];

        localStorage.setItem('token', token);
        console.log('token set in localStorage', token);
      });

    this.usersdata.push(user);
    console.log('userdata' + JSON.stringify(this.usersdata));
  }

  getuser() {
    this.userInfo = localStorage.getItem('currentUser') || null;
    this.userInfo = JSON.parse(this.userInfo);
    return JSON.stringify(this.userInfo);
    // console.log(this.userInfo);
  }
  setuser(token: string) {
    this.userInfo = {};
    this.userInfo = {
      token: token,
    };
    localStorage.setItem('currentUser', JSON.stringify(this.userInfo));
  }

  login(username: any, password: any) {
    var params = {
      email: username,
      password: password,
    };
    console.log(params);
    this.http
      .post<any>('http://localhost:3000/api/users/login', params)
      .subscribe(
        (data) => {
          console.log(data);
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
