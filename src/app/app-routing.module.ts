import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AuthGuard } from './guard/auth.guard';
import { LoginGuard } from './guard/login.guard';
import { HelpComponent } from './help/help.component';
import { LoginComponent } from './login/login.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { AuthResolver } from './resolver/auth/auth.resolver';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/login',
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'register',
    component: RegisterUserComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'help',
    component: HelpComponent,
    canActivate: [AuthGuard],
    resolve: {
      user: AuthResolver,
    },
  },
  {
    path: 'about',
    component: AboutComponent,
    canActivate: [AuthGuard],
    resolve: {
      user: AuthResolver,
    },
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./user-tasks/user-tasks.module').then((m) => m.UserTasksModule),
    canActivate: [AuthGuard],
    resolve: {
      user: AuthResolver,
    },
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./user-profile/user-profile.module').then(
        (m) => m.UserProfileModule
      ),
    canActivate: [AuthGuard],
    resolve: {
      user: AuthResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
