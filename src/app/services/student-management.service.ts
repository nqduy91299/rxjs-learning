import { Injectable } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response } from '../models/response.model';
import { Student } from '../models/student.model';
const STUDENTS: Student[] = [
  {
    id: Math.random(),
    name: 'Nguyen Van A',
    age: 26,
    address: 'Ho Chi Minh',
  },
  {
    id: Math.random(),
    name: 'Nguyen Van B',
    age: 24,
    address: 'Ho Chi Minh',
  },
  {
    id: Math.random(),
    name: 'Nguyen Van C',
    age: 22,
    address: 'Ho Chi Minh',
  },
  {
    id: Math.random(),
    name: 'Nguyen Van D',
    age: 21,
    address: 'Ho Chi Minh',
  },
];
@Injectable({
  providedIn: 'root',
})
export class StudentManagementService {
  students: Student[] = STUDENTS;

  constructor() {}

  getStudents(): Observable<Student[]> {
    return of(this.students);
  }

  addStudent(student: Student): Observable<Response<Student[]>> {
    const id = Math.random();
    let newStudent = student;
    newStudent.id = id;
    this.students = [...this.students, newStudent];
    return of({
      success: true,
      data: this.students,
      message: 'Create successfully',
    });
  }

  deleteStudent(id: number): Observable<Response<Student[]>> {
    this.students = this.students.filter((student) => student.id !== id);
    return of({
      success: true,
      data: this.students,
      message: 'Delete successfully',
    });
  }

  editStudent(id: number, Student: Student): Observable<Response<Student[]>> {
    const idx = this.students.findIndex((std) => std.id === id);
    this.students[idx] = {
      id: id,
      name: Student.name,
      age: Student.age,
      address: Student.address,
    };
    return of({
      success: true,
      data: this.students,
      message: 'Edit successfully',
    });
  }

  getStudentById(id: number): Observable<Response<Student>> {
    const student = this.students.find((std) => std.id === id);
    return of({
      success: true,
      data: student,
      message: 'Get information successfully',
    });
  }
}
