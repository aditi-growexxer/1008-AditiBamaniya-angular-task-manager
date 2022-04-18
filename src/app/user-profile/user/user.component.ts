import { Component, OnInit, TemplateRef } from '@angular/core';
import { UserService } from '../service/user.service';
import { faTrash} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  userDetails: any;
  faTrash=faTrash;
  modalRef!: BsModalRef;
  message!: string;
  task!:any;
  constructor(private readonly userService: UserService,private readonly router: Router,private readonly bsModalService:BsModalService) {}

  ngOnInit(): void {
    this.loadUserDetails();
  }
  loadUserDetails(){
    this.userService.getUser().subscribe(res=>{
      this.userDetails=res;
    })
  }

  deleteUser(){
    this.userService.deleteUser().subscribe(()=>{
      this.router.navigate(['']);
    });

  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.bsModalService.show(template, { class: 'modal-sm' });
  }

  confirm(): void {
    this.message = 'Confirmed!';
    this.modalRef.hide();
    this.deleteUser();
  }
  decline(): void {
    this.message = 'Declined!';
    this.modalRef.hide();
  }
}
