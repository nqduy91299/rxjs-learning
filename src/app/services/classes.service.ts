import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Class } from '../models/class.model';
import { Response } from '../models/response.model';

@Injectable({
  providedIn: 'root',
})
export class ClassesService {
  // HOST = environment.host;
  HOST = 'localhost:3000';
  constructor(private httpClient: HttpClient) {}

  getAllClass(): Observable<Class[]> {
    const url = this.HOST + '/class';
    return this.httpClient.get<Response<Class[]>>(url).pipe(map((d) => d.data));
  }
}
