import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './user-tasks/dashboard/dashboard.component';
import { AboutComponent } from './about/about.component';
import { HelpComponent } from './help/help.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CreateTaskComponent } from './user-tasks/create-task/create-task.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { UserProfileModule } from './user-profile/user-profile.module';
import { UserTasksModule } from './user-tasks/user-tasks.module';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './footer/footer.component';
import { RegisterUserComponent } from './register-user/register-user.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    DashboardComponent,
    AboutComponent,
    HelpComponent,
    CreateTaskComponent,
    FooterComponent,
    RegisterUserComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    MatTableModule,
    MatSortModule,
    UserProfileModule,
    UserTasksModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    ModalModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
