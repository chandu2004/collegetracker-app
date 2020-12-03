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
export class CollegeService {
  url = environment.serverUrl;

  constructor(public http: HttpClient) {
  }

  getColleges() {
    return this.http.get(environment.serverUrl + '/colleges/');
  }

  getCollegesByState(state) {
    return this.http.get(environment.serverUrl + '/colleges?state=' + state);
  }

  getCollegesByCourse(course) {
    return this.http.get(environment.serverUrl + '/colleges?course=' + course);
  }

  groupCollegesByState() {
    return this.http.get(environment.serverUrl + '/colleges/group?state=true');
  }

  groupCollegesByCourse() {
    return this.http.get(environment.serverUrl + '/colleges/group?course=true');
  }

  getCollege(id) {
    return this.http.get(environment.serverUrl + '/college/' + id);
  }

}
