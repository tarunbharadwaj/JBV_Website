import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss',
})
export class StudentsComponent implements OnInit {
  students: any[] = [];
  private apiUrl = 'http://localhost:3000';
  selectedStudent: any = null;

  constructor(private http: HttpService, private toast: ToastrService) {}

  ngOnInit(): void {
    this.fetchStudents();
  }

  fetchStudents() {
    this.http.get(`${this.apiUrl}/getstudents`).subscribe((data) => {
      this.students = data;
    });
  }

  // Delete student by ID
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
