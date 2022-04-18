import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private url = 'http://localhost:3000/api/tasks/';
  constructor(private router: Router, private http: HttpClient) {}
  token:any = localStorage.getItem('currentUser');
  bearer:any ='Bearer ' + JSON.parse(this.token).token;
  headers = {
      Authorization: this.bearer,
      'Content-Type': 'application/json',
    };
  getTasks() {
    return this.http.get<any>(this.url, { headers: this.headers }).pipe(map((res: Response) => {  
      return res; 
    }));  
  }
  createTask(addTaskForm: any) {
    let new_task = {
      description: addTaskForm.description,
      completed: addTaskForm.completed,
    };
    const body = JSON.stringify(new_task);
    return this.http.post(this.url, body, {
      headers: this.headers,
    });
  }
  getTask(taskId: any) {
    return this.http.get(this.url + taskId, { headers: this.headers });
  }
  DeleteTask(taskId: any) {
    return this.http.delete(this.url + taskId, { headers: this.headers });
  }
  updateTask(task: any, taskId: any) {
    let new_task = {
      description: task.description,
      completed: task.completed,
    };
    const body = JSON.stringify(new_task);
    return this.http.patch(this.url+taskId, body, {
      headers: this.headers,
    });
  }
}
