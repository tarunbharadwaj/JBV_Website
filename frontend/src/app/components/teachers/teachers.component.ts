import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { HttpService } from '../../services/http.service';
import { ToastrService } from 'ngx-toastr';
import { TeacherFormComponent } from '../forms/teacher-form/teacher-form.component';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrl: './teachers.component.scss',
})
export class TeachersComponent implements OnInit {
  @ViewChild(TeacherFormComponent) addTeacherModal!: TeacherFormComponent | any;
  @Output() teacherCount = new EventEmitter<number>();

  teachersList: any[] = [];
  totalTeachers: any;

  searchQuery: string = '';
  filteredTeachers: any[] = [];
  selectedTeacher: any = null;

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpService, private toast: ToastrService) {}

  ngOnInit() {
    this.fetchTeachers();
    // this.addTeacherModal.resetForm();
  }

  /*************
   *  To fetch list of all teachers
   **********/
  fetchTeachers() {
    this.http.get(`${this.apiUrl}/getteachers`).subscribe((data) => {
      this.teachersList = data;
      this.filteredTeachers = data;
      this.totalTeachers = this.teachersList.length;
      this.teacherCount.emit(this.totalTeachers); // Emit count after fetching
    });
  }

  /**
   * Search functionality
   */
  filterTeachers() {
    if (this.searchQuery.trim() === '') {
      this.filteredTeachers = this.teachersList; // Show all students if no search input
    } else {
      const query = this.searchQuery.toLowerCase();
      this.filteredTeachers = this.teachersList.filter(
        (teacher) =>
          teacher.name.toLowerCase().includes(query) ||
          teacher.phoneNumber.toString().includes(query) ||
          teacher.address.toLowerCase().includes(query)
      );
    }
  }

  openAddStudentModal() {
    /* this.addStudentModal.openModal(); // Make sure the modal opens */
    if (this.addTeacherModal) {
      this.addTeacherModal.openModal();
    }
  }

  /**
   * Edit Teacher
   * onEdit() and onTeacherEdited()
   */
  onEdit(teacher: any) {
    // this.selectedStudent = student;  // Set the selected student
    this.selectedTeacher = { ...teacher }; // Set the selected student
    console.log('Checking selectedStudent>>>', this.selectedTeacher);
    // this.addStudentModal.open();     // Open the modal
  }

  onStudentEdited(updatedTeacher: any) {
    if (updatedTeacher._id) {
      // Update the student in the list
      const index = this.teachersList.findIndex(
        (s) => s._id === updatedTeacher._id
      );
      if (index !== -1) {
        this.teachersList[index] = updatedTeacher;
      }
    }
  }
}
