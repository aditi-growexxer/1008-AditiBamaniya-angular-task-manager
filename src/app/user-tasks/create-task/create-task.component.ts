import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {
  taskID!:any;
  isAddMode!:boolean;
  taskStatus!:boolean;
  updateTask!:any;
  addTaskForm!:FormGroup;
  constructor(private readonly taskService:TasksService,private readonly router:Router,private readonly route:ActivatedRoute) { }

  ngOnInit(): void {
    this.addTaskForm = new FormGroup({
      description: new FormControl('',),
      completed: new FormControl('')
    });
    this.taskID = this.route.snapshot.params['id'];
    this.isAddMode=!this.taskID;
    if(!this.isAddMode){
      this.getTask();
    }
  }
  getTask(){
    this.taskService.getTask(this.taskID).subscribe((res)=>{
      this.addTaskForm.patchValue(res);
    });
  }
  addTask(){
    if(this.isAddMode){
      this.taskService.createTask(this.addTaskForm.value).subscribe((res)=>{
        this.addTaskForm.reset();
        this.router.navigate(["/dashboard"]);
      });
    }
    else{
      this.taskService.updateTask(this.addTaskForm.value,this.taskID).subscribe((res)=>{
        this.addTaskForm.reset();
        this.router.navigate(["/dashboard"]);
      });
    }
  }

}
