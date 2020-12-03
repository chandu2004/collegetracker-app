import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

const httpOptions: Object = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  responseType: 'text'
};

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  url = environment.serverUrl;

  constructor(public http: HttpClient) {
  }

  getStudents(id) {
    return this.http.get(environment.serverUrl + '/students-by-college/' + id);
  }

  getStudent(id) {
    return this.http.get(environment.serverUrl + '/student/' + id);
  }
}
