import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Response } from '../models/response.model';
import { StudentFromNode } from '../models/student.model';

@Injectable({
  providedIn: 'root',
})
export class StudentNodejsService {
  // HOST = environment.host;
  HOST = 'localhost:3000';

  constructor(private httpClient: HttpClient) {}

  getStudent(): Observable<StudentFromNode[]> {
    const url = this.HOST + '/student';
    return this.httpClient
      .get<Response<StudentFromNode[]>>(url)
      .pipe(map((s) => s.data));
  }
}
