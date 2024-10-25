import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { LoaderComponent } from './components/loader/loader.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {
  HttpClientModule,
  provideHttpClient,
  withFetch,
} from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { TeachersComponent } from './components/teachers/teachers.component';
import { MainComponentComponent } from './components/main-component/main-component.component';
import { StudentsComponent } from './components/students/students.component';
import { StudentFormComponent } from './components/forms/student-form/student-form.component';
import { TeacherFormComponent } from './components/forms/teacher-form/teacher-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    LoaderComponent,
    DashboardComponent,
    TeachersComponent,
    MainComponentComponent,
    StudentsComponent,
    StudentFormComponent,
    TeacherFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatCardModule,
    MatSidenavModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideAnimationsAsync(), // This enables fetch API in HttpClient
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
