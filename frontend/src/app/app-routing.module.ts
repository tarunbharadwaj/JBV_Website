import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';
import { TeachersComponent } from './components/teachers/teachers.component';
import { MainComponentComponent } from './components/main-component/main-component.component';
import { StudentsComponent } from './components/students/students.component';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent, canActivate: [authGuard] },
  {
    path: 'dashboard',
    component: MainComponentComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: DashboardComponent, // Default content for dashboard
      },
      {
        path: 'teachers',
        component: TeachersComponent,
        // canActivate: [authGuard],
      },
      {
        path: 'students',
        component: StudentsComponent,
        // canActivate: [authGuard],
      },
      {
        path: 'classes',
        component: TeachersComponent,
        // canActivate: [authGuard],
      },
      {
        path: 'billing',
        component: TeachersComponent,
        // canActivate: [authGuard],
      },
    ],
  },
  {
    path: '', // Default route to login
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: '**', // Redirect all unknown paths to login
    redirectTo: '/login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
