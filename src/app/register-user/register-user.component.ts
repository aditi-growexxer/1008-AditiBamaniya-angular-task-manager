import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { PasswordMatching } from '../Validations/passwordMatching';
import { PasswordValidation } from '../Validations/passwordValidation';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent{
  get name(){
    return this.registrationForm.get('name');
  }
  get email(){
    return this.registrationForm.get('email');
  }
  get password(){
    return this.registrationForm.get('password');
  }
  get confirmPassword(){
    return this.registrationForm.get('confirmPassword');
  }
  get age(){
    return this.registrationForm.get('age');
  }

  constructor(public readonly auth:AuthService){}
  registrationForm = new FormGroup({
    name: new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(50)]),
    email: new FormControl('',[Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
    password: new FormControl('',[Validators.required, PasswordValidation(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i)]),
    confirmPassword: new FormControl('',[Validators.required, PasswordValidation(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i)]),
    age: new FormControl('',[Validators.required,Validators.pattern("^(?:1[8-9]|[2-5][0-9]|60)$")]),
  },{validators: PasswordMatching()});

  onRegister(){
    // this.auth.setRegisterData(this.registrationForm.value);
    // this.auth.login(this.registrationForm.value.userName, this.registrationForm.value.password)
    this.auth.setdata(this.registrationForm.value);
    alert('User Registered Successfully!!!');
  }
}
