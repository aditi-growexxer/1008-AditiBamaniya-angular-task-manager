import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user/user.component';
import { RouterModule } from '@angular/router';
import { EditUserComponent } from './edit-user/edit-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [UserComponent, EditUserComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    FormsModule,
    RouterModule.forChild([
      { path: '', component: UserComponent },
      { path: 'update-profile', component: EditUserComponent },
    ]),
  ],
  exports:[RouterModule]
})
export class UserProfileModule {}
