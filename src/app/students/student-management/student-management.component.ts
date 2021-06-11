import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  ConfirmationService,
  MessageService,
  PrimeNGConfig,
} from 'primeng/api';
import { StudentManagementService } from 'src/app/services/student-management.service';
interface Col {
  field: string;
  header: string;
}

@Component({
  selector: 'app-student-management',
  templateUrl: './student-management.component.html',
  styleUrls: ['./student-management.component.scss'],
  providers: [MessageService],
})
export class StudentManagementComponent implements OnInit {
  students;
  isShowModalCreate: boolean = false;
  isShowModalEdit: boolean = false;
  cols: Col[] = [
    { field: 'id', header: 'Id' },
    { field: 'name', header: 'Name' },
    { field: 'age', header: 'Age' },
    { field: 'address', header: 'Address' },
  ];

  studentForm: FormGroup = new FormGroup({
    name: new FormControl(),
    age: new FormControl(),
    address: new FormControl(),
  });

  idEdit: number = null;
  constructor(
    private studentService: StudentManagementService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.getStudent();
    this.primengConfig.ripple = true;
  }

  getStudent() {
    this.studentService.getStudents().subscribe((res) => {
      this.students = res;
    });
  }

  addStudent() {
    this.isShowModalCreate = false;
    this.studentService.addStudent(this.studentForm.value).subscribe((res) => {
      if (res.success) {
        this.students = res.data;
        this.showToast(res.success, res.message);
        this.resetForm();
      }
    });
  }

  deleteStudent(id: number) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.studentService.deleteStudent(id).subscribe((res) => {
          if (res.success) {
            this.students = res.data;
            this.showToast(res.success, res.message);
          }
        });
      },
    });
  }
  editShow(id: number) {
    this.studentService.getStudentById(id).subscribe((res) => {
      if (res.success) {
        this.studentForm.patchValue({
          name: res.data.name,
          age: res.data.age,
          address: res.data.address,
        });
        this.idEdit = id;
        this.showDialogEdit();
      }
    });
  }

  editStudent() {
    this.studentService
      .editStudent(this.idEdit, this.studentForm.value)
      .subscribe((res) => {
        if (res.success) {
          this.students = res.data;
          this.isShowModalEdit = false;
          this.resetId();
          this.showToast(res.success, res.message);
        }
      });
  }

  showDialogCreate() {
    this.isShowModalCreate = true;
  }
  showDialogEdit() {
    this.isShowModalEdit = true;
  }

  resetId() {
    this.idEdit = null;
  }

  showToast(isSuccess, msg) {
    const config = [
      { severity: 'success', summary: 'Success' },
      { severity: 'error', summary: 'Error' },
    ];

    this.messageService.add({
      severity: isSuccess ? config[0].severity : config[1].severity,
      summary: isSuccess ? config[0].summary : config[1].summary,
      detail: msg,
    });
  }

  resetForm() {
    this.studentForm.reset();
  }
}
