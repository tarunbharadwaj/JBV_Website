import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpService } from '../../../services/http.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teacher-form',
  templateUrl: './teacher-form.component.html',
  styleUrl: './teacher-form.component.scss',
})
export class TeacherFormComponent implements OnInit {
  @Input() teacher: any; // Input to receive the teacher's data to edit
  @Output() submit = new EventEmitter<any>(); // Output to send the updated teacher's details

  teacherForm: FormGroup;
  showModal = false;
  private apiUrl = 'http://localhost:3000';

  constructor(
    private fb: FormBuilder,
    private http: HttpService,
    private toast: ToastrService,
    private router: Router
  ) {
    this.teacherForm = this.fb.group({
      name: [''],
      phoneNumber: [''],
      address: [''],
    });
  }

  ngOnInit() {
    this.closeModal();
  }

  ngOnChanges() {
    if (this.teacher) {
      this.teacherForm.patchValue(this.teacher); // Pre-fill the form with the data
      this.showModal = true;
    }
  }

  openModal() {
    this.showModal = true;
    if (!this.teacher) {
      this.teacherForm.reset(); // Reset form when adding a new teacher
    }
  }

  closeModal() {
    this.showModal = false;
    this.teacherForm.reset(); // This will reset the form
  }

  onSubmit() {
    if (this.teacher) {
      // If editing an existing teacher
      this.http
        .put(
          `${this.apiUrl}/getteachers/${this.teacher._id}`,
          this.teacherForm.value
        )
        .subscribe((updatedTeacher) => {
          this.submit.emit(updatedTeacher); // Emit the updated teacher
          this.toast.success('Teacher updated successfully', 'Success!');
          this.closeModal(); // Close the modal
        });
    } else {
      // Add new teacher
      this.http
        .post(`${this.apiUrl}/addteacher`, this.teacherForm.value)
        .subscribe((res) => {
          this.closeModal();
          this.toast.success('Teacher Added Succefully', 'Success!');
          setTimeout(() => {
            window.location.reload(); //to reload page
          }, 2500);
        });
    }
  }
}
