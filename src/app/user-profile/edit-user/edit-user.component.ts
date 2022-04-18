import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  constructor(
    private readonly userService: UserService,
    private readonly router: Router
  ) {}
  updateUserProfileForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    age: new FormControl('', Validators.required),
  });
  ngOnInit(): void {
    this.loadUserDetails();
  }
  loadUserDetails() {
    this.userService.getUser().subscribe((res) => {
      this.updateUserProfileForm.patchValue(res); 
    });
  }
  updateUserDetails(){
    const updatedUser=this.updateUserProfileForm.value;
    const updatedRecord={
      name:updatedUser.name,
      age:updatedUser.age
    }
    this.userService.updateUser(updatedRecord).subscribe(()=>{
      this.updateUserProfileForm.reset();
      this.router.navigate(['/user']);
    });
  }
}
