import {
  Component,
  Inject,
  ViewChild,
  OnInit,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
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

  constructor(
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    /* this.addStudentModal.closeModal(); // Ensure the modal is closed/reset when the dashboard is loaded */
    // Reset the modal and form when the component is initialized
    if (this.addStudentModal) {
      this.addStudentModal.closeModal();
      this.addStudentModal.resetForm();
    }
  }

  // After the view is initialized, reset the modal state
  /* ngAfterViewInit(): void {
    if (this.addStudentModal) {
      this.addStudentModal.closeModal(); // Ensure the modal is closed/reset when the dashboard is loaded
    }
  } */

  // Lifecycle hook after view initialization
  /* ngAfterViewInit(): void {
    // Detect changes after the view has been fully initialized
    this.cdr.detectChanges();
  } */

  // Lifecycle hook when component is destroyed
  /* ngOnDestroy(): void {
    // Reset the modal state when leaving the dashboard
    if (this.addStudentModal) {
      this.addStudentModal.closeModal();
    }
  } */

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
