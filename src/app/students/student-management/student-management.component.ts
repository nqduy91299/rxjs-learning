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
  isShowModal: boolean = false;
  cols: Col[] = [
    { field: 'id', header: 'Id' },
    { field: 'name', header: 'Name' },
    { field: 'age', header: 'Age' },
    { field: 'address', header: 'Address' },
  ];

  idStud: number | null = null;
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

  resultModal(res) {
    this.resetId();
    if (res.success) {
      this.students = res.data;
      this.showToast(res.success, res.message);
    } else {
      this.showToast(res.success, res.message);
    }
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
    this.idStud = id;
    this.showDialog();
  }

  showDialog(isCreate: boolean = false) {
    if (isCreate) {
      this.idStud = null;
    }
    this.isShowModal = true;
  }
  resetId() {
    this.idStud = null;
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
}
