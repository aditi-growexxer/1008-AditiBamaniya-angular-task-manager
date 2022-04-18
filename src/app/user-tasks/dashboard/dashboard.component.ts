import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { faFilePen, faTrash,faCircleCheck, faCircleExclamation,faPlus } from '@fortawesome/free-solid-svg-icons';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Router } from '@angular/router';
import { TasksService } from '../services/tasks.service';
import { MatSort} from '@angular/material/sort';

export interface TaskInfo{
  _id:string,
  completed: boolean,
  createdAt: Date,
  description: string
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  columns=['Index','description','completed','createdAt','Mark','Update','Delete'];
  modalRef!: BsModalRef;
  message!: string;
  datasource:any=[];
  task!:any;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private readonly taskService:TasksService,private modalService: BsModalService,private readonly router:Router) { }
  faTrash=faTrash;
  faPlus=faPlus;
  faFilePen=faFilePen;
  faCircleCheck=faCircleCheck;
  faCircleExclamation=faCircleExclamation;
  
  ngOnInit(): void {
    this.loadData();
    console.log(this.datasource);
  }
  
  ngAfterViewInit() {
    this.datasource.sort = this.sort;
  }
  loadData(){
    this.taskService.getTasks().subscribe(res=>{
      this.datasource.data=res;
      console.log(this.datasource);
    });
  }
  DeleteTask(taskId:any){
   this.taskService.DeleteTask(taskId).subscribe(()=>{
     this.loadData();
   });
  }
  openModal(template: TemplateRef<any>, data: any) {
    this.task=data;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(): void {
    this.message = 'Confirmed!';
    this.modalRef.hide();
    this.DeleteTask(this.task._id);
  }
  decline(): void {
    this.message = 'Declined!';
    this.modalRef.hide();
  }
  updateRecord(taskId:any){
    this.router.navigate(["update-task/"+taskId]);
  }
}