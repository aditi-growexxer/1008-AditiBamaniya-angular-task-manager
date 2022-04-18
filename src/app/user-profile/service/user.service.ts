import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  token:any = localStorage.getItem('currentUser');
  bearer = 'Bearer ' + JSON.parse(this.token).token;
  headers = {
    Authorization: this.bearer,
    'Content-Type': 'application/json',
  };
  private url = 'http://localhost:3000/api/users/me';
  constructor(private readonly http: HttpClient) {}

  getUser() {
    return this.http.get<any>(this.url, { headers: this.headers });
  }

  deleteUser() {
    return this.http.delete(this.url, { headers: this.headers });
  }
  updateUser(body:any) {
    return this.http.patch(this.url,body, { headers: this.headers });
  }
}
