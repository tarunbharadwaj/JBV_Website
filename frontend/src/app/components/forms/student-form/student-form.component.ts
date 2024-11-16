import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpService } from '../../../services/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrl: './student-form.component.scss',
})
export class StudentFormComponent implements OnInit {
  @Input() student: any; // Input to receive the student data to edit
  @Output() submit = new EventEmitter<any>(); // Output to send the updated student details

  showModal = false;
  studentForm: FormGroup;
  private apiUrl = 'http://localhost:3000';

  constructor(
    private fb: FormBuilder,
    private http: HttpService,
    private toast: ToastrService,
    private router: Router
  ) {
    this.studentForm = this.fb.group({
      name: [''],
      motherName: [''],
      fatherName: [''],
      address: [''],
    });
  }

  ngOnInit() {
    this.closeModal();
  }

  ngOnChanges() {
    if (this.student) {
      this.studentForm.patchValue(this.student); // Pre-fill the form with the student's data
      this.showModal = true;
    }
  }

  openModal() {
    this.showModal = true;
    /* this.studentForm.reset(); // Reset the form to ensure it's clean when opening
    this.student = null; // Make sure no previous student is selected for adding a new one */
    if (!this.student) {
      this.studentForm.reset(); // Reset form when adding a new student
    }
  }

  closeModal() {
    this.showModal = false;
    this.studentForm.reset(); // This will reset the form
  }

  onSubmit() {
    if (this.student) {
      // If editing an existing student
      this.http
        .put(
          `${this.apiUrl}/getstudents/${this.student._id}`,
          this.studentForm.value
        )
        /* .subscribe(() => {
          alert('Student updated successfully');
          this.closeModal(); // Close the modal after editing
        }); */
        .subscribe((updatedStudent) => {
          this.submit.emit(updatedStudent); // Emit the updated student
          this.toast.success('Student updated successfully', 'Success!');
          this.closeModal(); // Close the modal
        });
    } else {
      // Add new student
      this.http
        .post(`${this.apiUrl}/addstudent`, this.studentForm.value)
        .subscribe((res) => {
          this.closeModal();
          this.toast.success('Student Added Succefully', 'Success!');
          setTimeout(() => {
            window.location.reload(); //to reload page
          }, 2500);
        });
      /* .subscribe((newStudent) => {
          // Emit the newly added student object to the parent
          this.submit.emit(newStudent);
          this.toast.success('Student added successfully', 'Success!');
          this.closeModal(); // Close the modal after adding
        }); */
    }
  }
}
