import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response } from 'src/app/models/response.model';
import { Student } from 'src/app/models/student.model';
import { StudentManagementService } from 'src/app/services/student-management.service';

@Component({
  selector: 'app-info-modal',
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.scss'],
})
export class InfoModalComponent implements OnInit, OnChanges {
  @Input() isShow: boolean = false;
  @Input() idStd: number | null = null;

  @Output() isShowChange = new EventEmitter<boolean>();
  @Output() result = new EventEmitter<Response<Student[]>>();

  studentForm: FormGroup = new FormGroup({
    name: new FormControl(),
    age: new FormControl(),
    address: new FormControl(),
  });
  studentValue$: Observable<Student>;
  constructor(private studentService: StudentManagementService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    this.resetForm();
    // console.log('changes', changes);
    // console.log('changes', this.isShow);
    if (this.idStd) {
      // this.studentValue$ = this.studentService
      //   .getStudentById(this.idStd)
      //   .pipe(map((std) => std.data));
      this.fieldFrom();
    }
  }

  saveClick() {
    if (this.idStd) {
      this.editStudent();
    } else {
      this.addStudent();
    }
  }

  addStudent() {
    this.studentService.addStudent(this.studentForm.value).subscribe((res) => {
      this.closeModal();
      this.result.emit(res);
    });
  }
  editStudent() {
    this.studentService
      .editStudent(this.idStd, this.studentForm.value)
      .subscribe((res) => {
        if (res.success) {
          this.closeModal();
          this.result.emit(res);
        }
      });
  }

  fieldFrom() {
    this.studentService.getStudentById(this.idStd).subscribe((res) => {
      if (res.success) {
        this.studentForm.patchValue({
          name: res.data.name,
          age: res.data.age,
          address: res.data.address,
        });
      }
    });
  }

  closeModal() {
    this.isShowChange.emit(!this.isShow);
  }

  resetForm() {
    this.studentForm.reset();
  }
}
