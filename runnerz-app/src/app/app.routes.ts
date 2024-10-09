import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RunsComponent } from './components/runs/runs.component';
import { UsersComponent } from './components/users/users.component';
import { adminGuard } from './guards/admin.guard';
import { authGuard } from './guards/auth.guard';
import { loginGuard } from './guards/login.guard';
import { DemoComponent } from './components/demo/demo.component';
import { ContactComponent } from './components/contact/contact.component';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'index.jsp', redirectTo: 'login' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent, canActivate: [loginGuard] },
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'runs', component: RunsComponent, canActivate: [authGuard] },
      { path: 'users', component: UsersComponent, canActivate: [adminGuard] },
      { path: 'demo', component: DemoComponent, canActivate: [authGuard] },
      {
        path: 'contact',
        component: ContactComponent,
        canActivate: [authGuard],
      },
    ],
  },
  { path: '**', redirectTo: 'login' },
];
