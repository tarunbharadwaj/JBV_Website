import { Component, ViewChild, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { StudentFormComponent } from '../forms/student-form/student-form.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  /* userName = JSON.parse(sessionStorage.getItem('user')!).name;
  userProfile = JSON.parse(sessionStorage.getItem('user')!).picture; */

  @ViewChild(StudentFormComponent) addStudentModal!: StudentFormComponent | any;

  totalStudents: number = 0;
  totalTeachers: number = 0;

  constructor(
    private authService: AuthService // private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    /* this.addStudentModal.closeModal(); // Ensure the modal is closed/reset when the dashboard is loaded */

    // Reset the modal and form when the component is initialized
    if (this.addStudentModal) {
      this.addStudentModal.closeModal();
      this.addStudentModal.resetForm();
    }
  }

  updateStudentCount(count: number) {
    this.totalStudents = count;
  }

  updateTeacherCount(count: number) {
    this.totalTeachers = count;
  }

  openAddStudentModal() {
    /* this.addStudentModal.openModal(); // Make sure the modal opens */
    if (this.addStudentModal) {
      this.addStudentModal.openModal();
    }
  }

  signOut() {
    sessionStorage.removeItem('user');
    this.authService.signOut();
    alert('Successfully Signed Out');
  }
}
