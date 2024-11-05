import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss',
})
export class StudentsComponent implements OnInit {
  @Output() studentCount = new EventEmitter<number>();

  students: any[] = [];
  private apiUrl = 'http://localhost:3000';
  selectedStudent: any = null;
  totalStudents: any;

  searchControl = new FormControl('');
  suggestions: any[] = [];
  searchQuery: string = '';
  filteredStudents: any[] = [];

  constructor(private http: HttpService, private toast: ToastrService) {}

  ngOnInit(): void {
    this.fetchStudents();
    // this.onSearch();
  }

  /****
   *  To fetch list of all students
   */
  fetchStudents() {
    this.http.get(`${this.apiUrl}/getstudents`).subscribe((data) => {
      this.students = data;
      this.filteredStudents = data;
      this.totalStudents = this.students.length;
      this.studentCount.emit(this.students.length); // Emit count after fetching
    });
  }

  /**
   * Search functionality
   */
  filterStudents() {
    if (this.searchQuery.trim() === '') {
      this.filteredStudents = this.students; // Show all students if no search input
    } else {
      const query = this.searchQuery.toLowerCase();
      this.filteredStudents = this.students.filter(
        (student) =>
          student.name.toLowerCase().includes(query) ||
          student.motherName.toLowerCase().includes(query) ||
          student.fatherName.toLowerCase().includes(query) ||
          student.address.toLowerCase().includes(query)
      );
    }
  }

  /**
   * Delete Student by ID
   */
  onDelete(studentId: string) {
    if (confirm('Are you sure you want to delete this student?')) {
      this.http
        .delete(`${this.apiUrl}/getstudents/${studentId}`)
        .subscribe(() => {
          // Remove the student from the local array after deletion
          this.students = this.students.filter(
            (student) => student._id !== studentId
          );
          this.toast.success('Student deleted successfully', 'Success!');
        });
    }
  }

  /**
   * Edit Student
   * onEdit() and onStudentEdited()
   */
  onEdit(student: any) {
    // this.selectedStudent = student;  // Set the selected student
    this.selectedStudent = { ...student }; // Set the selected student
    console.log('Checking selectedStudent>>>', this.selectedStudent);
    // this.addStudentModal.open();     // Open the modal
  }

  onStudentEdited(updatedStudent: any) {
    if (updatedStudent._id) {
      // Update the student in the list
      const index = this.students.findIndex(
        (s) => s._id === updatedStudent._id
      );
      if (index !== -1) {
        this.students[index] = updatedStudent;
      }
    } /* else {
      // Add a new student to the list
      this.students.push(updatedStudent);
    } */
  }
}
